import { ref, child, get } from "firebase/database";

export default async function getUser(database, phoneNumber) {
  const db = ref(database);
  return await get(child(db, "/user_phone_access/" + phoneNumber)).then(
    (snapshot) => snapshot.val()
  );
}
