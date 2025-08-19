import mongoose, { model, Schema, Document } from "mongoose";

export interface IConfigurator extends Document {
  userId: mongoose.Types.ObjectId;
  parts: mongoose.Types.ObjectId[];
  price: number;
}

const ConfiguratorSchema = new Schema<IConfigurator>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  parts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  price: { type: Number, required: true },
});

// ConfiguratorSchema.index({ userId: 1 })

const ConfiguratorModel = model<IConfigurator>(
  "Configurator",
  ConfiguratorSchema,
);

export { ConfiguratorModel };
