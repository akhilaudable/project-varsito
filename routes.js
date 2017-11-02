// var con = require('./sqldb');

function retrival(app, pool){

  app.get("/", function(req, res){

          var query = "SELECT name,id, contactNumber1 FROM Employee WHERE manager_id = 1" ;
          pool.query(query, function (err, result, fields) {

                if (err) throw err;
                console.log(result);
                res.send({
                  result: result
                });
              });
      });


  app.get("/emp/:id", function(req, res){
          var id = 1;

          var query = "SELECT name,id, contactNumber1 FROM Employee WHERE manager_id = "+ id ; //Declare @ID int ; Set @ID = 7;

        //  var query = "DECLARE @ID INT(11); SET @ID := 3;WITH EmployeeCTE AS(Select id, name, manager_id, contactNumber1 From Employee Where id = @ID UNION ALL Select Employee.id , Employee.name, Employee.manager_id From Employee JOIN EmployeeCTE ON Employee.id = EmployeeCTE.manager_id) Select E1.name, ISNULL(E2.name, 'No Boss') as manager From EmployeeCTE E1  LEFT Join EmployeeCTE E2 ON E1.id = E2.id"

          pool.query(query, function (err, result, fields) {

                if (err) throw err;
                console.log(result);
                res.send({
                  result: result
                });
              });
          });
}

exports.retrival = retrival;
