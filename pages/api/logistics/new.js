import db from "@/utils/db";
import multiparty from 'multiparty';
import Logistic from "@/models/Logistic";
const fs = require('fs').promises; 
const path = require('path');
export const config = {
    api: {
      bodyParser: false,
    },
  };
async function readAndWriteFile(singleFile, newPath) {
    try {
      const data = await fs.readFile(singleFile.path);
      await fs.writeFile(newPath, data);
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
              let value = fields[name];
              if (value == "") {
                value = null;
            }
            else{
              value = String(value)
            }
              fields[name] = value;
            }
          );
        })
      })
      const {fields,files} = FormResp;
      const {name, status} = fields;
      let image = '' ; 
      if(files.image){
          const singleFile = files.image[0];
          const originalFilename = singleFile.originalFilename;
          const sanitizedFilename = originalFilename.replace(
            /[\s\[\](){}]/g,
            "_"
          );
          const timestamp = Date.now();
          const newFilename = `${timestamp}_${sanitizedFilename}`;
          const newPath = path.join(process.cwd(), 'public', 'uploads', newFilename);
          const imgPathToSave = `/uploads/${newFilename}`
          await readAndWriteFile(singleFile, newPath);
          image = imgPathToSave;
        }
      const newlogistic = new Logistic({name, status, image: image});
        await newlogistic.save();
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Logistic generated successfully"
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