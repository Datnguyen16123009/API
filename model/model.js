const Mongoose = require("mongoose");
const _CONF = require('../common/config');
var jwt = require('jsonwebtoken');
const PersonModel = Mongoose.model("People", {
    Password: String,
    Username:String
});

PersonModel.login = function(name,pass,result){
    // Kiểm tra email có tồn tại hay không
    PersonModel.find({ Username:name, Password:pass},function (err, docs) {
        if(err) result(err)
        if(docs[0]==null) result("User not found")
        else {
            let user = {
                "username": name,
                "password": pass
            }
            const token = jwt.sign(user, _CONF.SECRET, { expiresIn: _CONF.tokenLife });
            const response = {
                    "token":token,
                    }
            result(response)
        }
    });
};
PersonModel.join = function(req,result){
    PersonModel.find({ Name:req.Username, Password:req.Password},function (err, docs) {
        if(err) result(err)
        if(docs[0]==null) {
            const user={"Username":req.Username};
            var person = new PersonModel(user);
            const User = person.save();
            console.log(person)
            result(person);
        }
        else {
            result("Username Already Exists")
        }
    });
};
module.exports = PersonModel;