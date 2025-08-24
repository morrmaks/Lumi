import { IUserSettings } from "@/models/userModel";

export interface IUserDto {
  id: string;
  email: string;
  name: string;
  settings?: IUserSettings;
  phone?: string;
  avatarUrl?: string;
}
