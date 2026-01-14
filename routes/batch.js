var express=require('express')
var router=express.Router()
var pool=require('./pool')
const { resolveInclude } = require('ejs')

router.post('/submit_batch',function(req,res){
    try
    {   console.log("REQ.BODY:", req.body)
        pool.query('insert into batch (branchid, batchname, session, createddate, createdtime, userid) values(?,?,?,?,?,?) ', [req.body.branchid, req.body.batchname, req.body.session, req.body.createddate, req.body.createdtime, req.body.userid], function(error,result){
            if(error)
            {   console.log('Errorrrrrrrr',error)
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend team...'})
            }
            else
            {
                res.status(200).json({status:true,message:'Submitted Successfully.....'})
            }
        } )
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend team...'})
    }
})




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




  router.get('/fetch_all_batch', function(req, res, next) {
    pool.query('select B.*, (select BR.branchname from branch BR where B.branchid=BR.branchid) as branchname from batch B ',function(error,result){

    try
    {
        if(error)
        { console.log('bbbbbbbbbbbbbbbbb',error)
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({status:true,message:'Success',data:result})
        }
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})

    }
    })   

  })




  router.post('/edit_batch',function(req,res){

   try
   { 
    pool.query('update batch set branchid=?, batchname=?, session=?, createddate=?, createdtime=?, userid=? where batchid=?',[req.body.branchid, req.body.batchname, req.body.session, req.body.createddate, req.body.createdtime, req.body.userid, req.body.batchid],function(error,result){
        if(error)
        {
            res.status(500).json({status:false, message:'Database Error Pls Contact Backend Team......'})
        }
        else
        {
            res.status(200).json({status:true, message:'Batch Updated Successfully......'})
        }
    })
   }
   catch(e)
   {
        res.status(500).json({status:false, message:'Critical Error Pls Contact Backend Team......'})
   }
  })




  router.post('/delete_batch',function(req,res){
    try
    {
        pool.query('delete from batch where batchid=?',[req.body.batchid],function(error,result){
            if(error)
            {
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team......'})
            }
            else
            {
                res.status(200).json({status:false,message:'Deleted Successfully......'})
            }
        })
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team......'})
    }
  })



module.exports=router