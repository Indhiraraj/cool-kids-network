import bcrypt from 'bcryptjs';
import { configDotenv } from 'dotenv';
import { exit } from 'node:process';
import mongoose from 'mongoose';
import connectToDatabase from '../config/db.config.js';
import MaintainerModel from '../models/maintainerModel.js';

configDotenv();

const addMaintainer = async () => {
  try {
    connectToDatabase();
    const MAINTAINER_EMAIL = 'maintainer@coolkidsnetwork.com';
    const MAINTAINER_PASSWORD = 'password';

    const existingUser = await MaintainerModel.findOne({
      email: MAINTAINER_EMAIL
    });
    if (existingUser) {
      console.log('Maintainer already exists in the database.');
      return;
    }

    const hashedPassword = await bcrypt.hash(MAINTAINER_PASSWORD, 10);

    const maintainer = new MaintainerModel({
      email: MAINTAINER_EMAIL,
      password: hashedPassword
    });

    await maintainer.save();
    console.log('Maintainer added successfully.');
  } catch (error) {
    console.error('Error adding maintainer:', error);
  } finally {
    // Close the database connection
    await mongoose.disconnect();
    console.log('Database connection closed.');
    exit(0);
  }
};

addMaintainer();
