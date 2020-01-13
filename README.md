# OrderManagement server

This server has the different handlers for Order Management. This server is used by Aggregator service to get the order details for analysis purpose.

## Getting Started

The server is written in node JS using express framework and  mongoDB. 

### Prerequisites
Please install following softwares before pulling the project.

 1,Node JS\
 2,MongoDB (running as a service)\
 3,Docker\

### Installing for Dev

1,Pull the code from this repository  by executing the following command.

```
git clone https://github.com/Sivaraj23/OrderManagementService_301.git
```

2,move to the Order Management folder and  execute npm install

```
cd  OrderManagementService_301
npm i
```
3,The project is now ready to run.
```
npm start
```

you can try placing order by hitting http://localhost:3002/api/orders/createOrder with followig payload.
```
      {	
      "user":<USER_ID_AS_STRING>,
        "restaurant":<RESTAURANT_ID_AS_STRING>,
        "orderItems" : [{
            "foodItem":<FOOD_ID_AS_STRING>,
            "quantity":<NUMBER>
        },
        {
            "foodItem":<FOOD_ID_AS_STRING>,
            "quantity":<NUMBER>
        }]
      }
```
## Running the tests

Run the testcases by executing following command
```
npm run test
```


## Deployment in Docker

#### building docker container
```
docker build -t orderserver .
```

## To run in Docker

#### Run consul in docker container
```
docker run -d -p 8500:8500 -p 8600:8600/udp --name=badger consul agent -server -ui -node=server-1 -bootstrap-expect=1 -client=0.0.0.0
```
#### Run Mongo DB container
```
docker run --name mongoserver  -it -d mongo
docker run -it --link=mongoserver:mongo mongo /bin/bash
```
#### Get Mongo IP  and PORT by executing the following command in mongo bash
```
env
```
#### To run Order Management  server
```
docker run -e MONGO_IP="<MONGO_DB_IP>"  -e CONSUL_IP="<CONSUL_IP>" -e MONGO_PORT="<MONGO_DB_PORT>" -it -d -p <HOST_PORT>:<CONTAINER:PORT> orderserver
```


## Built With

* [NodeJS](https://nodejs.org/) 
* [Express JS](https://expressjs.com/)
* [MONGO DB](https://www.mongodb.com/)