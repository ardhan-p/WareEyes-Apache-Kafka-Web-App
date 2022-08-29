# WareEyes-ReactJS-Frontend
A web application built using React framework that monitors an inventory system in real-time using Apache Kafka.

This repository contains the frontend section. For backend section, refer to https://github.com/ardhan-p/wareeyes-springboot-backend

## Offline Installation
1. Ensure that Node.JS and Node Package Manager installed.

2. Ensure that Kafka and backend application is installed. [(backend repository link)](https://github.com/ardhan-p/wareeyes-springboot-backend)

2. Clone this repository to a local directory.

3. Inside the respository, install the dependencies with following command:
```
npm install --save --legacy-peer-deps
```

4. Create a new Kafka zookeeper instance and Kafka server instance with the following commands:
```
bin/zookeeper-server-start.sh config/zookeeper.properties
```

```
bin/kafka-server-start.sh config/server.properties
```

4. Run the backend program from the jar file with the following command:
```
java -jar app.jar
```

5. Run the frontend program with following command:
```
npm start
```

## Application Images

![Screenshot 2022-08-26 at 8 56 00 PM](https://user-images.githubusercontent.com/49318134/186909694-2b127006-e553-4678-b473-a5ef4207ae16.png)

![Screenshot 2022-08-26 at 8 57 32 PM](https://user-images.githubusercontent.com/49318134/186910068-fabc6f74-5474-4218-b079-e6c803fd0631.png)

![Screenshot 2022-08-26 at 8 57 57 PM](https://user-images.githubusercontent.com/49318134/186910172-737af08a-8be7-42c1-a96f-bb5598dea9a2.png)

![Screenshot 2022-08-26 at 8 58 15 PM](https://user-images.githubusercontent.com/49318134/186910191-9b36b98a-2127-49fe-a422-8c4720c7a7d5.png)

![Screenshot 2022-08-26 at 8 58 26 PM](https://user-images.githubusercontent.com/49318134/186910195-6cd6a8a8-20cf-4218-8667-09e0ea475051.png)

![Screenshot 2022-08-26 at 8 58 33 PM](https://user-images.githubusercontent.com/49318134/186910197-9606a1f1-78e6-45b6-af9f-b2ea42dfaa85.png)
