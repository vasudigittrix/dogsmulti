import Customer from "@/models/Customer";
import Facility from "@/models/Facility";
import User from "@/models/User";
import Pet from "@/models/Pet";
import db from "@/utils/db";
const mongoose = require('mongoose');
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
        await db.connectDb();
        const userid = req.query.userid;
        console.log(userid);
        const foundpets = await Pet.find({user: userid})
        if(foundpets.length == 0){
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Pet displayed successfully",
                    data: []
              }
            })
        }
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Pet of user displayed successfully",
                data: foundpets
          }
        })
    } 
    catch(err){
        return res.status(500).json({
            status: 'Failure',
            statusCode: '500',
            responseData: {
                "message": err.message
          }
        });
    }
}

  }