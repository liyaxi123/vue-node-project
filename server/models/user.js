var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    'userId':{type:Number},
    'userName': String,
    'userPwd' : Number,
    'orderList':Array,
    'cartList': [{
        'productId':Number,
        'productName':String,
        'salePrice':Number,
        'checked':Number,
        'productImage':String,
        'productNum':Number
}],
    'addressList': Array
});
module.exports = mongoose.model('User',UserSchema,'user');