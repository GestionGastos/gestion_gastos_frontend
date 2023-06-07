requisitos:
- HTLM5
- CSS3
- JS
- jQuery 3.7.0
- Docker CLI

Clonar:
- git clone https://github.com/GestionGastos/gestion_gastos_frontend.git

Execute docker build to create the image on the project root
- docker build -t budget-frontend-server:v1 .

Create a new network to connect the frontend and backend containers
- docker network create -d bridge budget-servers-network

Execute docker run to create the container on the project root
- docker run -d -p 88:80 --name=budget-frontend -v $PWD/src:/usr/local/apache2/htdocs/ --network=budget-servers-network budget-frontend-server:v1

Navigate in the browser:
- Spanish version:
http://localhost:88/es/views/login.html
- English version:
http://localhost;:88/en/views/login.html
