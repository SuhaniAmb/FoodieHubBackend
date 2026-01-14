var express=require('express')
var router=express.Router()
var pool=require('./pool')

router.post('/submit_section',function(req,res){
    try
    {   console.log("REQ.BODY:", req.body)
        pool.query('insert into section (branchid, batchid, sectionname, createddate, createdtime, userid) values(?,?,?,?,?,?) ', [req.body.branchid, req.body.batchid, req.body.sectionname, req.body.createddate, req.body.createdtime, req.body.userid], function(error,result){
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




router.get('/fetch_branch',function(req,res){
    try
    {
        pool.query('select branchid, branchname from branch ',function(error,result){
            if(error)
            {
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team....'})
            }
            else
            {
                res.status(200).json({status:true,message:'Success....',data:result})
            }

        })
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team....'})
    }
})






router.get('/fetch_batch',function(req,res){
    try
    {
        pool.query('select batchid, batchname from batch ',function(error,result){
            if(error)
            {
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team....'})
            }
            else
            {
                res.status(200).json({status:true,message:'Success....',data:result})
            }

        })
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team....'})
    }
})





router.get('/fetch_all_section',function(req,res){
    try
    {
        pool.query('select S.*, (select BR.branchname from branch BR where S.branchid=BR.branchid) as branchname, (select B.batchname from batch B where S.batchid=B.batchid ) as batchname from section S ',function(error,result){
            if(error)
            {
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team.....'})
            }
            else
            {
                res.status(200).json({status:true,message:'success.....',data:result})
            }
        })
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team.....'})
    }
})




router.post('/edit_section',function(req,res){
    try
    {
        pool.query('update section set branchid=?, batchid=?, sectionname=?, createddate=?, createdtime=?, userid=? where sectionid=?',[req.body.branchid, req.body.batchid, req.body.sectionname, req.body.createddate, req.body.createdtime, req.body.userid, req.body.sectionid],function(error,result){
            if(error)
            {
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team.....'})
            }
            else
            {
                res.status(200).json({status:true,message:'Section Updated Succesfully.....'})
            }
        })
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team.....'})
    }
})





router.post('/delete_section',function(req,res){
    try
    {
        pool.query('delete from section where sectionid=?',[req.body.sectionid],function(error,result){
            if(error)
            {
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team.....'})
            }
            else
            {
                res.status(200).json({status:false,message:'Deleted Succesfully.....'})
            }
        })
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team.....'})
    }
})




module.exports=router