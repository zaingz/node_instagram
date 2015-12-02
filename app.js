var express    = require('express');        // call express
var app        = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var instagram_api = require("./instagram_api.js");   

app.use('/public',express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//
var port = process.env.PORT || 8080;        // set our port


var router = express.Router();             

 

router.get('/admin', function(req, res) {


    var data1 =  instagram_api.grabTagImages('love', 10);
    var data2 =  instagram_api.grabUserImages();

	 res.render('admin', {data1: data1, data2: data2});
    
});


router.post('/publish', function(req, res, next) {


    var photo_recived = req.body.photo;
    console.log(photo_recived);
	next();
    
});




app.use(router);






app.listen(port);
console.log('Magic happens on port ' + port);