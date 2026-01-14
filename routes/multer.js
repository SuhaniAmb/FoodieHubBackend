var multer=require('multer')
const { v4: uuidv4 } = require('uuid');
var serverpath=multer.diskStorage({
    destination:(req,file,path)=>{
        path(null,'public/images')
    },
    filename:(req,file,path)=>{
        var ext=file.originalname.substring(file.originalname.lastIndexOf("."))
        var myfile=uuidv4()+ext
        path(null,myfile)
    }
})
    var upload=multer({storage:serverpath})
module.exports=upload