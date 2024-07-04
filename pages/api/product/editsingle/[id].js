import db from '@/utils/db';
const path = require('path');
import fs from 'fs/promises';
import Product from '@/models/Product';
import multiparty from 'multiparty';
import Discount from '@/models/Discount';
import { update } from 'lodash';
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
    }
  }
export default async function handler(req, res) {
    if (req.method === 'PUT'){
    try {
        const id = req.query.id;
        await db.connectDb();
        const product = await Product.findById(id);
        console.log(product , 'singpro');
        if (!product) {
          return res.status(500).json({
            status: "Failure",
            statusCode: "500",
            responseData: {
              message: "Product not found",
            },
          });
        }
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
      const {fields, files} = FormResp;
      const updatedProductData  = fields;
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
          updatedProductData.image = imgPathToSave
        }
     
        const {discountid,  discount,
          type,
          startdate,
          enddate} = fields;
          let newdiscountid = null;
          if(discountid){
           await Discount.findByIdAndUpdate(discountid, {type, startdate, enddate, amount:discount});
    
          }else {
            if (type && startdate && enddate && discount) {
              let newdiscount = new Discount({ type, startdate, enddate, amount: discount });
              await newdiscount.save();
              newdiscountid = newdiscount._id;
            }
          }
        // const imgdataArray = product.image;
        //     if (files && files.image) {
        //       for (let i = 0; i < files.image.length; i++) {
        //         const singleFile = files.image[i];
        //         const originalFilename = singleFile.originalFilename;

        //         // Add a timestamp to the filename
        //         const timestamp = Date.now();
        //         const newFilename = `${timestamp}_${originalFilename}`;
        //         const newPath = path.join(
        //           process.cwd(),
        //           "public",
        //           "uploads",
        //           newFilename
        //         );
        //         // newPath += newFilename;
        //         const imgPathToSave = `/uploads/${newFilename}`;
        //         await readAndWriteFile(singleFile, newPath);

        //         imgdataArray.push(imgPathToSave);
        //       }
        //     }
      
        //         updatedProductData.image = imgdataArray;
                //  if (updatedProductData.subCategories == "") {
                //    delete updatedProductData.subCategories;
                //    await Product.updateOne(
                //      { _id: id }, 
                //      { $unset: { subCategories: 1 } } 
                //    );
                //  }
        if(newdiscountid){
          updatedProductData.discountid = newdiscountid
        }
        await Product.findByIdAndUpdate(id, updatedProductData);
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Product edited successfully"
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Failure',
            statusCode: '500',
            responseData: {
                "message": "Error occurred in updating product. Please try again later."
            }
        });
    }
    }
    }