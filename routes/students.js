var express=require('express')
var router=express.Router()
var pool=require('./pool')
const upload = require('./multer')



router.post('/submit_student',upload.single('student_picture'),function(req,res){
    try
    {   console.log(" Submit Body:", req.body);
        console.log(" Submit File:", req.file);
        pool.query('insert into students (enrollmentno, branchid, batchid, sectionid, studentname, dob, gender, fathername, mothername, emailid, mobileno, fathercontactno, mothercontactno, current_address, current_state, current_city, current_pincode, parmanent_address, parmanent_state, parmanent_city, parmanent_pincode, aadharno, student_picture, createddate, createdtime, userid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ',[req.body.enrollmentno, req.body.branchid, req.body.batchid, req.body.sectionid, req.body.studentname, req.body.dob, req.body.gender, req.body.fathername, req.body.mothername, req.body.emailid, req.body.mobileno, req.body.fathercontactno, req.body.mothercontactno, req.body.current_address, req.body.current_state, req.body.current_city, req.body.current_pincode, req.body.parmanent_address, req.body.parmanent_state, req.body.parmanent_city, req.body.parmanent_pincode, req.body.aadharno, req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid],function(error,result){
            if(error)
            {   console.log('ERRORRRRRRR',error)
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team......'})
            }
            else
            {
                res.status(200).json({status:true, enrollmentno:req.body.enrollmentno,message:'Submitted Successfully......'})
            }
        })
    }
    catch(e)
    {   console.error("❌ Error in submit_student:", e)
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team......'})
    }
})






router.get('/fetch_all_student',function(req,res){
    try
    {  
        pool.query('select S.*, (select BR.branchname from branch BR where S.branchid=BR.branchid) as branchname, (select B.batchname from batch B where S.batchid=B.batchid ) as batchname, (select Se.sectionname from section Se where S.sectionid=Se.sectionid) as sectionname, (select St.statename from states St where S.current_state=St.stateid )  as statename, (select C.cityname from cities C where S.current_city=C.cityid ) as cityname  from students S',function(error,result){
             if(error)
            {    console.log("DB Error:", error)
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team......'})
            }
            else
            {
                res.status(200).json({status:true,message:'Submitted Successfully......',data:result})
            }
        })
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team......'})
    }

})




router.post('/edit_student',function(req,res){
    try
    {  console.log('Edit student',req.body)
    
        pool.query('update students set branchid=?, batchid=?, sectionid=?, studentname=?, dob=?, gender=?, fathername=?, mothername=?, emailid=?, mobileno=?, fathercontactno=?, mothercontactno=?, current_address=?, current_state=?, current_city=?, current_pincode=?, parmanent_address=?, parmanent_state=?, parmanent_city=?, parmanent_pincode=?, aadharno=?, createddate=?, createdtime=?, userid=? where enrollmentno=? ',[req.body.branchid, req.body.batchid, req.body.sectionid, req.body.studentname, req.body.dob, req.body.gender, req.body.fathername, req.body.mothername, req.body.emailid, req.body.mobileno, req.body.fathercontactno, req.body.mothercontactno, req.body.current_address, req.body.current_state, req.body.current_city, req.body.current_pincode, req.body.parmanent_address, req.body.parmanent_state, req.body.parmanent_city, req.body.parmanent_pincode, req.body.aadharno, req.body.createddate, req.body.createdtime, req.body.userid, req.body.enrollmentno],function(error,result){
        if(error)
        {    console.log(' Edit Error',error)
            res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
        }
        else
        {
            res.status(200).json({status:true,message:'Updated Successfully....'})
        }
        })
    }
    catch(e)
    {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})
    }
})





router.post('/delete_student',function(req,res){
    try
    {    console.log('Deleteeeee',req.body)
        pool.query('delete from students where enrollmentno=?', [req.body.enrollmentno],function(error,result){
            if(error)
            { 
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team...'})
            }
            else
            {
               res.status(200).json({status:true,message:'Deleted Successfully....'})
            }
        })
    }
    catch(e)
   {
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team...'})
   }
})




router.post('/edit_picture',upload.single('student_picture'),function(req,res){
    try
    {  console.log('Picture Edit',req.file)
        
        pool.query('update students set student_picture=?, createddate=?, createdtime=?, userid=? where enrollmentno=? ', [req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid, req.body.enrollmentno], function(error,result){
        if(error)
        { 
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
})





router.post('/submit_student_wallet',function(req,res){
    pool.query('insert into student_wallet (enrollmentno,points) values(?,?) ',[req.body.enrollmentno,req.body.points],function(error,result){
        try
        {
            if(error)
            {
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team....'})
            }
            else
            {
                res.status(200).json({status:true,enrollmentno:req.body.enrollmentno,message:'Submitted Successfully....'})
            }
        }
        catch(e)
        {
            res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team....'})
        }
    })
})




module.exports=router