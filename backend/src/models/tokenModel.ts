import mongoose, { Schema, model, Document } from "mongoose";

export interface IToken extends Document {
  user: mongoose.Types.ObjectId;
  refreshToken: string;
}

const TokenSchema = new Schema<IToken>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  refreshToken: { type: String, required: true },
});

// TokenSchema.index({ userId: 1 })

const TokenModel = model<IToken>("Token", TokenSchema);

export { TokenModel };
