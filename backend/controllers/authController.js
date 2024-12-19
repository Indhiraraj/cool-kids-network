import { AuthService } from "../services/AuthService.js";

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await fetch("https://randomuser.me/api/");
        const userData = await response.json();
        await AuthService.registerUser(email, password, userData.results[0]);
        res.status(200).json({ message: "user registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.loginUser(email, password);
        res.status(200).json({ message: "user login successful", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const loginMainatiner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const mainatiner = await AuthService.loginMainatiner(email, password);
        res.status(200).json({ message: "mainatiner login successful", mainatiner: mainatiner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}