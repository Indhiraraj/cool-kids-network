import maintainerModel from "../models/maintainerModel.js";

export const authenticateMaintainer = async (req, res, next) => {
    try {
        const { maintainerEmail } = req.body;
        if (!maintainerEmail || typeof maintainerEmail !== "string") {
            return res.status(400).json({ message: "Invalid email provided" });
        }
        const isMaintainer = await maintainerModel.findOne({ email: maintainerEmail });
        if (isMaintainer) {
            next();
        } else {
            res.status(401).json({ message: "Maintainer Authentication failed" });
        }
    } catch (error) {
        console.error("Error during maintainer authentication:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}