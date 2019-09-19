const Users = require('../models/user');
exports.home = async (apiReq, apiRes) => {
    Users.find({},(err, res) => {
        if(err) {
            console.log(err);
        }
        apiRes.render('home', {title : 'Home', isLogged: true, Users: res});
    })
}
exports.getRegister = async (apiReq, apiRes) => {
    apiRes.render('signup', {title : 'Register', isLogged: false});
}

exports.postRegister = async (apiReq, apiRes) => {
    let {name, email, password, phone, address } = apiReq.body;
    let users = new Users({
        name,
        email,
        password,
        phone,
        address
    });

    users.save()
        .then(() => apiRes.redirect('/user/signin'))
        .catch(err => {console.log(err);  apiRes.render('signup', {title : 'Register', isLogged: false});});
}

exports.getLogin = async (apiReq, apiRes) => {
    apiRes.render('signin', {title : 'Login', isLogged: false});
}

exports.postLogin = async (apiReq, apiRes) => {

}

exports.getUser = async (apiReq, apiRes) => {

}

exports.updateUser = async (apiReq, apiRes) => {

}

exports.deleteUser = async (apiReq, apiRes) => {
    let {email} = apiReq.body;
    console.log(apiReq.body);
    Users.deleteOne({email : email}, (err, res) => {
        console.log(res);
        apiRes.send({message : 'Successfully deleted', SUCCESS : true});
    })
}

exports.logout = async (apiReq, apiRes) => {

}