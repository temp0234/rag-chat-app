# RAG Chat Application

This application provides a chat interface that connects to an n8n workflow for RAG (Retrieval Augmented Generation) document assistance.

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- An active n8n workflow on n8n cloud

### Configuration Steps

1. **Configure the n8n Webhook URL**: 
   - Copy `.env.example` to `.env`:
     ```
     cp .env.example .env
     ```
   - Edit the `.env` file and update the `REACT_APP_N8N_WEBHOOK_URL` with your actual n8n webhook URL from the "When chat message received" node in your workflow.

2. **Install dependencies**: 
   ```
   npm install
   ```

3. **Start the development server**:
   ```
   npm start
   ```

4. **Build for production**:
   ```
   npm run build
   ```
   The build artifacts will be in the `build` folder.

## Deployment Options

### Option 1: Static Site Hosting
You can deploy the built app to any static site hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

When using a static site hosting service, make sure to configure the environment variable for the webhook URL according to the platform's instructions.

### Option 2: Docker Deployment
You can containerize the application and deploy it using Docker:

1. Build the Docker container (make sure to have your `.env` file set up first):
   ```
   docker build -t rag-chat-app .
   ```

2. Run the Docker container:
   ```
   docker run -p 80:80 rag-chat-app
   ```

   Or with an environment variable:
   ```
   docker run -p 80:80 -e REACT_APP_N8N_WEBHOOK_URL=https://your-instance.n8n.cloud/webhook/your-webhook-id rag-chat-app
   ```

## Features
- Real-time chat interface
- Session management for conversation history
- Connection to n8n workflow via webhook
- Responsive design for desktop and mobile use

## Important Notes
- This application must be able to reach your n8n cloud instance webhook URL
- CORS settings on your n8n instance may need to be configured to allow requests from your app's domain
- For security, always use environment variables for sensitive information in production deployments

## Troubleshooting

### CORS Issues
If you're experiencing CORS (Cross-Origin Resource Sharing) issues:

1. Ensure your n8n cloud instance is configured to accept requests from your app's domain
2. Check if your browser is blocking the requests
3. Consider using a CORS proxy during development if needed

### Connection Problems
If the chat application can't connect to your n8n webhook:

1. Verify the webhook URL is correct
2. Ensure your n8n workflow is active and running
3. Check the browser console for error messages
