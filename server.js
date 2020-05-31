const express = require("express");
const app = express();
var router = express.Router();
const admin = require("firebase-admin");
const config = require("config");
const {Users, Coupons} = require("./models/router");

app.use("/photo", express.static(__dirname + "/public"));

router.use(checkAuth);

app.get("/test/users", (req, res) => {
    Users.test(req, res);
});

app.get("/place/check", (req, res) => {
    let place = req.query.place;
    let user = req.query.user;
    let current_balance = req.query.current_balance;
    Users.checkIn(req, res, place, user, current_balance);
});

admin.initializeApp({
    credential: admin.credential.cert(config.get("serviceAccount")),
    databaseURL: "https://loyals-b3152.firebaseio.com"
});

function checkAuth(req, res, next) {
    if (req.headers.authtoken) {
        admin
            .auth()
            .verifyIdToken(req.headers.authtoken)
            .then(function(decodedToken) {
                req.headers.user = decodedToken.uid;
                next();
            })
            .catch(() => {
                res.status(403).send("Unauthorized");
            });
    } else {
        res.status(403).send("Unauthorized");
    }
}

router.get("/user", (req, res) => {
    let user = req.headers.user;
    Users.getUser(req, res, user);
});

router.get("/coupon/buy", (req, res) => {
    let user = req.headers.user;
    let coupon = req.query.coupon;
    Coupons.buyCoupons(req, res, user, coupon);
});

router.get("/user/register", (req, res) => {
    let user = req.headers.user;
    Users.addNewUser(req, res, user, admin);
});

router.get("/user/used_coupons", (req, res) => {
    let user = req.headers.user;
    Users.getCoupons(res, req, user);
});

router.get("/coupon/:city", (req, res) => {
    let city = req.params.city;
    let user = req.headers.user;
    Coupons.getCoupons(res, req, city, user);
});

router.get("/place", (req, res) => {
    let city = req.query.city;
    let category = req.params.category;
    Coupons.getPlaces(res, req, city, category);
});

app.use("/loyals", router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("it`s started", new Date());
});
