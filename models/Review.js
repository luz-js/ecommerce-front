import {model, models, Schema} from "mongoose";

const reviewSchema = new Schema({
  title: String,
  description: String,
  stars: Number,
  product: {type:Schema.Types.ObjectId},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  email: String
}, {timestamps: true});

export const Review = models?.Review || model('Review', reviewSchema);