var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Alicia.12",
  database: "Maquinaria"
  //,insecureAuth : true
});

let companyModel = {};

companyModel.getCompany = (callback) => {
if (con){
    con.query (
            'Select * FROM companies order by company_name', 
            (err,rows) => {
               if (err) {
               throw err;
             } else { 
                callback (null,rows);
             }
         }
        )
    }
};

companyModel.insertCompany = (companyData, callback) => {
    if (con){
        con.query(
            'INSERT INTO companies set ?', companyData,
            (err, result) => {
                if (err){
                throw err;
            } else {
                callback(null, {
                    'insertId' : result.insertId
                })
            }
        }
        )
    }

}

companyModel.updateCompany = (companyData,callback) => {
    if (con) {
          const sql =  `
           UPDATE companies SET
           company_name = ${con.escape(companyData.company_name)},
           company_active = ${con.escape(companyData.company_active)}
           WHERE idCompany = ${con.escape(companyData.idCompany)}
           `
           

           con.query(sql, (err, result) =>{
               if (err) {
                   throw err;

               } else {
                   callback (null, {
                       msg : 'Compañia actualizada'
                   });
               }
           })
        }
}

companyModel.deleteCompany = (companyData,callback) => {
   
    if (con) {
        console.log(companyData.idcompany);
          let sql =  `Select * FROM companies WHERE idCompany = ${con.escape(companyData.idcompany)}`
         
          console.log(sql);
           con.query(sql, (err, row) =>{
            if(row){
               
                let sql = `DELETE FROM companies WHERE idCompany = ${con.escape(companyData.idcompany)}`;
               
            con.query(sql, (err, result) =>{
            if (err) {
                   throw err;

               } else {
                   callback (null, {
                       msg : 'deleted'
                   });
               }
            })
        } else{
            callback(null, {
                msg:'not exist'
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