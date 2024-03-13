<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Gmail and Twilio Call Project</h1>

<h2>Overview</h2>
<p>This project is aimed at automating the process of fetching emails from a Gmail account and making a call using Twilio based on certain conditions in the email content. It utilizes Node.js, Express.js, Axios, Google Gmail API, Twilio API, and node-cron for scheduling tasks.</p>

<h2>Prerequisites</h2>
<ul>
  <li>Node.js and npm</li>
  <li>Google Cloud Console project with Gmail API enabled</li>
  <li>Twilio account with an active phone number</li>
</ul>

<h2>Installation</h2>
<ol>
  <li>Clone this repository to your local machine.</li>
  <li>Install dependencies by running <code>npm install</code> in the project directory.</li>
  <li>Create a <code>.env</code> file in the project directory and add the following environment variables:</li>
</ol>
<pre><code>PORT=8000
EMAIL=your_gmail_account@gmail.com
TWILIO_SID=your_twilio_account_sid
TWILIO_TOKEN=your_twilio_auth_token
TWILIO_PHONE=your_twilio_phone_number
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
REDIRECT_URI=your_google_redirect_uri
REFRESH_TOKEN=your_google_refresh_token
</code></pre>
<ol start="4">
  <li>Update the <code>YOUR_REDIRECT_URI</code> placeholder in <code>googleAuth.js</code> with your redirect URI for OAuth 2.0 authentication.</li>
  <li>Run the application using <code>node index.js</code>.</li>
</ol>

<h2>Usage</h2>
<ul>
  <li>Access the application at <code>http://localhost:8000</code>.</li>
  <li>The <code>/api/mail/list/:email</code> endpoint fetches emails from the specified Gmail account.</li>
  <li>The application uses cron jobs to periodically fetch emails and make Twilio calls based on predefined conditions.</li>
</ul>

<h2>API Endpoints</h2>
<ul>
  <li><code>GET /api/mail/list/:email</code>: Fetch emails from the specified Gmail account.</li>
  <li>More endpoints can be added for additional functionality as needed.</li>
</ul>

<h2>Folder Structure</h2>
<ul>
  <li><code>controllers/</code>: Contains controller functions for handling API requests.</li>
  <li><code>route.js</code>: Defines API routes using Express.js.</li>
  <li><code>googleAuth.js</code>: Handles Google OAuth 2.0 authentication for Gmail API.</li>
  <li><code>twilio.js</code>: Sets up Twilio client and function for making calls.</li>
  <li><code>index.js</code>: Entry point of the application.</li>
</ul>

<h2>Contributing</h2>
<p>Contributions are welcome! Feel free to open issues or submit pull requests.</p>

<h2>License</h2>
<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
