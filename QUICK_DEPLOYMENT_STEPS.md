# Quick Deployment Steps for Bulk Mail Sender

## Frontend Deployment (Vercel)

1. **Push your code to GitHub** (if not already done)

2. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub account

3. **Import your repository**
   - Click "Add New" → "Project"
   - Find and select your repository
   - Configure project settings:
     - Root Directory: `frontend`
     - Framework Preset: Create React App

4. **Configure environment variables**
   - Add `REACT_APP_API_URL` with your backend URL (e.g., https://your-backend.onrender.com)

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your frontend

## Backend Deployment (Render)

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)

2. **Create a new Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository

3. **Configure the service**
   - Name: bulk-mail-sender-backend
   - Root Directory: `backend` (if your repo contains both frontend and backend)
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add environment variables**
   - MONGODB_URI: Your MongoDB Atlas connection string
   - FRONTEND_URL: Your Vercel frontend URL

5. **Deploy**
   - Click "Create Web Service"

## Database Setup (MongoDB Atlas)

1. **Sign up/Login to MongoDB Atlas**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a new cluster**
   - Choose the free tier option

3. **Set up database access**
   - Create a database user with password
   - Add your IP to the IP access list (or allow access from anywhere)

4. **Get your connection string**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password

5. **Use this connection string as your MONGODB_URI environment variable in Render**

## Final Steps

1. After both deployments are complete, test your application by visiting your Vercel URL

2. If you encounter any issues, check the logs in both Vercel and Render dashboards

> **Note**: For detailed instructions, refer to the comprehensive DEPLOYMENT_GUIDE.md file.