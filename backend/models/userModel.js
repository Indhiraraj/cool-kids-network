import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    first_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      enum: ['Cool Kid', 'Cooler Kid', 'Coolest Kid'],
      default: 'Cool Kid'
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model('user', userSchema);

export { userModel };
