import { model, Schema, Document, Types } from "mongoose";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  parentId: Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  parentId: { type: Schema.Types.ObjectId, ref: "Category", default: null },
});

CategorySchema.index({ slug: 1 });

const CategoryModel = model<ICategory>("Category", CategorySchema);

export { CategoryModel };
