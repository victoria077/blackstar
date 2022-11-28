const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/rolesMiddleware')

router.post("/registration", [
    check('username', "Username cannot be empty").notEmpty(),
    check('password', "Password should have not less then 4 and not more then 10 symbols").isLength({max: 10, min: 4})
], controller.registration);
router.post("/login", controller.login);


module.exports = router;
