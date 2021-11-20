var DangNhap = require('../model/model');
exports.login = function(req,res){
    DangNhap.login(req.body.Username,req.body.Password,function(respone){
       res.send({result:respone});
    }); 
}
exports.register = function(req,res){
    DangNhap.join(req.body,function(respone){
       res.send({result:respone});
    }); 
}