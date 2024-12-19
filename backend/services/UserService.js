import { userModel } from "../models/userModel.js";

class UserService {
    static getAllUsers = async (id) => {
        const user = await userModel.findOne({ id: id });
        const role = user.role;

        switch (role) {
            case 'Cool Kid':
                throw new Error("Access denied. Cool Kid users cannot view user details.");

            case 'Cooler Kid':
                return await userModel.find({}, { first_name: 1, last_name: 1, country: 1, _id: 0 });

            case 'Coolest Kid':
                return await userModel.find({}, { first_name: 1, last_name: 1, country: 1, email: 1, role: 1, _id: 0 });

            default:
                throw new Error("Invalid user role");
        }
    };

    static updateUser = async (email, firstName, lastName, role) => {
        const validRoles = ["Cool Kid", "Cooler Kid", "Coolest Kid"];
        if (!validRoles.includes(role)) {
            throw new Error("Invalid role specified.");
        }

        let user;
        if (email) {
            user = await userModel.findOne({ email });
        } else if (firstName && lastName) {
            user = await userModel.findOne({ firstName, lastName });
        } else {
            throw new Error("Email or name required to identify the user.");
        }

        if (!user) {
            throw new Error("User not found.");
        }

        // Update role
        user.role = role;
        await user.save();
    }
}

export default UserService;
