import uuid from 'uuid';
import users from '../models/User';
import validations from '../middlewares/validations';
import utils from '../helpers/commons';

/**
 * @class UserController
 */
class UserController {
  /**
   * create new user
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns json
   * @memberof UserController
   */
  static signup(req, res) {
    const {
      firstName, lastName, email, password, confirmPassword, type,
    } = req.body;

    const result = validations.validateSignup(req.body);

    if (result.error) {
      const errorMessage = result.error.details[0].message;

      return res.status(400).json({
        status: 400,
        error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
      });
    }

    let userType = 'client';
    let adminType = false;

    if (type === 'staff') {
      userType = type;
      adminType = true;
    }

    const userData = {
      id: uuid.v4(),
      firstName,
      lastName,
      email,
      password: utils.hashPassword(password),
      type: userType,
      isAdmin: adminType,
    };

    users.push(userData);

    const emailExist = users.find(user => user.email === email);
    if (emailExist) {
      return res.status(400).json({
        status: 400,
        error: 'Email already exists',
      });
    }

    return res.header('Authorization', `${utils.jwtToken(userData)}`).status(201).json({
      status: 201,
      data: {
        token: utils.jwtToken(userData),
        id: uuid.v4(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        type: userData.type,
        isAdmin: userData.isAdmin,
      },
    });
  }

  /**
   * signs in a user
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns json
   * @memberof UserController
   */
  static signin(req, res) {
    const { email, password } = req.body;

    const result = validations.validateSignin(req.body);

    if (result.error) {
      const errorMsg = result.error.details[0].message;
      return res.status(400).json({
        status: 400,
        error: errorMsg,
      });
    }

    const userData = users.find(user => user.email === email);

    if (!userData) {
      return res.status(400).json({
        status: 400,
        error: 'Email does not exist',
      });
    }

    if (!utils.validatePassword(password, userData.password)) {
      return res.status(400).json({
        status: 400,
        error: 'Password is incorrect',
      });
    }

    if (utils.validatePassword(password, userData.password)) {
      const token = utils.jwtToken(userData);
      return res.header('Authorization', `${token}`).status(200).json({
        status: 200,
        data: {
          token,
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        },
      });
    }
  }
}

export default UserController;
