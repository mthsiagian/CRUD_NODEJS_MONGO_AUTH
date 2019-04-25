let employeeModel = require('../models/employeeModel')
let validator = require('validator')
var employeeController = {}


employeeController.newEmployee = (req,res) =>{
    let employee = new employeeModel(req.body);
    if(!employee){
        return res.status(404).json({
            msg:"Bad Request"
        })
    }

    if (employee && !validator.isEmail(employee.email)){
        return res.status(400).json({
            msg:"Invalid Email address"
        })
    }

    employeeModel.create(employee)
    .then( doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

employeeController.findAll = (req,res) =>{
    employeeModel.find()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

employeeController.findEmployee = (req,res) =>{
    employeeModel.findOne({_id:req.params.id})
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

employeeController.update = (req,res)=>{
    let employee = req.body || {};
    if (employee.email && !validator.isEmail(employee.email)){
        return res.status(400).json({
            msg:"Invalid Email address"
        })
    }
    employeeModel.findOneAndUpdate({_id:req.params.id}, employee, {new: true})
        .then(doc => {
            if(!doc){
                res.status(400).json({
                    msg:"Data not found"
                })
            }
            res.status(200).json({
                msg:"Data has been updated",
                data : doc
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
}

employeeController.delete = (req,res) => {
    employeeModel.findOneAndDelete({_id:req.params.id})
        .then(doc => {
            res.status(200).json({
                msg : "Data has been deleted"
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

module.exports = employeeController;
