var express = require ('express');
var router = express.Router();
var pool=require('./pool')
var dotenv=require("dotenv")
var jsonwebtoken=require('jsonwebtoken')
dotenv.config()


router.post('/submit_branch',function(req, res, next) {
  try
  {
    pool.query('insert into branch(branchid, branchname, address, latlong, stateid, cityid, emailid, contactnumber, contactperson, createddate, createdtime, userid, password) values(?,?,?,?,?,?,?,?,?,?,?,?,?) ',[ req.body.branchid, req.body.branchname, req.body.address, req.body.latlong, req.body.stateid, req.body.cityid, req.body.emailid, req.body.contactnumber, req.body.contactperson, req.body.createddate, req.body.createdtime, req.body.userid, req.body.password ],function(error,result){
    

        if(error)
        { 
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({status:true,message:'Branch Submitted Successfully....'})
        }
    })
  }
  catch(e)
  {
    res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})

  }
});




router.get('/fetch_all_branch',function(req, res, next) {
  try
  {
    pool.query('select B.*,(select S.statename from states S where S.stateid=B.stateid) as statename, (select C.cityname from cities C where C.cityid=B.cityid) as cityname from branch B',function(error,result){

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






router.post('/edit_branch',function(req, res, next) {
  try
  {
    pool.query('update branch set branchname=?, address=?, latlong=?, stateid=?, cityid=?, emailid=?, contactnumber=?, contactperson=?, createddate=?, createdtime=?, userid=? where branchid=? ',[req.body.branchname, req.body.address, req.body.latlong, req.body.stateid, req.body.cityid, req.body.emailid, req.body.contactnumber, req.body.contactperson, req.body.createddate, req.body.createdtime, req.body.userid,  req.body.branchid],function(error,result){
    

        if(error)
        { 
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({status:true,message:'Branch Updated Successfully....'})
        }
    })
  }
  catch(e)
  {
    res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})

  }
});





router.post('/delete_branch',function(req, res, next) {
  try
  {console.log("Deleting Branch:", req.body);

    pool.query('delete from branch where branchid=? ',[ req.body.branchid],function(error,result){
    

        if(error)
        { 
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({status:true,message:'Branch Deleted Successfully....'})
        }
    })
  }
  catch(e)
  {
    res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})

  }
});




router.post('/chk_branch_login', function(req, res) {
  
  try{
    pool.query('select * from branch where emailid=? and password=?',[req.body.emailid,req.body.password],function(error,result){
      if(error)
        {  console.log(error)
          res.status(500).json({status:false,message:'Database Error Please Contact Backend Team....'})
        }
     else
      { 
        if(result.length==1)
        {
          var sk=process.env.JWT_KEY
          var token=jsonwebtoken.sign({branch_admin:result[0]},sk,{expiresIn:'5h'})
          res.status(200).json({token,data:result[0],status:true,message:'success'})
        }
        else
        {
          res.status(200).json({status:false,message:'Invalid emailid/password'})  
        }
      }
    })

  }
  catch(e)
  {
    res.status(500).json({status:false,message:'Critical Error Please Contact Backend Team....'})
  }
});







module.exports = router;
