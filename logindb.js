var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydbs";
var express=require('express');
var app=express();
var body =require('body-parser');
var response;
var url1 = body.urlencoded({extended:false})
app.use(express.static('public'));
app.get('Login And Registration HTML.html',function(req,res){
    res.sendFile(__dirname+"/"+"Login And Registration HTML.html");
})

        app.post("/process",url1, function (req, res) {
             response={
                email: req.body.em,
                password: req.body.pas
            }
             
            console.log(response);  
            res.end(JSON.stringify(response));

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydbs");
            
                dbo.collection("customers").insertOne(response, function(err, res) {
                    if (err) throw err;

                    console.log("1 document inserted");

                   // if(response == true)
                   if (response==true)
                   {
                       console.log("Success!");
                       res.redirect('/UserHomePage');
                   }
                   else
                   {
                       console.log("Error!");
                   }
                    db.close();
                  });
            }); 
       });

        var server =app.listen(8080,function(){
            console.log('server is intailized');

        });