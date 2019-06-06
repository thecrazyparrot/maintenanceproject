const scripcreateDB = " " +
    "CREATE DATABASE IF NOT EXISTS `Maquinaria` " +
    "  USE Maquinaria" +
    " CREATE TABLE IF NOT EXISTS `Companies` ( " +
    "  `idCompany` int(11) NOT NULL AUTO_INCREMENT, " +
    "  `company_name` varchar(100) NOT NULL," +
    "  `company_creationDay` datetime DEFAULT CURRENT_TIMESTAMP, " +
    "  `company_active` tinyint(4) DEFAULT '1', " +
    "   PRIMARY KEY (`idCompany`), " +
    "   UNIQUE KEY `idCompanies_UNIQUE` (`idCompany`) " +
    "   ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; "

let databaseOps = {};

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Alicia.12",
    database: "Maquinaria"
    //,insecureAuth : true
});



databaseOps.inicialization = (callback) => {
    if (connection) {

    } else {
        connection.query(scripcreateDB, (err, result) => {
            if (err) {
                throw err;

            } else {
                callback(null, {
                    msg: 'Database created'
                });

            }
        })
    }
};
