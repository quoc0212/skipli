import findGithubUser from "./find_github_user.js";
import getUser from "./get_user_database.js";

export default async function getUserProfile(database, phoneNumber) {
  const user = await getUser(database, phoneNumber);
  console.log("1", user);

  return new Promise((resolve, reject) => {
    if (user && user.favorite_github_users) {
      const keys = Object.keys(user.favorite_github_users);
      console.log("2", keys);

      let promises = keys.map((k) => findGithubUser(k));
      return Promise.all(promises)
        .then((data) => {
          console.log("3", data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
