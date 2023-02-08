import { userModels } from "./mongo/models/userModels.js";
import UserContainer from "./managers/user/user.managers.js";

export const UserManager = new UserContainer(userModels)