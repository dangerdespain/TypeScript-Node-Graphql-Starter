import mongoose from "mongoose";

import schema from './schema';

const InstagramPost = mongoose.model("InstagramPost", schema);
export default InstagramPost;