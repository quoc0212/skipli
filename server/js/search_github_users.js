import generateOptions from "./../utils.js";
import constants from "./../constants/constants.js";
import https from "https";

const searchGithubUsers = function (req, res) {
  const options = generateOptions(
    "/search/users" +
      "?q=" +
      req.query.q +
      "&page=" +
      req.query.page +
      "&per_page=" +
      req.query.per_page
  );

  return new Promise((resolve, reject) => {
    https
      .get(options, function (apiResponse) {
        let data = "";
        apiResponse.on("data", (chunk) => {
          data += chunk;
        });
        apiResponse.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (e) => {
        console.log(e);
        reject(constants.error_message);
      });
  });
};

export default searchGithubUsers;
