import { UserService } from "./user.service";

const get = (
  serviceName:
    | "STUDENT"
    | "STUDENT_EVALUATION"
    | "INSTALLMENT"
    | "TEACHER"
    | "CLASS"
    | "LESSON"
    | "USERS"
) => {
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
