var sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE,(err) => {
    if(err){
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_name text,
                description text,
                category text,
                brand text,
                expiry_date text,
                manufacture_date text,
                batch_number INTEGER,
                unit_price INTEGER,
                created_date text
        )`, (err) => {
            if(err){
                console.log('Table already created.');
            } else {
                var insert = 'INSERT INTO products (product_name,description,category,brand,expiry_date,manufacture_date,batch_number,unit_price,created_date) VALUES (?,?,?,?,?,?,?,?,?)';
                db.run(insert,['Apple iPhone','Apple iPhone 15 Pro','Mobile Phones','Apple','N/A','15/09/2024','001','1099','15/09/2022']);   
            }
        });
    }
});

module.exports = db;