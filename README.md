<img width="1257" height="857" alt="image" src="https://github.com/user-attachments/assets/62b05af6-df3e-49b0-8f2f-4bc3f5dc932e" />



project board: https://www.notion.so/Deploy-Node-App-w-Docker-AWS-2aa62cf00b7680f0a15de34681d9e69f?source=copy_link
===================================================================================
Local Testing
- verify containers are working as intended:

#Pull images from Docker Hub

$docker pull cchinothai/deploy-web-app-backend:latest

$docker pull cchinothai/deploy-web-app-frontend:latest

#Run containers
$ docker run -d -p 4000:4000 --name backend-container cchinothai/deploy-web-app-backend:latest

$ docker run -d -p 3000:80 --name frontend-container cchinothai/deploy-web-app-frontend:latest




