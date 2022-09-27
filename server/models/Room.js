import mongoose from "mongoose";
const { Schema } = mongoose;

const roomsSchema = new Schema({
  name: String,
  roomId: String,
  userId: String,
});

export default mongoose.model("Room", roomsSchema);
