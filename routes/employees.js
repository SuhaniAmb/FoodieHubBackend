var express=require('express')
var router=express.Router()
var pool=require('./pool')
const upload = require('./multer')



router.post('/submit_employee',upload.single('employee_picture'),function(req,res){
    try
    {   console.log("Body:", req.body);
        console.log("File:", req.file);
        
        pool.query('insert into employees (branchid, employeename, dob, gender, emailid, mobileno, otherno, department, current_address, current_state, current_city, current_pincode, parmanent_address, parmanent_state, parmanent_city, parmanent_pincode, aadharno, employee_picture, createddate, createdtime, userid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ',[req.body.branchid, req.body.employeename, req.body.dob, req.body.gender, req.body.emailid, req.body.mobileno, req.body.otherno, req.body.department, req.body.current_address, req.body.current_state, req.body.current_city, req.body.current_pincode, req.body.parmanent_address, req.body.parmanent_state, req.body.parmanent_city, req.body.parmanent_pincode, req.body.aadharno, req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid],function(error,result){
            if(error)
            {   console.log('ERRORRRRRRR', error)
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team......'})
            }
            else
            { //console.log('enrollmentno', result.insertId)
                res.status(200).json({status:true, employeeid:result.insertId, message:'Submitted Successfully......'})
            }
        })
    }
    catch(e)
    {   //console.error("❌ Error in submit_student:", e)
        res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team......'})
    }
})






router.get('/fetch_all_employee',function(req,res){
    try
    {  

        pool.query('select E.*, (select BR.branchname from branch BR where E.branchid=BR.branchid) as branchname, (select St.statename from states St where E.current_state=St.stateid )  as statename, (select C.cityname from cities C where E.current_city=C.cityid ) as cityname  from employees E',function(error,result){
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




router.post('/edit_employee',function(req,res){
    try
    {
        pool.query('update employees set branchid=?, employeename=?, dob=?, gender=?, emailid=?, mobileno=?, otherno=?, department=?, current_address=?, current_state=?, current_city=?, current_pincode=?, parmanent_address=?, parmanent_state=?, parmanent_city=?, parmanent_pincode=?, aadharno=?, createddate=?, createdtime=?, userid=? where employeeid=? ',[req.body.branchid, req.body.employeename, req.body.dob, req.body.gender, req.body.emailid, req.body.mobileno, req.body.otherno, req.body.department, req.body.current_address, req.body.current_state, req.body.current_city, req.body.current_pincode, req.body.parmanent_address, req.body.parmanent_state, req.body.parmanent_city, req.body.parmanent_pincode, req.body.aadharno, req.body.createddate, req.body.createdtime, req.body.userid, req.body.employeeid],function(error,result){
        if(error)
        { 
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





router.post('/delete_employee',function(req,res){
    try
    {
        
        pool.query('delete from employees where employeeid=?', [req.body.employeeid],function(error,result){
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




router.post('/edit_picture',upload.single('employee_picture'),function(req,res){
    try
    {   
        pool.query('update employees set employee_picture=?, createddate=?, createdtime=?, userid=? where employeeid=? ', [req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid, req.body.employeeid], function(error,result){
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



router.post('/submit_employee_wallet',function(req,res){
    pool.query('insert into employee_wallet (employeeid,points) values(?,?) ',[req.body.employeeid,req.body.points],function(error,result){
        try
        {
            if(error)
            {
                res.status(500).json({status:false,message:'Database Error Pls Contact Backend Team....'})
            }
            else
            {
                res.status(200).json({status:true, employeeid:req.body.employeeid,message:'Submitted Successfully....'})
            }
        }
        catch(e)
        {
            res.status(500).json({status:false,message:'Critical Error Pls Contact Backend Team....'})
        }
    })
})




module.exports=router