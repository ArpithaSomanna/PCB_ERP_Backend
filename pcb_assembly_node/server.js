var express = require('express')
var app = express();
var fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());
const headers = { 'Content-Type': 'application/json' };

//Endpoint to get a list of users
app.get('/getComponents', function(req, res){
    fs.readFile(__dirname + "/" + "components.json", 'utf8', function(err, data) {
        res.end(data);
    });
});

app.post('/updateComponents', function(req, res) {
    // console.log(req.body);
    fs.readFile('./components.json', 'utf-8', function(err, data) {
        if (err) throw err;
        var arrayOfObjects = JSON.parse(data);
        req.body.filter(re => {
            const idx = arrayOfObjects.findIndex(x => x.componentId === re.componentId);
            if(idx === -1) {
                arrayOfObjects.push(re);
            }
        });
        const newData = JSON.stringify(arrayOfObjects);
        fs.writeFileSync('components.json', newData);
        res.end(newData);
    })
});

// app.post('/writeComponent', function(req, res) {
//     let student = { 
//         user3: {
//             id: 3,
//             firstname: "Smera",
//             lastname: "K"
//         } 
//     };
//     let data = JSON.stringify(student);
//     fs.writeFileSync('components.json', data);
//     console.log(data);
//     res.end(data);
// });





//Create a server to listen at port 8080
var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Rest API demo listening at http://%s:%s", host, port);
});