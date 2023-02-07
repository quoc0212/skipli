import generateOptions from "./../utils.js";
import constants from "./../constants/constants.js";
import https from "https";

const findGithubUser = function (id) {
  const options = generateOptions("/user/" + id);

  return new Promise((resolve, reject) => {
    https
      .get(options, function (apiResponse) {
        let data = "";
        apiResponse.on("data", (chunk) => {
          data += chunk;
        });
        apiResponse.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (e) => {
        console.log(e);
        reject(constants.error_message);
      });
  });
};

export default findGithubUser;
