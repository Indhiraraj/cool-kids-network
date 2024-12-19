import maintainerModel from "../models/maintainerModel.js";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";


class AuthService {
    static registerUser = async (email, password, user) => {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            throw new Error("user already exists with this email id")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userToRegister = {
            email,
            password: hashedPassword,
            first_name: user.name.first,
            last_name: user.name.last,
            country: user.location.country,
        };

        return await userModel.create(userToRegister);
    }

    static loginUser = async (email, password) => {
        const user = await userModel.findOne({ email: email });
        const isAuthenticated = await bcrypt.compare(password, user.password);

        if (isAuthenticated) {
            const {password, ...userWithoutPassword} = user._doc;
            return userWithoutPassword;
        } else {
            throw new Error("password mismatch");
        }
    }

    static loginMainatiner = async (email, password) => {
        const maintainer = await maintainerModel.findOne({ email: email });
        const isAuthenticated = await bcrypt.compare(password, maintainer.password);

        if (isAuthenticated) {
            const {password, ...maintainerWithoutPassword} = maintainer._doc;
            return maintainerWithoutPassword;
        } else {
            throw new Error("password mismatch");
        }
    }
}

export { AuthService };