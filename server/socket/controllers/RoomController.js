import BaseController from "./BaseController.js";

export default class RoomController extends BaseController {
  joinRoom = ({ roomId }) => {
    this.socket.join(roomId);
  };

  newRoomCreated = ({ roomId }) => {
    this.socket.broadcast.emit("new-room-created", { roomId });
  };
}
