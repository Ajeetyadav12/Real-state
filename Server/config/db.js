import mysql from "mysql2"

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"RealState"
})

db.connect((err)=>{
    if(err){
        console.log("err our cunncection ",err)
    }else{
        console.log("mysql connecton successfully")
    }
})

export default db;