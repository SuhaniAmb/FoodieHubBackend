var express = require ('express');
var router = express.Router();
var upload=require('./multer')
var pool=require('./pool')
var verifyToken=require('./authMiddleware')


router.post('/submit_picture',upload.any('picture'), function(req, res, next) {
  try
  {
    var files=req.files.map((item)=>{
        return item.filename
    })
    //console.log(" Submit Body:", req.body);
    //console.log(" Submit File:", req.file);
    pool.query('insert into morepictures(categoryid,fooditemid,picture,createddate,createdtime,userid ) values(?,?,?,?,?,?) ',[ req.body.categoryid,req.body.fooditemid,files+"",req.body.createddate,req.body.createdtime,req.body.userid ],function(error,result){

        if(error)
        { console.log('ERORRRRRRRRRRRRRRRRRRRRRRRRR', error)
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({status:true,message:'Pictures Uploaded Successfully....'})
        }
    })
  }
  catch(e)
  {
            res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})

  }
});







router.post('/fetch_all_picture', function(req, res, next) {
  try
  {
    pool.query('select * from morepictures where fooditemid=?',[req.body.fooditemid],function(error,result){

        if(error)
        { 
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({data:result[0],status:true,message:'Success'})
        }
    })
  }
  catch(e)
  {
            res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})

  }
});






module.exports = router;
