const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

function createTransporter() {
  //for creating transporter; an object that will send the email
  const transporter = nodemailer.createTransport(config); //createTransporter is a method of nodemailer that creates a transporter object
  return transporter;
}

let configurations = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
};

const sendMail = async (messageOptions) => { //messOption is a parameter that has all option needed for a message
  const transporter = await createTransporter(configurations); //calls createTrransporter to create transporter
  await transporter.verify(); //verifies the transporter object is working properly
  await transporter.sendMail(messageOptions, (error, info) => {
    //sendMail is a method of transporter that sends the email
    if (error) {
      console.log(error); //if there is an error, log it to the console
    }

    console.log(info.response); //if the email is sent successfully, log the response to the console
  });
};

module.exports = sendMail; //exporting sendMail function to be used in other files
