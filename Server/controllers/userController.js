import express  from "express";
import db from "../config/db.js"
import jwt from 'jsonwebtoken'



function register(req,res){
    const Q1R= `insert into user(name,email,role,password) values('${req.body.name}','${req.body.email}','${req.body.role}','${req.body.password}')`

    try {
        db.query(Q1R,(err,result)=>{
            if(err) throw err
            console.log(result)
           return res.status(200).send({msg:"register succesfully",success:true})

        })
    } catch (error) {
        res.status(500).send({msg:"server error "})
    }
    
}


function login(req,res){
    const email = req.body.email
    const password = req.body.password
    console.log(email,password)
    try {
       const query2 = `select * from user where email=? and password=?;`
       
       db.query(query2,[email,password],(err,result)=>{
        console.log("*********")
        if(err) throw err;
        console.log(result[0])
        const payload = {id:result[0].id, role:result[0].role}

        console.log("user********", payload)
        const token =  jwt.sign(payload,'batch40',{expiresIn:"1d"})
        console.log(token)
       return res.status(200).send({msg:"login successfully",token:token,success:true})

       })

    } catch (error) {
       return  res.status(500).send({msg:"server error"})
    }

};



function getUserInfo(req,res){
    console.log("userrr",req.body.user)
    const query = "select * from user"
    try {
        db.query(query,(err,result)=>{
            if(err) throw err

            res.status(200).send({user:result})
            console.log(result)

        })


    } catch (error) {
        res.status(500).send({msg:"server error"})
    }

};






export default {register,login,getUserInfo}
