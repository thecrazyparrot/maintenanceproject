const Users = require('../models/users');
const uuidv4 = require('uuid/v4');

module.exports = function (app) {

    app.get('/users', (req, res) => {
        Users.getuser((err, data) => {
            res.status(200).json(data);
        });
    });


    app.post('/users', (req, res) => {
        const userData = {
            iduser: uuidv4(),
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            create_time: new Date().getUTCDate
        };

        Users.insertUser(userData, (err, data) => {
            if (data && data.insertId) {
                res.json({
                    success: true,
                    msg: 'Usuario creado.',
                    data: data
                })
            } else {
                res.success(500).json({
                    success: false,
                    msg: 'Error al crear el usuario'
                })

            }
        })

    });


    app.put('/users', (req, res) => {

        const userData = {
            iduser: req.body.iduser,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        Users.updateUser(userData, (err, data) => {

            // if (data && data.msg && data.msg ==! 'not exist') {

            if (data.msg !== 'not exist') {
                res.json(data);
                console.log(data);
            } else {
                res.status(404).json({
                    success: false,
                    msg: data.msg
                })
            }
        })

    });

    app.delete('/users/:uuiduser', (req, res) => {

        
        Users.deleteUser(req.params, (err, data) => {

            if (data && (data.msg === 'deleted' || data.msg === 'not exist')) {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: 'Error'
                })
            }
        })

    })

}