const User = require('../models/index')['User'];
const jwt = require('jsonwebtoken');
const PasswordHasher = require('./password-hasher');

module.exports = class UserService {
  constructor() {
    this.passwordHasher = new PasswordHasher();
  }

  async create(user) {
    user.password = await this.passwordHasher.hash(user.password);
    user = await User.create(user);
    return this.generateAccessToken(user);
  }

  async findByEmail(email) {
    return await User.findOne({where: { email }});
  }

  async signIn(email, password) {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    if (await this.passwordHasher.check(password, user.password) === true) {
      return this.generateAccessToken(user);
    } else {
      return null;
    }
  }

  generateAccessToken(user) {
    if (!user) {
      throw new Error('Invalid user');
    }

    const userInfo = user.toJSON();
    delete userInfo.password;
    const payload = {
      user: userInfo
    }
    const token = jwt.sign(payload, process.env.AUTH_SECRET, {
      algorithm: 'HS256',
      issuer: process.env.TOKEN_ISSUER,
      subject: `${user.id}`
    });
    return token;
  }
}