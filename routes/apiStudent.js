const express = require('express');
const router = express.Router();


const Student = require('../models/Student');



router.get('/api',(req,res)=>{
    // const data = {
    //     username : 'nivesh',
    //     age :5
    // };
    // res.json(data);
    
    Student.find({ })
    .then((data)=>{
        console.log('Data',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error',error)
    });
});

module.exports = router;