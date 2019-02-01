var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   password: "Alicia.12",
//   database: "Maquinaria"
//   //,insecureAuth : true
// });

let companyModel = {};

companyModel.getCompany = (callback) => {
    if (global.db) {
        global.db.query(
            'Select * FROM companies order by company_name',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        )
    }
};

companyModel.insertCompany = (companyData, callback) => {
    if (global.db) {
        global.db.query(
            'INSERT INTO companies SET ?', companyData,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            }
        )
    }

}

companyModel.updateCompany = (companyData, callback) => {
    if (global.db) {
        const sql = `
           UPDATE companies SET
           company_name = ${global.db.escape(companyData.company_name)},
           company_active = ${global.db.escape(companyData.company_active)}
           WHERE idCompany = ${global.db.escape(companyData.idCompany)}
           `


        global.db.query(sql, (err, result) => {
            if (err) {
                throw err;

            } else {
                callback(null, {
                    msg: 'Compañia actualizada'
                });
            }
        })
    }
}

companyModel.deleteCompany = (companyData, callback) => {

    if (global.db) {

        let sql = `Select * FROM companies WHERE idCompany = ${global.db.escape(companyData.idcompany)}`

        global.db.query(sql, (err, row) => {
            if (row) {

                let sql = `DELETE FROM companies WHERE idCompany = ${global.db.escape(companyData.idcompany)}`;

                global.db.query(sql, (err, result) => {
                    if (err) {
                        throw err;

                    } else {
                        callback(null, {
                            msg: 'deleted'
                        });
                    }
                })
            } else {
                callback(null, {
                    msg: 'not exist'
                })
            }
        })
    }
}


// companyModel.insertCompany = (userData, callback) =>{
//     if (con) {
//         con.query(
//             'Insert Into Companies '
//         )
//     }
// }

module.exports = companyModel;