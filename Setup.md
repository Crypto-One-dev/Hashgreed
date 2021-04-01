# Guide for Hashgreed Setup

## 1. Install NodeJS and NGINX and configure

### 1) Install NodeJS

    apt install nodejs
    
### 2) Install NGINX

    apt install nginx

### 3) Configure NGINX

    nano /etc/nginx/sites-available/default
    
And Copy&Paste the following config in the `default` file

    server {
        listen 80 default_server;
        server_name _;
        location / {
            root /home/hashgreed/client/build;
            try_files $uri /index.html;
        }
        location /api/ {
            limit_req zone=waves burst=15000;
            proxy_pass http://localhost:5000/;
           
        }
    }

Restart NGINX

    service nginx restart

## 1. Clone GitHub Repository

    cd /home
    git clone https://github.com/Shing-Ho/hashgreed.git
    
## 3. Edit .env files in frontend and backend

Edit /home/hashgreed/.env

    nano /home/hashgreed.env
    
And Copy&Paste the following config in the `.env` file

    REACT_APP_BASE_URL=https://hashgreed.com
    MONGO_URI=mongodb+srv://hashgreed:AwesomeksschainX9p@demo.kmrk2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    SENDINBLUE_LOGIN=<sendinblue smtp account email>
    SENDINBLUE_PASSW=<sendinblue smtp account password>
    
Edit /home/hashgreed/client/.env

    nano  /home/hashgreed/client/.env
    
And Copy&Paste the following config in the .env file

    REACT_APP_BASE_URL=https://hashgreed.com


## 4. Install dependencies, build for frontend and run backend

    cd /home/hashgreed
    npm install && npm run build
    npm install -g pm2
    pm2 start server.js
    pm2 startup
    pm2 save
    
### 

