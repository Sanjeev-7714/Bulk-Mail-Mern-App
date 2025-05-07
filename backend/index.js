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

    // Create nodemailer transporter with more secure settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: data[0].toJSON().user,
        pass: data[0].toJSON().pass,
      },
      tls: {
        // Do not fail on invalid certificates
        rejectUnauthorized: false
      }
    });
    
    // Verify transporter configuration before sending emails
    transporter.verify().then(function() {
      console.log("Server is ready to send emails");
      
      // Only proceed with sending emails after successful verification
      return new Promise(async function (resolve, reject) {
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
          // Provide more detailed error information
          if (error.code === 'EAUTH') {
            console.error("Authentication error: Check your Gmail credentials and make sure you're using an App Password if 2FA is enabled");
            reject(new Error("Authentication failed: Please check your Gmail credentials and security settings"));
          } else if (error.code === 'ESOCKET') {
            console.error("Network error: Check your internet connection");
            reject(new Error("Network error: Unable to connect to email server"));
          } else if (error.code === 'ERR_BAD_RESPONSE' || error.message.includes('status code 500')) {
            console.error("Server error: The mail server returned a bad response");
            reject(new Error("Mail server error: Please try again later or check your Gmail account settings"));
          } else {
            reject(error);
          }
        }
      });
    }).catch(function(verifyError) {
      // Handle verification errors
      console.error("SMTP verification failed:", verifyError);
      res.status(500).send("Email configuration error: " + verifyError.message + 
        "\n\nNote: If using Gmail, make sure you have:\n" +
        "1. Enabled 'Less secure app access' in your Google account, OR\n" +
        "2. Created an App Password if 2FA is enabled\n" +
        "3. Allowed access to your Google account from this application");
      return Promise.reject(verifyError); // Prevent further promise chain execution
    }).then(function (result) {
      res.send(result);
    }).catch(function (error) {
      // Only handle errors that weren't already handled in the verification catch block
      if (!res.headersSent) {
        res.status(500).send("Error sending emails: " + error.message);
      }
    });
  }).catch(function(error){
    res.status(500).send("Error fetching credentials: " + error.message);
  });
});

// Start the server
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});