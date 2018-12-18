import mongoose from "mongoose";

import schema from './schema';

const InboxThread = mongoose.model("InboxThread", schema);

export default InboxThread;