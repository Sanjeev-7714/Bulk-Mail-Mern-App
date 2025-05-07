# 📧 Bulk Mail Sender 🚀

A full-stack application for sending mass emails from a single interface. Upload your email list via Excel and send personalized messages to multiple recipients at once.

## ✨ Features

- 📊 Excel file upload support for email lists
- ✉️ Send the same message to multiple recipients
- 🔄 Real-time sending status updates
- 🎨 Clean, responsive UI with Tailwind CSS
- 🔒 Secure email credential management via MongoDB

## 🛠️ Technology Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for API requests
- XLSX for Excel file parsing

### Backend
- Node.js with Express
- MongoDB for storing email credentials
- Nodemailer for sending emails
- CORS for cross-origin requests

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB account
- Gmail account (for sending emails)

### Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/bulk-mail-sender.git
cd bulk-mail-sender
```

2. Install backend dependencies:
```sh
cd backend
npm install
```

3. Install frontend dependencies:
```sh
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```sh
cd backend
node index.js
```

2. Start the frontend development server:
```sh
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## 📝 Usage

1. Prepare an Excel file with email addresses in the first column
2. Enter your email message in the text area
3. Upload your Excel file using the file input
4. Click "Send" to start sending emails
5. Wait for confirmation that all emails have been sent

## 📋 Configuration

Before using the application, make sure to:

1. Set up your MongoDB collection with email credentials
2. The credential collection should have fields for `user` and `pass`

## 👏 Acknowledgements

- [Nodemailer](https://nodemailer.com/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)

## 📩 Contact  
Feel free to reach out via [ LinkedIn: https://www.linkedin.com/in/sanjeev-dev7714/ ].  

---