import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  yearOfPublication: number;
  archived: boolean;

}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  yearOfPublication: { type: String, required: true },
  archived: { type: Boolean, default: false } 

});

export default mongoose.model<IBook>('Book', BookSchema);
