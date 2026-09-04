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


router.post('/student_sign_in', function(req,res){
             console.log('RESULTTTTTTTTTTTTTTTTTTTT', req.body)
    pool.query("select * from students where mobileno=?",[req.body.mobileno],function(error,result){
        if(error)
        {
            console.log('ERRORRRRRRRRRRRRRRRRRR', error)
            res.status(500).json({status:false, message:'Database Error Pls Contact Backend Team........'})
        }
        else
        {
            if(result.length==1)
            {
              console.log('DATAAAAAAAAAAAAAAAAAAAAAA', result)
              res.status(200).json({status:true, message:'Success', data:result[0]})
            }
            else
            {
              res.status(200).json({status:false, message:'You are not registered yet......Pls Contact Backend Administrator', data:[0]})
            }
        }
    })
})



router.post('/submit_order', function(req,res){
    try
    {
        console.log(" Submit Body:", req.body);
        console.log(" Submit File:", req.file);
        pool.query(" insert into orders( paymentid, orderdate, delivery_status, payment_type ) values( ?, ?, ?, ? ) ", [ req.body.paymentid, req.body.orderdate, req.body.delivery_status, req.body.payment_type ], function( error,result ){
            if(error)
            {
                console.log("ERRORRRRRRRRRRRRRRRRRRR", error)
                res.status(500).json({ status:false, message:" Database Error Pls Contact Backend Team........ " })
            }
            else
            {
                res.status(200).json({ status:true,orderid:result.insertId, message:" Order Submitted Successfully... " })
            }
        })
    }
    catch(e)
    {
        console.error("❌ Error in submit_student:", e)
        res.status(500).json({ status:false, message:" Critical  Error Pls Contact Backend Team........ " })
    }
})



router.post('/submit_order_detail', function( req, res ){
    try
    {       console.log(" Submit Body:", req.body);
        pool.query(" insert into order_detail( orderid, fooditemid, fooditemname, enrollmentno, emailid, mobileno, qty, rate, offerrate, amount ) values ? ", [ req.body.data.map((item)=>{ 
            return [ 
            req.body.orderid, 
            item.fooditemid, 
            item.fooditemname, 
            req.body.enrollmentno, 
            req.body.emailid, 
            req.body.mobileno, 
            item.qty, 
            item.fullprice, 
            item.offerprice,
            item.offerprice>0?item.offerprice*item.qty:item.fullprice*item.qty
           ]})],  function( error, result ){
            if(error)
            {
                res.status(500).json({ status:false, message:' Database Error Pls Contact Backend Team..... ' })
            }
            else
            {
                res.status(200).json({ status:true, message:' Submitted Successfully....... ' })
            }
        })
    }
    catch(e)
    {
        res.status(500).json({ status:false, message:' Critical Error Pls Contact Backend Team........ ' })
    }
})


router.post('/fetch_all_fooditems_by_food_and_category', function(req,res){
    res.setHeader('Cache-Control', 'no-store');
    pool.query("select F.*, (select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname, (select B.branchname from branch B where B.branchid=F.branchid) as branchname from fooditems F where F.categoryid in( select categoryid from foodcategory where categoryname=? ) or F.fooditemname=? ",[req.body.categoryname, req.body.fooditemname],function(error,result){
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


module.exports = router;
