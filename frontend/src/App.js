import { useState } from 'react';
import axios from 'axios'; // Add this import
import * as XLSX from 'xlsx'; // Import the xlsx library

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
    // Rest of your component remains the same
    <div>
      <div className="bg-blue-950 text-white text-center p-8">
        <h1 className="text-2xl font-medium">Bulk Mail</h1>
      </div>

      <div className="bg-blue-800 text-white text-center p-8">
        <h1 className="text-2xl font-medium">We Can Help You Sending Multiple Mail At Once !</h1>
      </div>

      <div className="bg-blue-600 text-white text-center p-8">
        <h1 className="text-2xl font-medium mb-5">Drag & Drop</h1>

        <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-10">
          <textarea onChange={handleMsg} value={msg} className="w-[80%] h-32 py-2 outline-none px-2 border-black rounded-md" placeholder="Enter The Email Text..."></textarea>
        </div>

        <div>
          <input type="file" onChange={handleFile} className="border border-dashed py-4 px-4 mt-5 mb-5" />
          <p>Total Email in The File : {emailList.length}</p>
          <button 
            onClick={send} 
            disabled={isSending}
            className="bg-blue-950 py-2 px-2 text-white font-medium rounded-md w-fit mt-5"
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      <div className="bg-blue-500 text-white text-center p-16"></div>
      <div className="bg-blue-500 text-white text-center p-20"></div>

    </div>
  );
}

export default App;