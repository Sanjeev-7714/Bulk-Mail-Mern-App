import { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';
// If framer-motion is not installed, run: npm install framer-motion

function App() {

  const [msg, setmsg] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [emailList, setEmailList] = useState([])

  function handleMsg(evt)
  {
    setmsg(evt.target.value)
  }

  function handleFile(event)
  {
    const file = event.target.files[0];
    console.log(file);
    
    const reader = new FileReader();

    reader.onload = function(event){
        const data = event.target.result;
        const workbook = XLSX.read(data, {type: 'binary'});
        console.log(workbook);
        const sheetNames = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetNames];
        console.log(worksheet);
        const emailList = XLSX.utils.sheet_to_json(worksheet, {header: 'A'});
        const totalemail = emailList.map(function(item){return item.A})
        console.log(totalemail);
        setEmailList(totalemail);
        
    }

    reader.readAsBinaryString(file);
  }

  function send()
  {
    setIsSending(true);
    
    // Use environment variable for API URL with fallback to localhost
    axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/sendemail`, { msg: msg, emailList: emailList })
      .then(response => {
        console.log("Email sent:", response.data);
        alert("Email sent successfully!");
        setIsSending(false);
      })
      .catch(error => {
        console.error("Error sending email:", error);
        alert("Error sending email. Check console for details.");
        setIsSending(false);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans">
      {/* Header Section with Animation */}
      <motion.header 
        className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Bulk Mail Sender</h1>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 md:mt-0"
            >
              <p className="text-xl text-blue-100">Send emails to multiple recipients at once</p>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Email Composer Section */}
          <div className="p-6 sm:p-10 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Compose Your Email
            </motion.h2>
            
            <motion.div 
              className="bg-white rounded-lg shadow-inner p-6"
              whileHover={{ boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <textarea 
                onChange={handleMsg} 
                value={msg} 
                className="w-full h-40 p-4 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none" 
                placeholder="Enter your email message here..."
              ></textarea>
            </motion.div>
          </div>

          {/* File Upload Section */}
          <motion.div 
            className="p-6 sm:p-10 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Upload Email List</h2>
            
            <div className="mb-8">
              <motion.div 
                className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input 
                  type="file" 
                  onChange={handleFile} 
                  className="hidden" 
                  id="file-upload" 
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <span className="text-lg font-medium text-blue-600">Click to upload Excel file</span>
                    <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                  </div>
                </label>
              </motion.div>
            </div>

            {/* Email Count and Send Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <motion.div 
                className="bg-blue-100 rounded-lg px-6 py-3 mb-4 sm:mb-0"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-blue-800 font-medium">
                  <span className="font-bold">{emailList.length}</span> {emailList.length === 1 ? 'email' : 'emails'} loaded
                </p>
              </motion.div>
              
              <motion.button 
                onClick={send} 
                disabled={isSending || emailList.length === 0 || !msg.trim()}
                className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg transform transition-all duration-200 ${isSending || emailList.length === 0 || !msg.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'}`}
                whileHover={{ scale: isSending || emailList.length === 0 || !msg.trim() ? 1 : 1.05 }}
                whileTap={{ scale: isSending || emailList.length === 0 || !msg.trim() ? 1 : 0.95 }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {isSending ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : "Send Emails"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.section 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {[
            {
              title: "Bulk Sending",
              description: "Send the same email to multiple recipients at once",
              icon: (
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              )
            },
            {
              title: "Excel Import",
              description: "Easily import email lists from Excel spreadsheets",
              icon: (
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              )
            },
            {
              title: "Time Saving",
              description: "Save hours of manual work with automated sending",
              icon: (
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              )
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + (index * 0.1) }}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white mt-16">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-blue-200">© {new Date().getFullYear()} Bulk Mail Sender. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;