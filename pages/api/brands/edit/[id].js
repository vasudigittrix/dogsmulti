import db from "@/utils/db";
import Brand from "@/models/Brand";
import multiparty from 'multiparty';
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try{
        await db.connectDb();
        const id = req.query.id;
        console.log(req.body.formData, 'form');
        const brandfound =  await Brand.findById(id);
        console.log(brandfound);
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
        const result =  await Brand.updateOne({_id: id}, fields );
        await db.disconnectDb();
        if (result.modifiedCount === 1) {
            return res.status(200).json({
                status: 'Success',
                statusCode: '200',
                responseData: {
                    "message": "Brand updated successfully"
              }
            })
        } else {
            return res.status(500).json({
                status: 'Failure',
                statusCode: '500',
                responseData: {
                    "message": "Brand not updated"
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