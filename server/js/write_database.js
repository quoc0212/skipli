import { ref, set } from "firebase/database";

function writeUserPhoneNumber(database, phoneNumber, accessCode) {
  const db = ref(database, "/user_phone_access/" + phoneNumber);
  return set(db, {
    phone_number: phoneNumber,
    access_code: accessCode,
  });
}

const writeDatabase = {
  writeUserPhoneNumber,
};

export default writeDatabase;
