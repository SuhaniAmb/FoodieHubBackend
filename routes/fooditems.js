var express=require('express')
var router=express.Router()
var upload=require('./multer')
var pool=require('./pool')
var verifyToken=require('./authMiddleware')




router.post('/submit_fooditems',upload.single('picture'),function(req,res){
    try
    {//console.log("REQ.BODY:", req.body);
     //console.log("REQ.FILE:", req.file);

        pool.query('insert into fooditems(categoryid, branchid,  fooditemname, fooditemtype, fooditemtaste, ingredients, fullprice, halfprice, offerprice, status, rating, description, picture, createddate, createdtime, userid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.categoryid, req.body.branchid, req.body.fooditemname, req.body.fooditemtype, req.body.fooditemtaste, req.body.ingredients, req.body.fullprice, req.body.halfprice, req.body.offerprice, req.body.status, req.body.rating, req.body.description, req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid],function(error,result){
            if(error)
            {console.log('Errorrrrrrrrrrrrr',error)
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team....'})
            }
            else
            {
                res.status(200).json({status:true,message:'Submitted Successfully...'})
            }
        })
       
    }
    catch(e)
    {
        res.status(500).json({status:false,message:"Critical Error Pls Contact Backend Team..."})
    }
})




router.get('/fetch_all_fooditems', verifyToken, function(req,res){
    res.setHeader('Cache-Control', 'no-store');
    pool.query("select F.*, (select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname, (select B.branchname from branch B where B.branchid=F.branchid) as branchname from fooditems F",function(error,result){
        if(error)
        {console.log('ERRRRRRRRRRRRRR',error)
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team.....'})
        }
        else
        {
            res.status(200).json({status:true,message:'Success',data:result})
        }
      
    })
  
})







router.post('/edit_fooditems', function(req, res, next) {
  try
  {
    pool.query('update fooditems set categoryid=?, branchid=?, fooditemname=?, fooditemtype=?, fooditemtaste=?, ingredients=?, fullprice=?, halfprice=?, offerprice=?, status=?, rating=?, description=?, createddate=?, createdtime=?, userid=? where fooditemid=?',[req.body.categoryid, req.body.branchid, req.body.fooditemname, req.body.fooditemtype, req.body.fooditemtaste, req.body.ingredients, req.body.fullprice, req.body.halfprice, req.body.offerprice, req.body.status, req.body.rating, req.body.description, req.body.createddate, req.body.createdtime, req.body.userid, req.body.fooditemid],function(error,result){

        if(error)
        { 
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({status:true,message:'Food Item Updated Successfully....'})
        }
    })
  }
  catch(e)
  {
            res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})

  }
});






router.post('/delete_fooditems', function(req, res, next) {
  try
  {
    pool.query('delete from fooditems where fooditemid=? ',[req.body.fooditemid],function(error,result){

        if(error)
        { 
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({status:true,message:'Food Item Deleted Successfully....'})
        }
    })
  }
  catch(e)
  {
            res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})

  }
});







router.post('/edit_picture',upload.single('picture'), function(req, res, next) {
  try
  {
    pool.query('update fooditems set picture=?,createddate=?,createdtime=?,userid=? where fooditemid=?',[req.file.filename,req.body.createddate,req.body.createdtime,req.body.userid,req.body.fooditemid],function(error,result){

        if(error)
        { //console.log('pictureeeeeeeeeeeeeeee',req.file.filename)
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({status:true,message:'Picture Updated Successfully....'})
        }
    })
  }
  catch(e)
  {
            res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})

  }
});






 
router.get('/fetch_branch', function(req, res, next) {
    pool.query('select branchid, branchname from branch ',function(error,result){

        if(error)
        { console.log('bbbbbbbbbbbbbbbbb',error)
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({status:true,message:'Success',data:result})
        }
    })
  })



  

router.get('/fetch_category', function(req, res, next) {
    pool.query('select categoryid, categoryname from foodcategory',function(error,result){

        if(error)
        { console.log('cccccccccccccccccccccccccc',error)
          res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
          res.status(200).json({status:true,message:'Success',data:result})
        }
    })
  })






module.exports=router