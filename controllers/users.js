const express = require('express');

exports.getHello = async(req,res,next) =>{
    res.status(200).json({
        prop: "hello World"
    })
}