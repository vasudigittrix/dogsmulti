import bcrypt from 'bcrypt';
import User from '@/models/User';
import db from '@/utils/db';
// import { createRouter } from "next-connect";
// import { createActivationToken } from '../../../../utils/tokens';
// import { sendEmail } from '../../../../utils/sendEmails';
// import { activateEmailTemplate } from '../../../../emails/activateEmailTemplate';

// const router = createRouter();

export default async function handler(req, res) {
  if (req.method === 'POST'){
  try {
    await db.connectDb();
    console.log(req.body);
    const { firstName, lastName, email, password, gender, phonenumber } = req.body;
    if ( !email || !password) {
      return res.status(500).json({
        statusCode: "500",
        status: "failure", 
        responseData: { message: "Please fill in all fields."   },
      });
    }


    const user = await User.findOne({ email });
   
    if (user) {
      return res.status(500).json({
        statusCode: "500",
        status: "failure",
        responseData: { message: "User already exists" },
      });
    }

    if (password.length < 8) {
      return res.status(500).json({
        responseData: { message: "Password must be atleast 8 characters." },
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName,lastName, email,
      password: cryptedPassword,
      role: 'admin',
      status: 'true', 
      gender, 
      phonenumber
    });
     await newUser.save();

    await db.disconnectDb();
    return res.status(200).json({
      status: "success",
      statusCode: "200",
      message: "Account Created",
      responseData: {
        message: "User Created Successfully",
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
  }
};

