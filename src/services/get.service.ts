import { UserService } from "./user.service";

const get = (serviceName: "USERS") => {
  switch (serviceName) {
    case "USERS":
      return UserService;

    default:
      return undefined;
  }
};

export const GetService = {
  get,
};
