import instance from "../../../api/axiosConfig";
import {
  API_CREATE_ACCESS_CODE,
  API_VALIDATE_ACCESS_CODE,
} from "../../../constants/api.constant";

const generateAccessCode = (phoneNumber) =>
  instance.post(API_CREATE_ACCESS_CODE, { phoneNumber });
const validateAccessCode = (phoneNumber, accessCode) =>
  instance.post(API_VALIDATE_ACCESS_CODE, {
    param: { phoneNumber, accessCode },
  });

const loginService = {
  generateAccessCode,
  validateAccessCode,
};

export default loginService;
