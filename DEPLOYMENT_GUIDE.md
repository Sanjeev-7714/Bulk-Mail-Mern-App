# Deployment Guide for Bulk Mail Sender MERN Application

## Overview

This guide will help you deploy your Bulk Mail Sender application with:
- Frontend hosted on Vercel
- Backend hosted on Render (or alternative platforms)
- MongoDB Atlas for database hosting

## Frontend Deployment (Vercel)

Vercel is an excellent platform for hosting React applications with zero configuration, automatic deployments, and a global CDN.

### Step 1: Prepare Your Frontend

1. Create a `.env.production` file in your frontend directory with the following content:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

2. Update your API calls in the frontend code to use the environment variable:

```javascript
// In App.js, replace:
axios.post("http://localhost:5000/sendemail", { msg: msg, emailList: emailList })

// With:
axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/sendemail`, { msg: msg, emailList: emailList })
```

3. Build your frontend application:

```sh
cd frontend
npm run build
```

### Step 2: Deploy to Vercel

1. Sign up for a free account at [Vercel](https://vercel.com)

2. Install Vercel CLI (optional):

```sh
npm install -g vercel
```

3. Deploy using Vercel CLI (from the frontend directory):

```sh
vercel login
vercel
```

4. Alternatively, deploy using the Vercel dashboard:
   - Connect your GitHub/GitLab/Bitbucket account
   - Import your repository
   - Configure the project:
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Add environment variables:
     - REACT_APP_API_URL: https://your-backend-url.onrender.com

## Backend Deployment (Render)

Render provides free hosting for Node.js applications with automatic deployments from Git.

### Step 1: Prepare Your Backend

1. Create a `Procfile` in your backend directory:

```
web: node index.js
```

2. Update your backend code to use environment variables for the port and MongoDB connection:

```javascript
// In index.js, add:
const PORT = process.env.PORT || 5000;

// Update MongoDB connection to use environment variable:
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Sanjeev:passkey1234567@cluster0.q2ljzd7.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0")

// Update the listen method:
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
```

3. Add CORS configuration to accept requests from your Vercel frontend:

```javascript
// Update CORS configuration
app.use(cors({
  origin: ["https://your-frontend-url.vercel.app", "http://localhost:3000"],
  credentials: true
}));
```

4. Create a `start` script in your backend's package.json:

```json
"scripts": {
  "start": "node index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Step 2: Deploy to Render

1. Sign up for a free account at [Render](https://render.com)

2. Create a new Web Service:
   - Connect your GitHub/GitLab repository
   - Configure the service:
     - Name: bulk-mail-sender-backend
     - Root Directory: `backend` (if your repo contains both frontend and backend)
     - Runtime: Node
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Add environment variables:
     - PORT: 10000 (Render will automatically set this, but you can specify it)
     - MONGODB_URI: Your MongoDB Atlas connection string

## Database Setup (MongoDB Atlas)

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Create a new cluster (the free tier is sufficient for most small applications)

3. Set up database access:
   - Create a database user with read/write permissions
   - Add your IP address to the IP access list (or allow access from anywhere for development)

4. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string and replace `<password>` with your database user's password

5. Use this connection string as your MONGODB_URI environment variable in Render

## Final Steps

1. Update your frontend's `.env.production` file with the actual backend URL after deployment

2. Redeploy your frontend if necessary

3. Test the complete application flow

## Security Considerations

1. Never commit sensitive information like database credentials to your repository

2. Use environment variables for all sensitive information

3. Consider implementing rate limiting on your backend to prevent abuse

4. Set up proper authentication for your application if it's going to be used in production

## Troubleshooting

- If you encounter CORS issues, double-check your CORS configuration in the backend
- If emails aren't sending, verify your Gmail credentials and ensure less secure app access is enabled
- For MongoDB connection issues, check your network access settings in MongoDB Atlas

## Alternative Hosting Options

### Backend Alternatives

- **Heroku**: Similar to Render with a free tier (requires credit card for verification)
- **Railway**: Developer-friendly platform with a generous free tier
- **Fly.io**: Great performance with a generous free tier

### Database Alternatives

- **Supabase**: PostgreSQL database with a generous free tier
- **Firebase**: NoSQL database with a generous free tier (different structure than MongoDB)

## Maintenance

Regularly check for:
- Security updates for your dependencies
- MongoDB Atlas usage to stay within free tier limits
- Render/Vercel usage to stay within free tier limits