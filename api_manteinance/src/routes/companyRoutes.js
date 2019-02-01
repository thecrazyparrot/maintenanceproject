const Company = require('../models/company');

module.exports = function (app) {

    app.get('/companies', (req, res) => {
        Company.getCompany((err, data) => {
            res.status(200).json(data);
        });
    });


    app.post('/companies', (req, res) => {
        const companyData = {
            idcompany: null,
            company_name: req.body.company_name,
            company_creationDay: new Date().getUTCDate,
            company_active: 1
        };

        Company.insertCompany(companyData, (err, data) => {
            if (data && data.insertId) {
                res.json({
                    success: true,
                    msg: 'Empresa creada.',
                    data: data
                })
            } else {
                res.success(500).json({
                    success: false,
                    msg: 'Error al crear la empresa'
                })

            }
        })

    });


    app.put('/Companies', (req, res) => {

        const companyData = {
            idCompany: req.body.idcompany,
            company_name: req.body.company_name,
            company_active: req.body.company_active
        };

        Company.updateCompany(companyData, (err, data) => {

            if (data && data.msg) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: 'Error al actualizar'
                })
            }
        })

    })


    app.delete('/companies/:idcompany', (req, res) => {

        Company.deleteCompany(req.params, (err, data) => {

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
