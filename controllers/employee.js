let express = require('express');
let router = express.Router();
let employeeModel = require('../models/employeeModel')

router.post('/',(req,res)=>{
    console.log(req.body)
    if(!req.body){
        res.status(400).send('Request body is missing');
    }
    let model = new employeeModel(req.body);
    model.save()
    .then( doc => {
        if(!doc || doc.length == 0){
            return res.status(500).send(doc);
        }
        res.status(200).send(doc);
    })
    .catch(err => {
        res.status(500).send(err);
    })
})

module.exports = router;
