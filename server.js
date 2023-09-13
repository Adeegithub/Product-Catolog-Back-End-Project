const express = require('express');
var app = express();
var db = require('./database.js');
var bodyParser = require('body-parser');
// const { request, response } = require('express');
app.use(bodyParser.json());
let HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
    console.log('Server is running on port %PORT%'.replace('%PORT%', HTTP_PORT));
});

app.post('/api/products/', (request, response, next) => {

    try {

        var errors = [];
        if (!request.body) {
            errors.push('No body data');
        }

        const {
            product_name,
            description,
            category,
            brand,
            expiry_date,
            manufacture_date,
            batch_number,
            unit_price,
            created_date
        } = request.body;

        var sql = 'INSERT INTO products (product_name,description,category,brand,expiry_date,manufacture_date,batch_number,unit_price,created_date) VALUES (?,?,?,?,?,?,?,?,?)';
        var params = [product_name, description, category, brand, expiry_date, manufacture_date, batch_number, unit_price, created_date];

        db.run(sql, params, function (err, result) {
            if (err) {
                response.status(400).json({ "error": err.message });
                return;
            } else {
                response.json({
                    "message": "success",
                    "data": request.body,
                    "id": this.lastID
                });
            }
        });
    }
    catch (error) {
        response.status(400).json({ "error": error.message });
    }
});

app.get("/api/products", (req, res, next) => {

    try {
        var sql = "select * from products"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.put("/api/products/", (req, res, next) => {

    try {
        const {
            id,
            product_name,
            description,
            category,
            brand,
            expiry_date,
            manufacture_date,
            batch_number,
            unit_price,
            created_date
        } = req.body;

        db.run(`UPDATE products set product_name = ?, description = ?, category = ?, brand = ?, expiry_date = ?, manufacture_date = ?, batch_number = ?, unit_price = ?, created_date = ? WHERE id = ?`,
            [product_name, description, category, brand, expiry_date, manufacture_date, batch_number, unit_price, created_date, id],
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    message: "success",
                    data: req.body,
                    changes: this.changes
                })
            });
    } catch (E) {
        res.status(400).send(E);
    }
});

app.delete("/api/products/delete/:id", (req, res, next) => {
    try {
        db.run('DELETE FROM products WHERE id = ?',
            req.params.id,
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ "message": "deleted", rows: this.changes })
            });
    } catch (E) {
        res.status(400).send(E)
    }
});