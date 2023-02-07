import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import express from "express";
import createNewAccessCode from "./js/create_new_access_code.js";
import validateAccessCode from "./js/validate_access_code.js";
import searchGithubUsers from "./js/search_github_users.js";
import likeGithubUser from "./js/like_github_user.js";
import getUser from "./js/get_user_database.js";
import getUserProfile from "./js/get_user_profile.js";

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

const firebaseConfig = {
  serviceAccount: "./serviceAccountKey.json",
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const defaultDatabase = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(defaultDatabase);
app.listen(4000, () => {
  console.log("App is running on port 4000");
});

app.post("/CreateNewAccessCode", (req, res) => {
  const accessCode = createNewAccessCode(database, req.body.phoneNumber);
  res.send(JSON.stringify({ success: true, data: accessCode }));
});

app.post("/ValidateAccessCode", (req, res) => {
  const result = validateAccessCode(
    database,
    req.body.param.phoneNumber,
    req.body.param.accessCode
  );
  if (result) return res.send(JSON.stringify({ success: true }));
  return res.send(JSON.stringify({ success: false }));
});

app.get("/searchGithubUsers", (req, res) => {
  searchGithubUsers(req, res).then((data) => {
    getUser(database, "+" + req.query.phoneNumber.trim()).then((user) => {
      const result = JSON.parse(data);
      console.log(user);
      if (result.items) {
        res.send(
          JSON.stringify({
            items: result.items.map((i) => {
              if (
                user &&
                user.favorite_github_users &&
                user.favorite_github_users[i.id]
              ) {
                i.liked = true;
              }
              return i;
            }),
            total_count: result.total_count,
          })
        );
      } else {
        res.send(JSON.stringify([]));
      }
    });
  });
});

app.get("/findGithubUserProfile/:id", (req, res) => {
  console.log(req.params.id);
});

app.post("/likeGithubUser", (req, res) => {
  likeGithubUser(database, req.body.id, req.body.phoneNumber);
  return res.send(JSON.stringify({ success: true }));
});

app.get("/getUserProfile/:phoneNumber", (req, res) => {
  getUserProfile(database, req.params.phoneNumber).then((data) => {
    const user = {
      phone_number: req.params.phoneNumber,
      favorite_github_users: data,
    };
    res.send(JSON.stringify(user));
  });
});
