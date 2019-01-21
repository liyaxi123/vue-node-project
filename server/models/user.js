var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    'userId':{type:Number},
    'userName': String,
    'userPwd' : Number,
    'orderList':[{
        orderId:String,
        orderTotal:String,
        addressInfo:String,
        goodsList:Array,
        createDate:String,
    }],
    'cartList': [{
        'productId':Number,
        'productName':String,
        'salePrice':Number,
        'checked':Number,
        'productImage':String,
        'productNum':Number
}],
    'addressList':[
        {
            'addressId':Number,
            'userName':String,
            'streetName':String,
            'postCode':Number,
            'tel':Number,
            'isDefault':Boolean
        }
    ]
});
module.exports = mongoose.model('User',UserSchema,'user');