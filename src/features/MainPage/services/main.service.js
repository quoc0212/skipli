import instance from "../../../api/axiosConfig";
import {
  API_SEARCH_GITHUB_USERS,
  API_LIKE_GITHUB_USER,
  API_GET_USER_PROFILE,
} from "../../../constants/api.constant";

const searchGithubUsers = (param) =>
  instance.get(
    API_SEARCH_GITHUB_USERS +
      "?q=" +
      param.q +
      "&page=" +
      param.page +
      "&per_page=" +
      param.per_page +
      "&phoneNumber=" +
      localStorage.getItem("phoneNumber")
  );

const likeGithubProfile = (id) =>
  instance.post(API_LIKE_GITHUB_USER, {
    id,
    phoneNumber: localStorage.getItem("phoneNumber"),
  });

const getUserProfile = () =>
  instance.get(
    API_GET_USER_PROFILE + "/" + localStorage.getItem("phoneNumber")
  );

const mainService = {
  searchGithubUsers,
  likeGithubProfile,
  getUserProfile,
};

export default mainService;
