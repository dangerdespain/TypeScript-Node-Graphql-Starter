import mongoose from "mongoose";

import schema from './schema';

const InstagramAccount = mongoose.model("InstagramAccount", schema);
export default InstagramAccount;