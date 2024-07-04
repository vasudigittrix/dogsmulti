import db from "@/utils/db";
import Employee from "@/models/Employee";
import User from "@/models/User";
import multiparty from 'multiparty';
const fs = require('fs').promises; 
const path = require('path');
export const config = {
  api: {
    bodyParser: false,
  },
};
async function readAndWriteFile(singleFile, newPath) {
    try {
        console.log(singleFile);
      const data = await fs.readFile(singleFile.path);
      console.log(data);
      await fs.writeFile(newPath, data);
      console.log("File uploaded to:", newPath);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  }
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
        await db.connectDb();
        let form = new multiparty.Form();
        let FormResp= await new Promise((resolve,reject)=>{
         form.parse(req,(err,fields,files)=>{
          if(err) reject(err)
          resolve({fields,files})
          Object.keys(fields).forEach(function(name) {
              const value = fields[name];
              fields[name] = String(value);
            }
          );
        })
      })
        const {fields,files} = FormResp;
        const {email} = fields;
        const existingemployee = await User.find({email: email});
        console.log(existingemployee);
        if(existingemployee.length > 0){
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Email Address Already Taken"
              }
            })
        }
        let image = '' ; 
        if(files.image){
            const singleFile = files.image[0];
            console.log(singleFile);
            const originalFilename = singleFile.originalFilename;
            console.log(originalFilename);
            const sanitizedFilename = originalFilename.replace(
              /[\s\[\](){}]/g,
              "_"
            );
            const timestamp = Date.now();
            const newFilename = `${timestamp}_${sanitizedFilename}`;
            const newPath = path.join(process.cwd(), 'public', 'uploads', newFilename);
            const imgPathToSave = `/uploads/${newFilename}`
            console.log(singleFile, 'beforfn');
            await readAndWriteFile(singleFile, newPath);
            image = imgPathToSave;
  
          }
              const newemployee = new User({...fields, role: 'employee', image: image})
        await newemployee.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Employee created successfully"
          }
        })
    } 
    catch(err){
        console.log(err);
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