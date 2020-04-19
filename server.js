var http = require('http');
var mysql = require('mysql');
const auth = {
    user: 'sergey',
    pass: 'raamypa$5'
}


var con = mysql.createConnection({
    host: "localhost",
    user: "sergey",
    password: "raamypa$5",
    database : 'raa'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


http.createServer(function (req, res) {
    con.query(`select * from tbl_camera;`,(error, results, fields)=>{
        console.info(error);
        console.info(results);
        console.info(fields);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
    
}).listen(3000);

console.log('Server running at http://raa.mamble.us/');