import constants from "./constants/constants.js";
const generateOptions = (_path) => {
  return {
    hostname: constants.hostname,
    path: _path,
    headers: {
      "User-Agent": constants.user_agent,
    },
    OAUth: process.env.GITHUB_ACCESS_TOKEN,
  };
};

export default generateOptions;
