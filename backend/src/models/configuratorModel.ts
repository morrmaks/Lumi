import mongoose, { model, Schema, Document } from "mongoose";

export interface IConfigurator extends Document {
  userId: mongoose.Types.ObjectId;
  parts: mongoose.Types.ObjectId[];
}

const ConfiguratorSchema = new Schema<IConfigurator>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  parts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const ConfiguratorModel = model<IConfigurator>(
  "Configurator",
  ConfiguratorSchema,
);

export { ConfiguratorModel };
