import * as mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  name: String
});

const Board = mongoose.model('Board', boardSchema);

export default Board;
