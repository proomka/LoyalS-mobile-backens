const mysql = require("mysql2");
const database = require("config").database;
const easyGuidGenerator = require("easy-guid-generator");
const pool = mysql.createPool(database);

const config = require("config");
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(config.get("serviceAccount")),
    databaseURL: "https://loyals-b3152.firebaseio.com"
});

// let authtoken =
//     "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyMmM1NDk4YTcwYjc0MjQ5NzI2ZDhmYjYxODlkZWI3NGMzNWM4MGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG95YWxzLWIzMTUyIiwiYXVkIjoibG95YWxzLWIzMTUyIiwiYXV0aF90aW1lIjoxNTkwODc1Njg5LCJ1c2VyX2lkIjoidW1ieXZqWkg5RWRxMHRnazRNYkdTV2kwNnN0MSIsInN1YiI6InVtYnl2alpIOUVkcTB0Z2s0TWJHU1dpMDZzdDEiLCJpYXQiOjE1OTA4NzU2OTAsImV4cCI6MTU5MDg3OTI5MCwiZW1haWwiOiJoakBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiaGpAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.EmmVy-ZJZezNXDMpoyj3Oe2AMPscjFA30q4HXKskny7gboDFBW0nyM_RVQMSaLZRk4D_CWxybe8l29GlBqX-SX_ZAM3Qu6bCIrNRa-_04cs9Od8CmTe6iBnvD5WGo4oK1uHnZywf4Gf6jJh4XMJDcs1U6fXh90OyH8ELtHmzuUr5Q_jsgtnhYkXoFQsB9NmJQyocay81cKhvXPIFApyfQGivlKbrZS_ZWLJTFCs7x056J8gi-ToMxqmWSeLcMptqkX1AM29qIINQqSMOOtKGtrUUwDlDSatn0Lctb-FN375dHvAFYEEzYXZ2DI_ZMQwefZImwK3_FBKCFj3XFhp6TQ";
// admin
//     .auth()
//     .verifyIdToken(authtoken)
//     .then(function(decodedToken) {
//         // req.headers.user = decodedToken.uid;
//         console.log(decodedToken.uid);
//         // next();
//     })
//     .catch(() => {
//         // res.status(403).send("Unauthorized");
//         console.log("Unauthorized");
//     });

let user = 11123;
pool.query(
    "SELECT id, name, email, current_balance, photo_path, date_of_reg FROM users WHERE Id='" +
        user +
        "'",
    function(err, data) {
        if (err) {
            console.log(err);
        }
        console.log(data);
    }
);

// pool.query(
//     "INSERT INTO places (Id, name, rating, city, adress, phone_num, price_seg, category) VALUES (?,?,?,?,?,?,?,?)",
//     [
//         easyGuidGenerator.generateGuid(false),
//         "Buffet",
//         4.2,
//         "kharkiv",
//         "Nezalezhnosti Avenue, 5а",
//         "099 763 0488",
//         "$",
//         "food"
//     ],
//     function(err, data) {
//         if (err) return console.log(err);
//         console.log("OK");
//     }
// );

// let id = "vQQWGsjrxHW6uoG4s14LM8gi7Sw1";
// let user = {};
// pool.query(
//     "SELECT id, name, email, current_balance, photo_path, date_of_reg FROM users WHERE Id='" +
//         id +
//         "'",
//     function(err, data) {
//         if (err) {
//             return res.status(403).send("Bad uid");
//         }
//         user = data[0];
//         pool.query(
//             "Select Sum(coupons.price) FROM coupons WHERE coupons.Id In (Select coupons.Id From UserCoupons Where UserId = '" +
//                 id +
//                 "')",
//             function(err, data) {
//                 if (err) {
//                     // return res.status(403).send("Bad uid");
//                     console.log("Bad uId");
//                 }
//                 user.current_balanceSpent = data[0]["Sum(coupons.price)"];
//                 // return res.json(user);
//                 console.log(user);
//             }
//         );
//     }
// );

// let user = "8CE64513-A6E3-7689-BD7F-49909783E1EE";
// let coupon = "D0798D7F-54DC-13F3-C904-23BDC7E72B43";
// pool.query(
//     "SELECT users.coins, coupons.price FROM users, coupons WHERE users.Id='" +
//         user +
//         "' AND coupons.Id='" +
//         coupon +
//         "'",
//     function(err, data) {
//         console.log(data[0].price, data[0].coins);
//         // if (err) {
//         //     return console.log(err);
//         // } else if () {
//         // } else {
//         // }
//     }
// );

// pool.query("SELECT * FROM places", function(err, data) {
//     if (err) return console.log(err);
//     console.log(data);
// });

// pool.query("SELECT * FROM coupons", function(err, data) {
//     if (err) return console.log(err);
//     console.log(data);
// });

// pool.query("SELECT * FROM users", function(err, data) {
//     if (err) return console.log(err);
//     console.log(data);
// });

// pool.query("DELETE FROM users WHERE nickname='proomka'", function(err, data) {
//     if (err) return console.log(err);
//     console.log(data);
// });

module.exports = pool;
