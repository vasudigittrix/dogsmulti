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
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        const id = req.query.id;
        // const { id, formData } = req.body;
        console.log(id);
        await db.connectDb();
        const employee = await User.findById(id);
        if (!employee) {
          return res.status(500).json({
            status: "Failure",
            statusCode: "500",
            responseData: {
              message: "Employee not found",
            },
          });
        }
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
        console.log(fields, files);
        const {email} = fields;

        const existingEmployee = await User.findOne({ email: email, _id: { $ne: id } });
        if(existingEmployee){
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
        // const data = req.body.formData;
        if (image) {
          fields.image = image;
        }
        console.log(fields);
        await User.findByIdAndUpdate(id, fields);
        console.log(req.body);
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Employee edited successfully"
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