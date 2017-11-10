// var con = require('./sqldb');

function retrival(app, pool){


  app.get("/emp/:id", function(req, res){


          var query1 = "SELECT name,id, contactNumber1 FROM Employee WHERE manager_id IS NULL"; //Declare @ID int ; Set @ID = 7;

        //  var query = "DECLARE @ID INT(11); SET @ID := 3;WITH EmployeeCTE AS(Select id, name, manager_id, contactNumber1 From Employee Where id = @ID UNION ALL Select Employee.id , Employee.name, Employee.manager_id From Employee JOIN EmployeeCTE ON Employee.id = EmployeeCTE.manager_id) Select E1.name, ISNULL(E2.name, 'No Boss') as manager From EmployeeCTE E1  LEFT Join EmployeeCTE E2 ON E1.id = E2.id"

          pool.query(query1, function (error, rootResults, fields) {


                if (error) throw error;
                console.log(rootResults[0]["id"],"vvvv")
                  var query2 = "SELECT name,id, contactNumber1 FROM Employee WHERE manager_id IN (";

                for(var i=0;i<rootResults.length;i++){
                  query2 = query2 + rootResults[i]["id"];

                  if((++i) < rootResults.length){
                    query2 = query2 + ",";
                  }
                }

                query2 = query2 + ")";
                console.log(query2,"rootResultsrootResult")

                pool.query(query2, function (err, chiildResult, field) {

                    if (err) throw err;
                  console.log(chiildResult,"chiildResultchiildResult")
                    res.render('index.html',{
                      rootResults: JSON.stringify(rootResults),
                      chiildResult: JSON.stringify(chiildResult)
                    });
                });

              });


          });



          app.get("/emp/id/value", function(req, res){

            var man_id = req.query.name;

            var query3 = "SELECT name,id, contactNumber1 FROM Employee WHERE manager_id = "+man_id;
            pool.query(query3, function(error, result, field){

                if (error) throw error;
                console.log(result)
                res.send({
                  result:result
                })
            })
        });


}

exports.retrival = retrival;
