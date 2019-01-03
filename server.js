const express = require('express');
const compression = require('compression');
const mysql      = require('mysql');
const bodyParser = require("body-parser"); // Body parser for fetch posted data

const CONTEXT = '/angular-ngrx-material-starter';
const PORT = 3500;

const app = express();

app.use(compression());
app.use(require('cors')());
app.use(CONTEXT, express.static(__dirname + '/dist'));
app.use('/', express.static(__dirname + '/dist'));
app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(PORT, () => console.log(`App running on localhost:${PORT}/${CONTEXT}`));

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'raw_dasystem'
  });
  
  connection.connect();

  app.post('/login',function(req,res){
    console.log(req.body);
    var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
    var table = ["users", "username", req.body.username, "password", req.body.password];
    query = mysql.format(query,table);
    console.log(query); 
    connection.query(query,function(err, rows, fields){
        if(rows.length != 0){
            res.status(200).json({
                user_id: rows[0].user_id,
                code: rows[0].code,  
                token: 'dacaraga'});
        }else{
            res.status(400).json('Invalid Username or Password');
        }
    });
});

  app.get('/mfos',function(req,res){ 
    connection.query(`
    SELECT *, tbl_mfo.mfo_id FROM tbl_mfo left JOIN tbl_allotment 
    on tbl_mfo.mfo_id = tbl_allotment.mfo_id 
    LEFT JOIN tbl_object 
    on tbl_allotment.object_id=tbl_object.object_id`, function (error, results) {
        if (error) throw error;
        res.json(results); 
      });
  });

  app.post('/addObject', function(req, res){
    var query = "INSERT INTO tbl_allotment (mfo_id, object_id) VALUES (?,?)";
    var data = [req.body.mfo_id, req.body.object_id];
    query = mysql.format(query,data);
    console.log(query); 
    connection.query(query, function(err, rows){
        if (err) throw res.status(400).json(err);
        if (rows.insertId){
            res.status(200).json("Successfully Object Added!")
        }
    })
  })

  app.get('/summaryObject', function(req, res){
      connection.query(`  
      SELECT a.object_id, b.name, b.type, b.header, SUM(budget) as budget, SUM(adjustment) as adj, SUM(jan) as jan, SUM(feb) as feb, SUM(mar) as mar, SUM(apr) as apr, SUM(may) as may, SUM(jun) as jun, SUM(jul) as jul, SUM(aug) as aug, SUM(sep) as sep, SUM(oct) as oct, SUM(nov) as nov, SUM(decm) as decm FROM tbl_allotment a LEFT JOIN tbl_object b ON a.object_id = b.object_id GROUP BY a.object_id
      `, function(error, results){
        if (error) throw error;
        res.json(results);

      })
  })
  //connection.end();
