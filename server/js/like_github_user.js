import { ref, child, set } from "firebase/database";

export default async function likeGithubUser(database, id, phoneNumber) {
  const result = await set(
    child(
      ref(database),
      "/user_phone_access/" + phoneNumber + "/favorite_github_users/" + id
    ),
    true
  );
  return result;
}

// async function getFavoriteGithubUsers(database, phoneNumber) {
//   const db = ref(database);
//   return await get(child(db, "/user_phone_access/" + phoneNumber)).then(
//     (snapshot) => snapshot.val()
//   );
// }
