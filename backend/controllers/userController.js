import UserService from "../services/UserService.js"

const getAllUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const users = await UserService.getAllUsers(id);
        res.status(200).json({ message: "users fetch successful", users: users })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    const { email, firstName, lastName, role } = req.body;
    try {
        await UserService.updateUser(email, firstName, lastName, role);
        res.status(200).json({ message: "user updation successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}

export { getAllUsers, updateUser };