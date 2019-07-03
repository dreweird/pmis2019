const express = require('express');
const compression = require('compression');
const mysql      = require('mysql');
const bodyParser = require("body-parser"); // Body parser for fetch posted data
const async = require('async');
const path = require('path');
var staticRoot = __dirname + './dist'; 
const CONTEXT = '/angular-ngrx-material-starter';
const PORT = 3115;

const app = express();

app.use(compression());
app.use(require('cors')());
app.use(CONTEXT, express.static(__dirname + '/dist'));
app.use('/', express.static(__dirname + '/dist'));
app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({ extended: false }));
//app.listen(PORT, '172.16.130.8', () => console.log(`App running on localhost:${PORT}/${CONTEXT}`));
app.listen(PORT, '0.0.0.0', () => console.log(`App running on localhost:${PORT}/${CONTEXT}`));

const connection = mysql.createConnection({
    host : '172.16.130.8',
    user : 'pmis',
    password : 'pmis',
    database : 'raw_dasystem2019',
  });
  
  connection.connect();

  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/dashboard', function(req, res) {
 
    data = [];
    function delay() {
        return new Promise(resolve => setTimeout(resolve, 500));
      }
      
      async function delayedLog(item) {
        // notice that we can await a function
        // that returns a promise
        connection.query(`
        SELECT sum(janft) as janft FROM tbl_mfo where program_id =`+item, function (error, results) {
            if (error) throw error;
            results.id = item;
            data.push(results); 
          });
        await delay();
        console.log(data);
      }
      async function processArray(array) {
        const promises = array.map(delayedLog);
        // wait until all promises are resolved
        await Promise.all(promises);
        res.send(data);
        console.log('Done!');
      }
      
      processArray([1, 2, 3, 4, 5]);
  });

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
    var query = "SELECT * FROM tbl_mfo INNER JOIN tbl_district on tbl_mfo.mfo_id = tbl_district.mfo_id WHERE tbl_mfo.program_id = ? group by tbl_mfo.mfo_id";
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
                        var sql = `SELECT mfo_id,province,district,sum(target) as target ,cost, sum(accomp) as accomp, 
                        GROUP_CONCAT(CONCAT(municipal, '(', target,')') SEPARATOR ", ") as text, 
                        GROUP_CONCAT(CASE WHEN accomp>0 THEN CONCAT(municipal, '(', accomp,')') ELSE NULL END  SEPARATOR ", " ) as text2
                        FROM tbl_district where mfo_id = ? and province= ? and district=1 GROUP BY mfo_id,province,district`;
                        connection.query(String(sql),[mfo_id, prov,],function(k_err,k_rows){
                            if(k_err) console.error(k_err);
                            if(k_rows[0] === undefined){
                                callback(null, {accomp: null, cost: null, target: null, text: null, text2: null})
                            }else{
                                callback(null, k_rows[0]);  
                            }                           
                                        
                        });                        
                    },
                     two: function(callback) {
                        var sql = `SELECT mfo_id,province,district,sum(target) as target ,cost,  sum(accomp) as accomp,
                        GROUP_CONCAT(CONCAT(municipal, '(', target,')') SEPARATOR ", ") as text,
                        GROUP_CONCAT(CASE WHEN accomp>0 THEN CONCAT(municipal, '(', accomp,')') ELSE NULL END  SEPARATOR ", " ) as text2
                        FROM tbl_district where mfo_id = ? and province=? and district=2 GROUP BY mfo_id,province,district`;
                        console.log(sql);
                        connection.query(String(sql),[mfo_id, prov,],function(k_err,k_rows){
                            if(k_err) console.error(k_err);        
                            if(k_rows[0] === undefined){
                                callback(null, {accomp: null, cost: null, target: null, text: null})
                            }else{
                                callback(null, k_rows[0]);  
                            }               
                        });   
            
                    },
                    // three: function(callback) {
                    //     var sql = `SELECT mfo_id,province,district,sum(accomp) as accomp , 
                    //     GROUP_CONCAT(CONCAT(municipal, '(', accomp,')') SEPARATOR ", ") as text 
                    //     FROM tbl_district where mfo_id = ? and province=? and district=1 and accomp>0 GROUP BY mfo_id,province,district`;
                    //     connection.query(String(sql),[mfo_id, prov,],function(k_err,k_rows){
                    //         if(k_err) console.error(k_err);        
                    //          callback(null, k_rows[0]);              
                    //     });                        
                    // },
                    //  four: function(callback) {
                    //     var sql = `SELECT mfo_id,province,district,sum(accomp) as accomp , 
                    //     GROUP_CONCAT(CONCAT(municipal, '(', accomp,')') SEPARATOR ", ") as text 
                    //     FROM tbl_district where mfo_id = ? and province=? and district=2 and accomp>0 GROUP BY mfo_id,province,district`;
                    //     connection.query(String(sql),[mfo_id, prov,],function(k_err,k_rows){
                    //         if(k_err) console.error(k_err);        
                    //          callback(null, k_rows[0]);              
                    //     });   
            
                    // }  
                }, function(err, results) {                 
                    return callback(null, results);
                });                  
            }

            async.map(province, districtFunction, function(err, result){
                console.log(result);
                itemsProcessed++;
                row.dist = result;
                if(itemsProcessed === rows.length) {
                    datares["data"] =  rows;
                    res.json(rows);                           
                }
            
                /*row.area=result;
                itemsProcessed++;
                if(itemsProcessed === rows.length) {
                    datares["data"] =  rows;
                    res.json(datares);                           
                }*/
            });
        })
        if(rows.length<=0) res.json(rows);

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
    var query = "INSERT INTO tbl_allotment (mfo_id, object_id, pid) VALUES (?,?,?)";
    var data = [req.body.mfo_id, req.body.object_id, req.body.pid];
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
    var query = "INSERT INTO tbl_logs (pid, mfo_id, message, date, beds) VALUES (?, ?, ?, NOW(), ?)";
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
  });

  app.post('/getFinPerformance', function(req, res){
    connection.query(`
    SELECT b.pid, a.name, a.ft, a.janft, a.febft, a.marft, a.aprft, a.mayft, a.junft, a.julft, a.augft, a.sepft, a.octft, a.novft, a.decft, 
    a.dt, a.jandt, a.febdt, a.mardt, a.aprdt, a.maydt, a.jundt, a.juldt, a.augdt, a.sepdt, a.octdt, a.novdt, a.decdt, 
    a.pt, a.jant, a.febt, a.mart, a.aprt, a.mayt, a.junt, a.jult, a.augt, a.sept, a.octt, a.novt, a.dect, 
    a.pa, a.jana, a.feba, a.mara, a.apra, a.maya, a.juna, a.jula, a.auga, a.sepa, a.octa, a.nova, a.deca, 
    sum((b.jan + b.feb + b.mar + b.apr + b.may + b.jun + b.jul + b.aug + b.sep + b.oct + b.nov + b.decm)) AS fa ,
    sum(b.jan) as janfa,
    sum(b.feb) as febfa,
    sum(b.mar) as marfa,
    sum(b.apr) as aprfa,
    sum(b.may) as mayfa,
    sum(b.jun) as junfa,
    sum(b.jul) as julfa,
    sum(b.aug) as augfa,
    sum(b.sep) as sepfa,
    sum(b.oct) as octfa,
    sum(b.nov) as novfa,
    sum(b.decm) as decfa,
    sum((b.jan_da + b.feb_da + b.mar_da + b.apr_da + b.may_da + b.jun_da + b.jul_da + b.aug_da + b.sep_da + b.oct_da + b.nov_da + b.dec_da)) AS da,
    sum(b.jan_da) as janda,
    sum(b.feb_da) as febda,
    sum(b.mar_da) as marda,
    sum(b.apr_da) as aprda,
    sum(b.may_da) as mayda,
    sum(b.jun_da) as junda,
    sum(b.jul_da) as julda,
    sum(b.aug_da) as augda,
    sum(b.sep_da) as sepda,
    sum(b.oct_da) as octda,
    sum(b.nov_da) as novda,
    sum(b.dec_da) as decda
    FROM tbl_allotment as b left join 
    (   SELECT a.program_id, u.first_name as name, SUM((a.janft + a.febft + a.marft + a.aprft + a.mayft + a.junft + a.julft + a.augft + a.sepft + a.octft + a.novft + a.decft)) AS ft, 
            sum(a.janft) as janft,
            sum(a.febft) as febft, 
            sum(a.marft) as marft, 
            sum(a.aprft) as aprft, 
            sum(a.mayft) as mayft,
            sum(a.junft) as junft,
            sum(a.julft) as julft,
            sum(a.augft) as augft,
            sum(a.sepft) as sepft,
            sum(a.octft) as octft,
            sum(a.novft) as novft,
            sum(a.decft) as decft,
            SUM( (a.jandt + a.febdt + a.mardt + a.aprdt + a.maydt + a.jundt + a.juldt + a.augdt + a.sepdt + a.octdt + a.novdt + a.decdt) ) AS dt,
            sum(a.jandt) as jandt,
            sum(a.febdt) as febdt, 
            sum(a.mardt) as mardt, 
            sum(a.aprdt) as aprdt, 
            sum(a.maydt) as maydt,
            sum(a.jundt) as jundt,
            sum(a.juldt) as juldt,
            sum(a.augdt) as augdt,
            sum(a.sepdt) as sepdt,
            sum(a.octdt) as octdt,
            sum(a.novdt) as novdt,
            sum(a.decdt) as decdt,
            SUM( (a.jant + a.febt + a.mart + a.aprt + a.mayt + a.junt + a.jult + a.augt + a.sept + a.octt + a.novt + a.dect) ) AS pt,
            sum(a.jant) as jant,
            sum(a.febt) as febt, 
            sum(a.mart) as mart, 
            sum(a.aprt) as aprt, 
            sum(a.mayt) as mayt,
            sum(a.junt) as junt,
            sum(a.jult) as jult,
            sum(a.augt) as augt,
            sum(a.sept) as sept,
            sum(a.octt) as octt,
            sum(a.novt) as novt,
            sum(a.dect) as dect,
            SUM( (a.jana + a.feba + a.mara + a.apra + a.maya + a.juna + a.jula + a.auga + a.sepa + a.octa + a.nova + a.deca) ) AS pa,
            sum(a.jana) as jana,
            sum(a.feba) as feba, 
            sum(a.mara) as mara, 
            sum(a.apra) as apra, 
            sum(a.maya) as maya,
            sum(a.juna) as juna,
            sum(a.jula) as jula,
            sum(a.auga) as auga,
            sum(a.sepa) as sepa,
            sum(a.octa) as octa,
            sum(a.nova) as nova,
            sum(a.deca) as deca
            FROM  tbl_mfo AS a left join users as u on  a.program_id = u.program_id
            GROUP BY a.program_id) as a on a.program_id = b.pid
    where pid=`+req.body.pid, function(error, results){
      if (error) throw error;
      res.json(results);

    })
});

  app.get('/getFinPerformance', function(req, res){
    connection.query(`
    SELECT b.pid, a.name, a.ft, a.janft, a.febft, a.marft, a.aprft, a.mayft, a.junft, a.julft, a.augft, a.sepft, a.octft, a.novft, a.decft, 
    a.dt, a.jandt, a.febdt, a.mardt, a.aprdt, a.maydt, a.jundt, a.juldt, a.augdt, a.sepdt, a.octdt, a.novdt, a.decdt, 
    a.pt, a.jant, a.febt, a.mart, a.aprt, a.mayt, a.junt, a.jult, a.augt, a.sept, a.octt, a.novt, a.dect, 
    a.pa, a.jana, a.feba, a.mara, a.apra, a.maya, a.juna, a.jula, a.auga, a.sepa, a.octa, a.nova, a.deca, 
    sum((b.jan + b.feb + b.mar + b.apr + b.may + b.jun + b.jul + b.aug + b.sep + b.oct + b.nov + b.decm)) AS fin ,
    sum(b.jan) as janfa,
    sum(b.feb) as febfa,
    sum(b.mar) as marfa,
    sum(b.apr) as aprfa,
    sum(b.may) as mayfa,
    sum(b.jun) as junfa,
    sum(b.jul) as julfa,
    sum(b.aug) as augfa,
    sum(b.sep) as sepfa,
    sum(b.oct) as octfa,
    sum(b.nov) as novfa,
    sum(b.decm) as decfa,
    sum((b.jan_da + b.feb_da + b.mar_da + b.apr_da + b.may_da + b.jun_da + b.jul_da + b.aug_da + b.sep_da + b.oct_da + b.nov_da + b.dec_da)) AS dis,
    sum(b.jan_da) as janda,
    sum(b.feb_da) as febda,
    sum(b.mar_da) as marda,
    sum(b.apr_da) as aprda,
    sum(b.may_da) as mayda,
    sum(b.jun_da) as junda,
    sum(b.jul_da) as julda,
    sum(b.aug_da) as augda,
    sum(b.sep_da) as sepda,
    sum(b.oct_da) as octda,
    sum(b.nov_da) as novda,
    sum(b.dec_da) as decda
    FROM tbl_allotment as b left join 
    (   SELECT a.program_id, u.first_name as name, SUM((a.janft + a.febft + a.marft + a.aprft + a.mayft + a.junft + a.julft + a.augft + a.sepft + a.octft + a.novft + a.decft)) AS ft, 
            sum(a.janft) as janft,
            sum(a.febft) as febft, 
            sum(a.marft) as marft, 
            sum(a.aprft) as aprft, 
            sum(a.mayft) as mayft,
            sum(a.junft) as junft,
            sum(a.julft) as julft,
            sum(a.augft) as augft,
            sum(a.sepft) as sepft,
            sum(a.octft) as octft,
            sum(a.novft) as novft,
            sum(a.decft) as decft,
            SUM( (a.jandt + a.febdt + a.mardt + a.aprdt + a.maydt + a.jundt + a.juldt + a.augdt + a.sepdt + a.octdt + a.novdt + a.decdt) ) AS dt,
            sum(a.jandt) as jandt,
            sum(a.febdt) as febdt, 
            sum(a.mardt) as mardt, 
            sum(a.aprdt) as aprdt, 
            sum(a.maydt) as maydt,
            sum(a.jundt) as jundt,
            sum(a.juldt) as juldt,
            sum(a.augdt) as augdt,
            sum(a.sepdt) as sepdt,
            sum(a.octdt) as octdt,
            sum(a.novdt) as novdt,
            sum(a.decdt) as decdt,
            SUM( (a.jant + a.febt + a.mart + a.aprt + a.mayt + a.junt + a.jult + a.augt + a.sept + a.octt + a.novt + a.dect) ) AS pt,
            sum(a.jant) as jant,
            sum(a.febt) as febt, 
            sum(a.mart) as mart, 
            sum(a.aprt) as aprt, 
            sum(a.mayt) as mayt,
            sum(a.junt) as junt,
            sum(a.jult) as jult,
            sum(a.augt) as augt,
            sum(a.sept) as sept,
            sum(a.octt) as octt,
            sum(a.novt) as novt,
            sum(a.dect) as dect,
            SUM( (a.jana + a.feba + a.mara + a.apra + a.maya + a.juna + a.jula + a.auga + a.sepa + a.octa + a.nova + a.deca) ) AS pa,
            sum(a.jana) as jana,
            sum(a.feba) as feba, 
            sum(a.mara) as mara, 
            sum(a.apra) as apra, 
            sum(a.maya) as maya,
            sum(a.juna) as juna,
            sum(a.jula) as jula,
            sum(a.auga) as auga,
            sum(a.sepa) as sepa,
            sum(a.octa) as octa,
            sum(a.nova) as nova,
            sum(a.deca) as deca
            FROM  tbl_mfo AS a left join users as u on  a.program_id = u.program_id 
            where u.budget = 0
            GROUP BY a.program_id) as a on a.program_id = b.pid 
    group by pid
    `, function(error, results){
      if (error) throw error;
      res.json(results);

    })
});
  //connection.end();

  app.get('/', function (req, res) {
    res.sendFile(path.join(staticRoot,'index.html'))
    });
    
    app.get('*', function (req, res) {
        res.sendFile(path.join(staticRoot,'index.html'));
       });
    
