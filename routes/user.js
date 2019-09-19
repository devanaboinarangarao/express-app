const express = require('express');
const userService = require('../controllers/user');
const router = express.Router();

// home
router.get('/', userService.home);

// get requests
router.get('/getRegister', userService.getRegister);
router.get('/getLogin', userService.getLogin);
router.get('/getUsers', userService.getUser);
router.get('/logout', userService.logout);
// post requests
router.post('/postRegister', userService.postRegister);
router.post('/postLogin', userService.postLogin);

// put requests
router.put('/updateUser', userService.updateUser);

// delete requests
router.delete('/deleteUser', userService.deleteUser);


module.exports = router;

