import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const utils = {
  /**
   * @description encrypt password
   * @param {object} password
   * @returns {object} hashPassword
   */
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  },

  /**
   * @description validate password
   * @param {string} password
   * @param {string} hashpassword
   * @returns {boolean} boolean
   */
  validatePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * @description assign token
   * @param {object} payload
   * @returns {object} token
   */
  jwtToken(payload) {
    const token = jwt.sign(payload, 'loving', { expiresIn: '24h' });
    return token;
  },

};

export default utils;
