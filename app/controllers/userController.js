/* C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /user */
const express = require("express");
const router = express.Router();

const account = require("./account/libUser.js");

router.post("/login", account.login);
router.post("/signup", account.signup);
router.post("/", account.editUser);
router.post("/addToCart", account.addToCart);
router.post("/addToFavs", account.addToFavs);

router.delete("/removeFromCart", account.removeFromCart);
router.delete("/removeFromFavs", account.removeFromFavs);

router.get("/logout", account.logout);
router.get("/", account.getUser);
router.get("/myProducts", account.getMyProducts);
router.get("/myProductsSold", account.getMyProductsSold);
router.get("/myCart", account.getMyCart);
router.get("/myFavs", account.getMyFavs);

module.exports = router;
