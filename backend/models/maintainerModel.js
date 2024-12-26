import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const maintainerSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const MaintainerModel = mongoose.model('maintainer', maintainerSchema);

export default MaintainerModel;
