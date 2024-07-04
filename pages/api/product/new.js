import db from "@/utils/db";
import multiparty from 'multiparty';
import Product from "@/models/Product";
import Variation from "@/models/Variation";
import Discount from "@/models/Discount";
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
        const data = req.body;
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
      const {
        name,
        description,
        shortDescription,
        categoriesid,
        status,
        markedprice,
        featured,
        inStockQuantity,
        hasVariation,
        vartypeid,
        varvalueid,
        discount,
        type,
        startdate,
        enddate,
        brandid,
        tagid,
        unitid
      } = fields
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
        console.log(fields, 'fields');
        let discountid = "";
        const {variations} = fields;
          const variationsArray = JSON.parse(variations);
          console.log(variationsArray);

        if(discount){
          const newdiscount = new Discount({amount: discount, type, startdate: startdate, enddate: enddate});
          await newdiscount.save();
          discountid = newdiscount._id; 

        }
        const productData = {
          name,
          description,
          shortDescription,
          categoriesid,
          status,
          markedprice,
          featured,
          inStockQuantity,
          hasVariation,
          brandid,
          tagid,
          unitid,
          image: image,
          discountid: discountid
      };
      const newproduct = new Product(productData);
      await newproduct.save();
      const productid = newproduct._id;
        if(variationsArray.length > 0){
          for(let variation of variationsArray) {

            const {price, inStockQuantity, sku, code, vartypeid, varvalueid} = variation;
            console.log(variation);
            let newvariation = new Variation({
              vartypeid,
              varvalueid,
              markedprice: price,
              inStockQuantity,
              sku,
              code,
              productid: productid
            })

            await newvariation.save();
          }
        
          await db.disconnectDb();
          return res.status(200).json({
              status: 'Success',
              statusCode: '200',
              responseData: {
                  "message": "Product with Variations created successfully"
            }
          })
          
        }
       
        else{
       
          if (discountid) {
            productData.discountid = discountid;
        }
    
        
        await db.disconnectDb();
        return res.status(200).json({
            status: 'Success',
            statusCode: '200',
            responseData: {
                "message": "Product created successfully"
          }
        })
      }
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