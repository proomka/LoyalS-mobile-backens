const pool = require("../lib/mysql/database");
const crypto = require("crypto");
const config = require("config");

const Coupons = {
    id: "",
    date_of_end: "",
    price: "",
    description: "",
    name: "",
    photo_path: "",
    placeId: "",
    // запрос доступных купонов
    getCoupons(res, req, city, user) {
        // получение всех купонов находящихся в городе пользователя
        pool.query(
            "SELECT * FROM Coupons WHERE Coupon.ID NOT IN (SELECT CouponID FROM UserCoupons WHERE UserId = '" +
                user +
                "') AND date_of_end > " +
                new Data(),
            function(err, data) {
                if (err) return console.log(err);
                res.json(data);
            }
        );
        pool.end(function(err) {
            if (err) return console.log("Ошибка: " + err.message);

            console.log("Подключение закрыто");
        });
    },
    getPlaces(res, req, city, category) {
        // получение всех купонов находящихся в городе пользователя
        pool.query(
            "SELECT * FROM places WHERE category = '" +
                category +
                "' AND city = '" +
                city +
                "'",
            function(err, data) {
                if (err) return console.log(err);
                res.json(data);
            }
        );
        pool.end(function(err) {
            if (err) return console.log("Ошибка: " + err.message);

            console.log("Подключение закрыто");
        });
    }
};

module.exports = Coupons;
