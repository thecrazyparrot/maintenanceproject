const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const scripcreateDB = ' CREATE DATABASE IF NOT EXISTS `Maquinaria` ;' +
    '  USE Maquinaria ; ' +
    ' CREATE TABLE IF NOT EXISTS `Companies` ( ' +
    '  `idCompany` int(11) NOT NULL AUTO_INCREMENT, ' +
    '  `company_name` varchar(100) NOT NULL,' +
    '  `company_creationDay` datetime DEFAULT CURRENT_TIMESTAMP, ' +
    '  `company_active` tinyint(4) DEFAULT 1 , '  +
    '   PRIMARY KEY (`idCompany`), ' +
    '   UNIQUE KEY `idCompanies_UNIQUE` (`idCompany`) ' +
    '   ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; ' +
    
    '  CREATE TABLE IF NOT EXISTS `Maquinaria`.`users` ( ' +
    '   `iduser` BINARY(16) NOT NULL, ' +
    '   `username` VARCHAR(16) NOT NULL, ' +
    '   `email` VARCHAR(255) NULL, ' +
    '   `password` VARCHAR(32) NOT NULL, ' +
    '   `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP, ' +
    '   PRIMARY KEY (`iduser`)); ' ;

// const dbOps = require('./db/databases');
// console.log(scripcreateDB);

const db = mysql.createConnection ({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Alicia.12",
  database: "Maquinaria"
});

// db.connect((err) => {
//      if (err) {
 //       db.query(scripcreateDB);
//      }
   
// });

 db.connect((err) => {
    if (err) {
        throw err;
    }
 });
console.log('Connected to database');

global.db = db;

//settings
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'pug');
//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());


// //prepare database
// dbOps.inicialization();

//routes
require('./src/routes/companyRoutes')(app);
require('./src/routes/userroutes')(app);
require('./src/routes/userroutes')(app);






app.set('set', process.env.PORT || 3000);

app.listen(app.get('port'), ()=>{
console.log('server on port 3000');
});