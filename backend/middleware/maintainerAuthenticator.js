import maintainerModel from '../models/maintainerModel.js';
/* eslint-disable consistent-return */
export const authenticateMaintainer = async (req, res, next) => {
  try {
    let { maintainerEmail } = req.body;

    if (!maintainerEmail) {
      maintainerEmail = req.params.maintainerEmail;
    }

    if (!maintainerEmail || typeof maintainerEmail !== 'string') {
      return res.status(400).json({ message: 'Invalid email provided' });
    }
    const isMaintainer = await maintainerModel.findOne({
      email: maintainerEmail
    });
    if (isMaintainer) {
      next();
    } else {
      res.status(401).json({ message: 'Maintainer Authentication failed' });
    }
  } catch (error) {
    console.error('Error during maintainer authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
/* eslint-disable consistent-return */
