import { IUserDto } from "@/types/user";
import { IUser, IUserSettings } from "@/models/userModel";

class UserDto implements IUserDto {
  id: string;
  email: string;
  name: string;
  settings?: IUserSettings;
  phone?: string;
  avatarUrl?: string;

  constructor(model: IUser) {
    this.email = model.email;
    this.id = String(model._id);
    this.name = model.name;
    this.settings = model.settings;
    this.phone = model.phone;
    this.avatarUrl = model.avatarUrl;
  }
}

export { UserDto };
