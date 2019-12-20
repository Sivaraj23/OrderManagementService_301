var express = require('express');


var router = express.Router();



router.route('/login')
    .post((req,res)=>{
        res.end("do")
    });

module.exports = router;
