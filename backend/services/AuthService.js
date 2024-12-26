import bcrypt from 'bcryptjs';
import maintainerModel from '../models/maintainerModel.js';
import { userModel } from '../models/userModel.js';

class AuthService {
  static registerUser = async (email, password, user) => {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error('user already exists with this email id');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userToRegister = {
      email,
      password: hashedPassword,
      first_name: user.name.first,
      last_name: user.name.last,
      country: user.location.country
    };

    return await userModel.create(userToRegister);
  };

  /* eslint-disable no-shadow */
  /* eslint-disable no-unused-vars */
  static loginUser = async (email, password) => {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (isAuthenticated) {
      const { password, ...userWithoutPassword } = user._doc;
      return userWithoutPassword;
    }
    throw new Error('password mismatch');
  };

  static loginMainatiner = async (email, password) => {
    const maintainer = await maintainerModel.findOne({ email });
    const isAuthenticated = await bcrypt.compare(password, maintainer.password);

    if (isAuthenticated) {
      const { password, ...maintainerWithoutPassword } = maintainer._doc;
      return maintainerWithoutPassword;
    }
    throw new Error('password mismatch');
  };
}
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

export { AuthService };
