const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const app = express();

// Configure CORS to accept requests from Vercel frontend and localhost
app.use(cors({
  origin: ["https://bulk-mail-mern-app-mu.vercel.app", "https://bulk-mail-sender-backend-dsk1.onrender.com", process.env.FRONTEND_URL || "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());

// Use environment variable for port
const PORT = process.env.PORT || 5000;

// Use environment variable for MongoDB connection string with fallback
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Sanjeev:passkey1234567@cluster0.q2ljzd7.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function(){
  console.log("Connected to database");
}).catch(function(error){
  console.log("Error connecting to database:", error.message);
})

const credential = mongoose.model("Credential",{},"bulkmail");

// Change from GET to POST since we're sending data
app.post("/sendemail", function (req, res) {

  var msg = req.body.msg;
  var emailList = req.body.emailList;

  credential.find().then(function(data){

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: data[0].toJSON().user,
        pass: data[0].toJSON().pass,
      },
    });
  
    new Promise(async function (resolve, reject) {
      try {
        for (var i = 0; i < emailList.length; i++) {
          await transporter.sendMail(
            {
              from: "sanjusanjeev023@gmail.com",
              to: emailList[i],
              subject: "Test mail",
              text: msg,
            },
          );
  
          console.log("Email sent to : " + emailList[i]);
        }
  
        resolve("Emails sent successfully");
      }
      catch (error) {
        console.error("Error sending emails:", error);
        reject(error);
      }
    }).then(function (result) {
      res.send(result);
    }).catch(function (error) {
      res.status(500).send("Error sending emails: " + error.message);
    });
  }).catch(function(error){
    res.status(500).send("Error fetching credentials: " + error.message);
  });
});

// Start the server
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});