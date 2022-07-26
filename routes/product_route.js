const router = require("express").Router();
const product_controller = require("../controller/product_controller");

router.post("/checkout", product_controller.stripeCheckout);

//Exporting routes
module.exports = router;
