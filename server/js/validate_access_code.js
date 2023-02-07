import getUser from "./get_user_database.js";
import writeDatabase from "./write_database.js";

export default async function validateAccessCode(
  database,
  phoneNumber,
  accessCode
) {
  const user = await getUser(database, phoneNumber);
  if (user.access_code === accessCode) {
    writeDatabase.writeUserPhoneNumber(database, phoneNumber, "");
    return true;
  }
  return false;
}
