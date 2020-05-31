const pool = require("../lib/mysql/database");
const crypto = require("crypto");
const config = require("config");

const Users = {
    id: {},
    name: {},
    email: {},
    current_balance: {},
    photo_path: {},
    date_of_reg: {},
    date_of_birth: {},
    password: {},
    salt: {},
    token: {},
    checkIn(req, res, place, user, coins) {
        pool.query(
            "INSERT INTO checkins (UserId, PlaceId, coins, date_of_check) VALUES (?,?,?,?)",
            [user, place, coins, new Date()],
            function(err, data) {
                if (err) res.status(403).send(err);
                res.send("You got " + coins + " coins");
            }
        );
        pool.query(
            "UPDATE users SET current_balance = current_balance + " +
                coins +
                " WHERE id = " +
                user,
            function(err, data) {
                if (err) return console.log(err);
                console.log(OK);
            }
        );
    },
    buyCoupons(req, res, user, coupons) {
        pool.query(
            "SELECT * FROM usercoupons WHERE UserId='" +
                user +
                "' AND CouponId='" +
                coupons +
                "'",
            function(err, data) {
                if ((data = [])) {
                    pool.query(
                        "SELECT users.current_balance, coupons.price FROM users, coupons WHERE users.Id='" +
                            user +
                            "' AND coupons.Id='" +
                            coupons +
                            "'",
                        function(err, data) {
                            if (err) {
                                return console.log(err);
                            } else if (
                                data[0].price <= data[0].current_balance
                            ) {
                                pool.query(
                                    "INSERT INTO usercoupons (UserId, PlaceId, date_of_use) VALUES (?,?,?)",
                                    [user, place, new Date()],
                                    function(err, data) {
                                        if (err) return console.log(err);
                                        res.send("OK");
                                    }
                                );
                                pool.query(
                                    "UPDATE users SET current_balance = current_balance - " +
                                        data[0].price +
                                        " WHERE id = " +
                                        user,
                                    function(err, data) {
                                        if (err) return console.log(err);
                                        console.log(OK);
                                    }
                                );
                            } else {
                                res.status(403).send(
                                    "Insufficient funds in your account"
                                );
                            }
                        }
                    );
                } else {
                    res.status(403).send("coupons was used");
                }
            }
        );
    },
    getUser(req, res, user) {
        let userData = {
            data: {},
            current_balance: {}
        };
        pool.query(
            "SELECT id, name, email, current_balance, photo_path, date_of_reg FROM users WHERE Id='" +
                user +
                "'",
            function(err, data) {
                if (err) {
                    res.status(403).send("Bad uid");
                }
                userData.data = data[0];
                pool.query(
                    "Select Sum(coupons.price) FROM coupons WHERE coupons.Id In (Select coupons.Id From UserCoupons Where UserId = '" +
                        user +
                        "')",
                    function(err, data) {
                        if (err) {
                            res.status(403).send("Bad uid");
                        }
                        userData.current_balance =
                            data[0]["Sum(coupons.price)"] || 0;
                        res.send(userData);
                    }
                );
            }
        );
    },
    addNewUser(req, res, user, admin) {
        admin
            .auth()
            .getUser(user)
            .then(function(userRecord) {
                let userdata = userRecord.toJSON();
                pool.query(
                    "INSERT INTO users (id, name, email, current_balance, photo_path, date_of_reg,  password, salt) VALUES (?,?,?,?,?,?,?,?)",
                    [
                        user,
                        userdata.email.split("@")[0],
                        userdata.email,
                        100,
                        userdata.photoURL,
                        new Date(),
                        userdata.passwordHash,
                        userdata.passwordSalt
                    ],
                    function(err, data) {
                        if (err) return res.status(403).send("Error: ", error);
                        return res.send("User has successfully registered");
                    }
                );
            })
            .catch(function(error) {
                console.log("Error fetching user data:", error);
                res.status(403).send("Error fetching user data:", error);
            });
    },
    getCoupons(req, res, userId) {
        pool.query(
            "SELECT coupons.title, Places.title, coupons.price, usercoupons.date_of_use FROM coupons, places, usercoupons WHERE usercoupons.UserId='" +
                userId +
                "'",
            function(err, data) {
                if (err) {
                    res.status(403).send("Bad uid");
                    return console.log(err);
                }
                res.json(data);
            }
        );
    }
};
я;

// pool.query("SELECT * FROM users", function(err, data) {
//     if (err) return console.log(err);
//     res.render("index.hbs", {
//         users: data
//     });
// });
//
// connection.end(function(err) {
//     if (err) return console.log("Ошибка: " + err.message);
//
//     console.log("Подключение закрыто");
// });

module.exports = Users;
