const express = require('express'),
    authController = require('../controllers/authController.js'),
    userController = require('../controllers/userController.js'),
    userAccountController = require('../controllers/userAccountController.js'),
    multer = require('multer'),
    upload = multer({ dest: './uploaded/' });

let router = express.Router();

router.route('/checkalias').post(userAccountController.checkAlias);
router.route('/checkemail').post(userAccountController.checkEmail);
router.route('/restorepassword').post(userAccountController.restoreUserPassword);
router.route('/register').post(upload.fields([{ name: "image" }]), userAccountController.regUser);
router.route('/login').post(userAccountController.login);
router.route('/fbregister').post(userAccountController.FBRegister);
router.route('/fblogin').post(userAccountController.FBLogin);

router.use(authController.auth);

router.route('/changepassword').post(userAccountController.changePassword);
router.route('/update').post(upload.fields([{ name: "image" }]), userAccountController.updateProfile);
router.route('/fbmerge').post(userAccountController.FBMerge);
router.route('/fbunmerge').post(userAccountController.FBUnMerge);


module.exports = router;