var mongoose = require('mongoose');
var Schema = mongoose.Schema;  //这就是mongoo模型的创建方式 ，在mongose中一切都是从schema开始的
//每一个schema对应一个collection
var productSchema = new Schema({   //声明字段就是上述两个步骤   =》这称为模式 =》然后下一步转化为模型
    'productId':{type:Number},
    'productName':String,
    'productImage':String,
    'salePrice':Number,
    'productNum':Number,
    'checked':Number
});
module.exports = mongoose.model('Good',productSchema); //这就是模型的整个流程=》 这种写法 程会寻找goods表，所以数据库命名要加s
//模型就是我们创建文档的类

//var slice = mogoose.model('Good',productSchema)
// var sl = new slice({name:'xiaoli'})  //属性转为model后添加
//console.log(sl.name)   //xiaoli

//可以在构成模型前给schema添加方法
//  productSchema.methods.speak =function(){ console.log(123)}

//添加方法后，每一个model实例都将拥有该方法

//var demo = new slice({name:'dawang'})   demo.speak() => 123

//现在调用model实例的save方法将模型文档保存至 数据库，注意回调函数第一个参数是err
//  demo.save(function(err,demo){    //第一个参数是err，第二个应该是model实例
//     if(err) return console.error(err);   
//     demo.speak();
// })


//接着我们可以通过model的find方法查询所有模型实例
// slice.find(function(err,slices){    //slices 代表所有的实例
//     if(err) return console.error(err);
//     console.log(slices)
// })

//当然也可以通过条件过滤我们想要的实例

// slice.find({name:/xiaoli/,callback}) //只返回满足条件的实例