requisitos (Requirements):
- HTLM5
- CSS3
- JS
- jQuery 3.7.0
- Docker CLI (Docker Desktop, Rancher Desktop)

Clonar (Clone):
- git clone https://github.com/GestionGastos/gestion_gastos_frontend.git

Ejecutar docker build para crear la imagen desde la raiz del proyecto (Execute docker build to create the image from the project root):
- docker build -t budget-frontend-server:v1 .

Creat una nueva red para conectar los contenedores de frontend y backend si la red no existe (Create a new network to connect the frontend and backend containers if the network doesn't exist):
- docker network create -d bridge budget-servers-network

Ejecutar docker tun para crear el contenedor desde la ruta del proyecto (Execute docker run to create the container from the project root):
- docker run -d -p 88:80 --name=budget-frontend -v $PWD/src:/usr/local/apache2/htdocs/ --network=budget-servers-network budget-frontend-server:v1

Para chequear el frontend usa las urls debajo (to checkt the frontend use the urls below):
- Spanish version:
http://localhost:88/es/views/login.html
- English version:
http://localhost;:88/en/views/login.html
