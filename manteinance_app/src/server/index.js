require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const epilogue = require('epilogue');
const mysql = require('mysql');
const session = require('express-session')
const uuid = require('uuid/v4')

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use(session({
    genid: (req) => {
      console.log('Inside the session middleware')
      console.log(req.sessionID)
      return uuid() // use UUIDs for session IDs
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

const database = new Sequelize('Maquinaria', 'root', 'Alicia.12', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',//|'sqlite'|'postgres'|'mssql',
    sync: { force: false }
});



// const database = new Sequelize({
//   dialect: 'sqlite',
//   storage: './test.sqlite',
// });

// sequelize= new Sequelize 'test','root','root',
//   host: '192.168.59.103'
//   port: '3306'
//   define:
//     charset:'utf8'
//     collate:'utf8_general_ci'
//   logging: off

const companies = database.define('companies', 
{
    
    id_company: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        field: 'id_company'
    },
    company_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    company_creationDay: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
},
    {
        tableName: 'companies',
       // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: true
   }
   );
    companies.removeAttribute('id');

// const Companies = database.define('companies', {
//     company_id: Sequelize.UUIDV4,
//     company_name: Sequelize.STRING,
//     company_active: Sequelize.BOOLEAN,
// });




const devices = database.define('devices', {
    deviceId: 
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },

    deviceName: Sequelize.STRING,
    DeviceEnable:
    {
        type: Sequelize.BOOLEAN,
        defaultValue: true

    }},
    {
        tableName: 'devices',
        // don't add the timestamp attributes (updatedAt, createdAt)
        //timestamps: false
    });
    devices.belongsTo(companies); 

const workordes = database.define('workordes',{
    workorder_Id :{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid()
    },
    ordernumber: Sequelize.STRING,
    deviceId: Sequelize.INTEGER
},
{
    tableName: 'workorders',
    // don't add the timestamp attributes (updatedAt, createdAt)
    //timestamps: false
});

epilogue.initialize({ app, sequelize: database });

epilogue.resource({
    model: companies,
    endpoints: ['/companies', '/companies/:id_company'],
});

epilogue.resource({
    model: devices,
    endpoints: ['/devices', '/devices/:deviceId'],
});

const port = process.env.SERVER_PORT || 3000;

database.sync().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});