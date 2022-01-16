const RoomModal = require('../models/room-modal');

class RoomService {
  async create({ topic, roomType, ownerId }) {
    const room = await RoomModal.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });
    return room;
  }

  async getAllRooms(types) {
    const rooms = RoomModal.find({ roomType: { $in: types } })
      .populate('speakers')
      .populate('ownerId')
      .exec();
    return rooms;
  }

  async getRoom(roomId) {
    const room = RoomModal.findOne({ _id: roomId });
    return room;
  }
}

module.exports = new RoomService();
