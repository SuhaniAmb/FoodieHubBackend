var express = require('express');
var router = express.Router();
var pool=require('./pool')



router.get('/fetch_all_category', function(req, res, next) {
  try
  {
    pool.query('select * from foodcategory',function(error,result){

        if(error)
        { 
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({data:result,status:true,message:'Success'})
        }
    })
  }
  catch(e)
  {
            res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})

  }
});




router.post('/fetch_all_fooditems_by_category', function(req,res){
    res.setHeader('Cache-Control', 'no-store');
    pool.query("select F.*, (select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname, (select B.branchname from branch B where B.branchid=F.branchid) as branchname from fooditems F where F.categoryid in( select categoryid from foodcategory where categoryname=? ) ",[req.body.categoryname],function(error,result){
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



router.get('/fetch_all_fooditems', function(req,res){
    res.setHeader('Cache-Control', 'no-store');
    pool.query("select F.*, (select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname, (select B.branchname from branch B where B.branchid=F.branchid) as branchname from fooditems F  ", function(error,result){
        if(error)
        { console.log('ERRRRRRRRRRRRRRRRRRRRRR',error)
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team.....'})
        }
        else
        {
            res.status(200).json({status:true,message:'Success',data:result})
        }
      
    })
  
})






router.post('/fetch_all_fooditems_by_id', function(req,res){
    res.setHeader('Cache-Control', 'no-store');
    pool.query("select F.*, (select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname, (select B.branchname from branch B where B.branchid=F.branchid) as branchname from fooditems F where fooditemid=? ",[req.body.fooditemid], function(error,result){
        if(error)
        { console.log('ERRRRRRRRRRRRRRRRRRRRRR',error)
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team.....'})
        }
        else
        {
            res.status(200).json({status:true,message:'Success',data:result})
        }
      
    })
  
})




router.post('/fetch_all_fooditems_by_category_id', function(req,res){
    res.setHeader('Cache-Control', 'no-store');
    //console.log("REQ.BODY:", req.body);
    // console.log("REQ.FILE:", req.file)
    pool.query("select F.*, (select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname, (select B.branchname from branch B where B.branchid=F.branchid) as branchname from fooditems F where F.categoryid=? ",[req.body.categoryid],function(error,result){
        if(error)
        {//console.log('ERRRRRRRRRRRRRR',error)
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team.....'})
        }
        else
        {
            res.status(200).json({status:true,message:'Success',data:result})
        }
      
    })
  
})




module.exports = router;
