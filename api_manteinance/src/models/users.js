var mysql = require('mysql');

let userModel = {};

userModel.getuser = (callback) => {
    if (global.db) {
        global.db.query(
            'Select * FROM users order by username',
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

userModel.insertUser = (userData, callback) => {
    if (global.db) {
        global.db.query(
            'INSERT INTO users set ?', userData,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.affectedRows
                    })
                }
            }
        )
    }

}

userModel.updateUser = (userData, callback) => {
    if (global.db) {
        const sql = `
           UPDATE users SET
           username = ${global.db.escape(userData.username)},
           password = ${global.db.escape(userData.password)},
           email = ${global.db.escape(userData.email)}
           WHERE uuiduser = ${global.db.escape(userData.iduser)}
           `
        global.db.query(sql, (err, result) => {
            //console.log(result);
            if (err) {
                throw err;

            } else {
                if (result.affectedRows !== '0') {

                    callback(null, {
                        msg: 'success'
                    });
                } else {

                    callback(null, {
                        msg: 'not exist'
                    });
                }

            }
        })
    }
}


    userModel.deleteUser = (userData, callback) => {

        if (global.db) {

            let sql = `Select * FROM users WHERE uuiduser = ${global.db.escape(userData.uuiduser)}`

            global.db.query(sql, (err, row) => {
                if (row) {

                    let sql = `DELETE FROM users WHERE uuiduser = ${global.db.escape(userData.uuiduser)}`;

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




module.exports = userModel;