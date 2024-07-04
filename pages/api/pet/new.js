import Facility from "@/models/Facility";
import Pet from "@/models/Pet";
import db from "@/utils/db";
import Customer from "@/models/Customer";
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
        console.log(req.body);
        // const data = req.body.values;
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
      let image = '' ; 
      if(files.image){
        const singleFile = files.image[0];
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
        const newpet = new Pet({ ...fields,
            image: image});
        await newpet.save();
        // const petid = newpet._id;
        // const user = newpet.user;
        // await Customer.updateOne(
        //     { _id: user }, 
        //     { $addToSet: { pets: petid } } 
        //   );
        // console.log(data);
        // const {user} = data;
        // const newpet = new Pet(data);
        // await newpet.save();
        // const petid = newpet._id;
        // await Customer.updateOne(
        //     { _id: user }, 
        //     { $addToSet: { pets: petid } } 
        //   );
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Pet created successfully"
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