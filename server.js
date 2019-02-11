const express = require('express');
const compression = require('compression');
const mysql      = require('mysql');
const bodyParser = require("body-parser"); // Body parser for fetch posted data
var async = require('async');
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
                pid: rows[0].program_id,
                b: rows[0].budget,
                username: rows[0].username,  
                token: 'dacaraga'});
        }else{
            res.status(400).json('Invalid Username or Password');
        }
    });
});

  app.post('/mfos',function(req,res){
      var query = `
      SELECT *, tbl_mfo.mfo_id FROM tbl_mfo left JOIN tbl_allotment 
      on tbl_mfo.mfo_id = tbl_allotment.mfo_id 
      LEFT JOIN tbl_object 
      on tbl_allotment.object_id=tbl_object.object_id where program_id = ?`;
      var data = [req.body.pid];
      query = mysql.format(query,data);
    console.log(query); 
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.json(results); 
      });
  });

  app.post('/mfosPhysical',function(req,res){ 
    connection.query(`
    SELECT * FROM tbl_mfo where program_id =`+req.body.pid, function (error, results) {
        if (error) throw error;
        res.json(results); 
      });
  });

  app.post('/getLogs', function(req, res){
    var query = "SELECT * FROM tbl_logs where pid = ? and beds = ? order by date DESC";
    var data = [req.body.pid, req.body.beds];
    query = mysql.format(query,data);
    console.log(query); 
    connection.query(query, function(err, rows){
        if (err) throw res.status(400).json(err);   
        res.json(rows); 
    
    })
  });

  app.post('/getDistrict', function(req, res){
    var query = "SELECT * FROM tbl_mfo WHERE tbl_mfo.program_id = ?";
    var data = [req.body.pid];
    var datares={};
    query = mysql.format(query,data);
    console.log(query); 
    connection.query(query, function(err, rows){
        var province = ["Agusan del Norte", "Agusan del Sur", "Surigao del Norte", "Surigao del Sur", "Province of Dinagat Islands", "Butuan City"];
        var itemsProcessed = 0;
        async.each(rows, function(row, callback){
            var mfo_id = row.mfo_id;
            //console.log(mfo_id);
            var districtFunction =function(prov, callback){
                var arr = [];
                async.parallel({
                    one: function(callback) {
                        var sql = `SELECT mfo_id,province,district,sum(target) as target ,cost, 
                        GROUP_CONCAT(CONCAT(municipal, '(', target,')') SEPARATOR ", ") as text 
                        FROM tbl_district where mfo_id = ? and province=? and district=1 GROUP BY mfo_id,province,district`;
                        connection.query(String(sql),[mfo_id, prov,],function(k_err,k_rows){
                            if(k_err) console.error(k_err);        
                             callback(null, k_rows[0]);              
                        });                        
                    },
                     two: function(callback) {
                        var sql = `SELECT mfo_id,province,district,sum(target) as target ,cost, 
                        GROUP_CONCAT(CONCAT(municipal, '(', target,')') SEPARATOR ", ") as text 
                        FROM tbl_district where mfo_id = ? and province=? and district=2 GROUP BY mfo_id,province,district`;
                        connection.query(String(sql),[mfo_id, prov,],function(k_err,k_rows){
                            if(k_err) console.error(k_err);        
                             callback(null, k_rows[0]);              
                        });   
            
                    },
                    three: function(callback) {
                        var sql = `SELECT mfo_id,province,district,sum(accomp) as accomp , 
                        GROUP_CONCAT(CONCAT(municipal, '(', accomp,')') SEPARATOR ", ") as text 
                        FROM tbl_district where mfo_id = ? and province=? and district=1 and accomp>0 GROUP BY mfo_id,province,district`;
                        connection.query(String(sql),[mfo_id, prov,],function(k_err,k_rows){
                            if(k_err) console.error(k_err);        
                             callback(null, k_rows[0]);              
                        });                        
                    },
                     four: function(callback) {
                        var sql = `SELECT mfo_id,province,district,sum(accomp) as accomp , 
                        GROUP_CONCAT(CONCAT(municipal, '(', accomp,')') SEPARATOR ", ") as text 
                        FROM tbl_district where mfo_id = ? and province=? and district=2 and accomp>0 GROUP BY mfo_id,province,district`;
                        connection.query(String(sql),[mfo_id, prov,],function(k_err,k_rows){
                            if(k_err) console.error(k_err);        
                             callback(null, k_rows[0]);              
                        });   
            
                    }  
                }, function(err, results) {
                    return callback(null, results);
                });                  
            }

            async.map(province, districtFunction, function(err, result){
                async.each(result, function(rslt, callback){
                var province = ["Agusan del Norte", "Agusan del Sur", "Surigao del Norte", "Surigao del Sur", "Province of Dinagat Islands", "Butuan City"];
                var prvnc = ["adn", "ads", "sdn", "sds", "pdi", "bxu"];
                var pc=0;
                for(var c = 0;c<province.length;c++){
                    var g1=false,g2=false,g3=false,g4=false;
                    if(rslt.one==undefined){ g1=true; } else{
                        //console.log(rslt.one.province);
                        if(rslt.one.province==province[c]){
                            row[prvnc[c]+'1area'] = rslt.one.text;
                            row[prvnc[c]+'1target'] = rslt.one.target;
                            row[prvnc[c]+'1cost'] = rslt.one.cost;
                            //console.log(row[prvnc[c]+'1area']);
                            g1=true;
                        }}
                    if(rslt.two==undefined){ g2=true; } else
                        if(rslt.two.province==province[c]){
                            row[prvnc[c]+'2area'] = rslt.two.text;
                            row[prvnc[c]+'2target'] = rslt.two.target;
                            row[prvnc[c]+'2cost'] = rslt.two.cost;
                            //console.log(row.two);
                        g2=true;
                        }
                        if(rslt.three==undefined){ g3=true; } else{
                            //console.log(rslt.one.province);
                            if(rslt.three.province==province[c]){
                                row[prvnc[c]+'1aarea'] = rslt.three.text;
                                row[prvnc[c]+'1aaccomp'] = rslt.three.accomp;
                                //console.log(row[prvnc[c]+'1area']);
                                g3=true;
                            }}
                        if(rslt.four==undefined){ g4=true; } else
                            if(rslt.four.province==province[c]){
                                row[prvnc[c]+'2aarea'] = rslt.four.text;
                                row[prvnc[c]+'2aaccomp'] = rslt.four.accomp;
                                //console.log(row.two);
                            g4=true;
                            }
                    if(g1 && g2 && g3 && g4){
                        pc++;
                        if(pc==prvnc.length){
                            itemsProcessed++;
                            if(itemsProcessed === rows.length) {
                                datares["data"] =  rows;
                                console.log(datares);
                                res.json(datares);                           
                            }
                        }
                    }
                }
                });
                /*row.area=result;
                itemsProcessed++;
                if(itemsProcessed === rows.length) {
                    datares["data"] =  rows;
                    res.json(datares);                           
                }*/
            });
        })

        if (err) throw res.status(400).json(err);   
        //res.json(rows); 
    
    })
  });

  app.post('/getDistrictDetails', function(req, res){
    var query = "SELECT * FROM tbl_district left join tbl_mfo on tbl_district.mfo_id = tbl_mfo.mfo_id  WHERE province like(?) and district = ? and tbl_district.mfo_id = ?";
    var data = req.body.data;
    console.log(data);
    query = mysql.format(query,[data.province,data.district,data.mfo_id]);
    console.log(query); 
    connection.query(query, function(err, rows){
        if (err) throw res.status(400).json(err);
        if (rows.length > 0){
            res.json(rows); 
        }
    })
  });

  app.post('/updateDistrictDetails', function(req, res){
    var query = "UPDATE tbl_district SET accomp = ? WHERE id = ?";
    var data = req.body.data;
    //console.log(data);
    query = mysql.format(query,[Number(data.accomp),data.id]);
    console.log(query); 
    connection.query(query, function(err, rows){
        console.log(rows);
        if (err) throw res.status(400).json(err);
        if (rows.affectedRows > 0){
            console.log(rows);
            res.json(rows); 
        }
    })
  });

  app.post('/lastUpdated', function(req, res){
    var query = "SELECT date FROM tbl_logs where pid = ? and beds = ? ORDER BY date DESC LIMIT 1 ";
    var data = [req.body.pid, req.body.beds];
    query = mysql.format(query,data);
    console.log(query); 
    connection.query(query, function(err, rows){
        if (err) throw res.status(400).json(err);
        if (rows.length > 0){
            res.json(rows[0].date); 
        }else{
            res.json(null);
        }
        
   
    })
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
  });

  app.post('/addLogs', function(req, res){
    var query = "INSERT INTO tbl_logs (uid, mfo_id, message, date, beds) VALUES (?, ?, ?, NOW(), ?)";
    var data = [req.body.uid, req.body.mfo_id, req.body.message, req.body.beds];
    query = mysql.format(query,data);
    console.log(query); 
    connection.query(query, function(err, rows){
        if (err) throw res.status(400).json(err);
        if (rows.insertId){
            res.status(200).json("Successfully Logs Added!")
        }
    })
  });

  app.post('/updateAllotment', function(req, res){
    var query = "UPDATE tbl_allotment SET ?? = ? WHERE id = ?";
    var data = [req.body.col, req.body.value, req.body.id];
    query = mysql.format(query,data);
    console.log(query); 
    connection.query(query, function(err, rows){
        if (err) throw res.status(400).json(err);
        if (rows.changedRows){
            res.status(200).json("Successfully Updated!")
        }
    })
  });

  app.post('/updatePhysical', function(req, res){
    var query = "UPDATE tbl_mfo SET ?? = ? WHERE mfo_id = ?";
    var data = [req.body.col, req.body.value, req.body.id];
    query = mysql.format(query,data);
    console.log(query); 
    connection.query(query, function(err, rows){
        if (err) throw res.status(400).json(err);
        if (rows.changedRows){
            res.status(200).json("Successfully Updated!")
        }
    })
  });

  app.post('/summaryObject', function(req, res){
      connection.query(`  
      SELECT a.object_id, b.name, b.type, b.header, SUM(budget) as budget, SUM(adjustment) as adj, SUM(jan) as jan, SUM(feb) as feb, SUM(mar) as mar, SUM(apr) as apr, SUM(may) as may, SUM(jun) as jun, SUM(jul) as jul, SUM(aug) as aug, SUM(sep) as sep, SUM(oct) as oct, SUM(nov) as nov, SUM(decm) as decm, SUM(jan_da) as jan_da, SUM(feb_da) as feb_da, SUM(mar_da) as mar_da, SUM(apr_da) as apr_da, SUM(may_da) as may_da, SUM(jun_da) as jun_da, SUM(jul_da) as jul_da, SUM(aug_da) as aug_da, SUM(sep_da) as sep_da, SUM(oct_da) as oct_da, SUM(nov_da) as nov_da, SUM(dec_da) as dec_da FROM tbl_allotment a LEFT JOIN tbl_object b ON a.object_id = b.object_id 
       where pid =`+req.body.pid+` GROUP BY a.object_id
      `, function(error, results){
        if (error) throw error;
        res.json(results);

      })
  })
  //connection.end();
