import { model, Schema, Document } from "mongoose";

export interface IUserSettings {
  orderNotifications: boolean;
  marketingNotifications: boolean;
  newsNotifications: boolean;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phone?: string;
  avatarUrl?: string;
  resetPasswordCode?: string;
  resetPasswordExpire?: Date;
  settings: IUserSettings;
}

const UserSettingsSchema = new Schema<IUserSettings>(
  {
    orderNotifications: { type: Boolean, default: true },
    marketingNotifications: { type: Boolean, default: false },
    newsNotifications: { type: Boolean, default: false },
  },
  { _id: false },
);

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  avatarUrl: { type: String },
  resetPasswordCode: { type: String },
  resetPasswordExpire: { type: Date },
  settings: { type: UserSettingsSchema, default: {} },
});

const UserModel = model<IUser>("User", UserSchema);

export { UserModel };
