const express = require('express')
const bodyParser = require('body-parser')
var path = require("path");
var jsonFile = require('./apartment.json');
const app = express()
const fs = require('fs')
var urlencodedParser = bodyParser.urlencoded({ extended: true });


const port = process.env.PORT || 5000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname+'/Views/'));
app.get('/ApartmentR', function (req, res) {
    res.sendFile(path.join(__dirname+'/Views/Apartment.html'));
	
});

app.listen(port, async(req, res)=>{
  console.log(`Server is running on port ${5000}`)
})



app.post('/post', urlencodedParser, function (req, res) {
console.log(res.body)
    let apartment = {
        ...req.body
    }
    jsonFile.push(apartment)
        fs.writeFile('./apartment.json', JSON.stringify(jsonFile), function (err) {
            res.send("Data is inserted");
    		res.sendFile(path.join(__dirname+'/Views/Apartment.html'));
      
        });
});

app.get('/apartment', urlencodedParser, function (req, res) {
    let apartments = fs.readFileSync('./apartment.json');
    let data = JSON.parse(apartments);
    res.send(data)
});


app.post('/app', urlencodedParser, function (req, res) {
    
        jsonFile.splice(req.body.index,1)
        jsonFile.push(req.body.apartment)
        


            fs.writeFile('./apartment.json', JSON.stringify(jsonFile), function (err) {
                res.send("Successfully Modified");
                res.sendFile(path.join(__dirname+'/Views/Apartment.html'));
          
            });
    });


    app.post('/appdel', urlencodedParser, function (req, res) {
    
        jsonFile.splice(req.body.index,1)
    
            fs.writeFile('./apartment.json', JSON.stringify(jsonFile), function (err) {
                res.send("Successfully Deleted");
                res.sendFile(path.join(__dirname+'/Views/Apartment.html'));
          
            });
    });