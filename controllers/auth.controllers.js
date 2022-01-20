const bcrypt = require('bcrypt');
const createError = require('http-errors');
const { readFileSync } = require('fs');
const jwt = require('jsonwebtoken');

const { User, UserRefreshToken } = require('../database/models');
const { randomBytes } = require('crypto');
const { addDays } = require('date-fns');
const { JWT_PUBLIC_KEY, JWT_EXPIRES_IN } = process.env;

// SIGNUP
const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // check email
    const isEmail = await User.findOne({ where: { email } });
    if (isEmail) {
      return next(createError(400, 'email already exists'));
    }

    // check username
    const isUsername = await User.findOne({ where: { username } });
    if (isUsername) {
      return next(createError(400, 'username already exists'));
    }

    // new user
    const user = await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: 'success signup user',
      code: 201,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if the user entered the correct email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(createError(400, 'invalid user'));
    }

    // check if the user entered the correct password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(createError(400, 'invalid password'));
    }

    // token
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user.id);

    return res.status(201).json({
      message: 'success login user',
      code: 201,
      user,
      accessToken,
      refreshToken: refreshToken.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      return next(createError(401, 'unauthorized'));
    }

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return next(createError(400, 'user not found'));
    }

    const token = await UserRefreshToken.findOne({
      where: { userId: user.id },
    });
    if (!token) {
      return next(createError('Invalid link or expired'));
    }
    await token.destroy();
    return res.send('success logout user');
  } catch (error) {
    next(error);
  }
};

const generateAccessToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const secret = readFileSync(JWT_PUBLIC_KEY, { encoding: 'utf-8' });
  const token = jwt.sign(payload, secret, {
    expiresIn: parseInt(JWT_EXPIRES_IN),
  });
  return token;
};

const generateRefreshToken = async (userId) => {
  const refreshToken = `${userId}.${randomBytes(40).toString('hex')}`;
  return await UserRefreshToken.create({
    refreshToken,
    userId,
    expiredAt: addDays(new Date(), 7),
  });
};

module.exports = { signup, login, logout };
