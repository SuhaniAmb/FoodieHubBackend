var express=require('express')
var router=express.Router()
var pool=require('./pool')
var upload=require('./multer')





router.post('/submit_deliveryboy',upload.single('photograph'),function(req,res){
    try
    {   console.log('📦 BODY:', req.body)
        console.log('🖼️ FILE:', req.file)
        pool.query('insert into deliveryboy(branchid, deliveryname, dob, gender, mobileno, emailid, address, city, state, aadharno, status, vehicleno, photograph, password, createddate, createdtime, userid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.branchid, req.body.deliveryname, req.body.dob, req.body.gender, req.body.mobileno, req.body.emailid, req.body.address, req.body.city, req.body.state, req.body.aadharno, req.body.status, req.body.vehicleno, req.file.filename, req.body.password, req.body.createddate, req.body.createdtime, req.body.userid],function(error,result){
            if(error)
            {
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team....'})
            }
            else
            {
                res.status(200).json({status:true,message:'Submitted Successfully....'})
            }
        })
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team....'})
    }
})







router.get('/fetch_deliveryboy',function(req,res){
    try
    {
        pool.query('select D.*, (select B.branchname from branch B where D.branchid=B.branchid )as branchname, (select C.cityname from cities C where D.city=C.cityid )as cityname, (select S.statename from states S where D.state=S.stateid )as statename from deliveryboy D', function(error,result){
            if(error)
            {
                res.status(500).json({status:false, message:'Database Error Pls Contact Backend Team....'})
            }
            else
            {
                res.status(200).json({status:true, message:'Success',data:result})
            }
        })
    }
    catch(e)
    {
        res.status(500).json({status:false, message:'Critical Error Pls Contact Backend Team....'})
    }
})







router.post('/edit_deliveryboy',function(req,res){
    try
    {
        console.log('📦 BODY:', req.body)
        console.log('🖼️ FILE:', req.file)
        pool.query('update deliveryboy set branchid=?, deliveryname=?, dob=?, gender=?, mobileno=?, emailid=?, address=?, city=?, state=?, aadharno=?, status=?, vehicleno=?, password=?, createddate=?, createdtime=?, userid=? where delivery_id=?',[req.body.branchid, req.body.deliveryname, req.body.dob, req.body.gender, req.body.mobileno, req.body.emailid, req.body.address, req.body.city, req.body.state, req.body.aadharno, req.body.status, req.body.vehicleno, req.body.password, req.body.createddate, req.body.createdtime, req.body.userid, req.body.delivery_id], function(error,result){
            if(error)
            {
                res.status(500).json({status:false, message:'Database Error Pls Contact Backend Team....'})
            }
            else
            {
                res.status(200).json({status:true, message:'Updated Successfully...'})
            }
        })
    }
    catch(e)
    {
        res.status(500).json({status:false, message:'Critical Error Pls Contact Backend Team....'})
    }
})




router.post('/delete_deliveryboy', function(req,res){
    try
    {
        pool.query('delete from deliveryboy where delivery_id=?', [req.body.delivery_id], function(error,result){
            if(error)
            {
                res.status(500).json({status:false, message:'Database Error Pls Contact Backend Team.....'})
            }
            else
            {
                res.status(200).json({status:true, message:'Deleted Successfully'})
            }
        })
    }
    catch(e)
    {
        res.status(500).json({status:false, message:'Critical Error Pls Contact Backend Team.....'})
    }
})





router.post('/edit_picture',upload.single('photograph'),function(req,res){
    try
    {
        pool.query('update deliveryboy set photograph=?, createddate=?, createdtime=?, userid=? where delivery_id=?', [req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid, req.body.delivery_id], function(error,result){
            if(error)
            {
                res.status(500).json({status:false, message:'Databse Error Pls Contact Backend Team....'})
            }
            else
            {
                res.status(200).json({status:true, message:'Updated Successfully....'})
            }
        })
    }
    catch(e)
    {
        res.state(500).json({status:false, message:'Critical Error Pls Contact Backend Team....'})
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






module.exports=router