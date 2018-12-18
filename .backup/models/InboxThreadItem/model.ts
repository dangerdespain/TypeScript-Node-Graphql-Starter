import mongoose from "mongoose";

import schema from './schema';

const InboxThreadItem = mongoose.model("InboxThreadItem", schema);
export default InboxThreadItem;