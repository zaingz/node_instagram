var express    = require('express');        // call express
var app        = express();
var exphbs  = require('express-handlebars');
var instagram_api = require("./instagram_api.js");   

app.use('/public',express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//
var port = process.env.PORT || 8080;        // set our port


var router = express.Router();             

 

router.get('/admin', function(req, res) {


    var data =  instagram_api.grabImages('teen', 10);

	 res.render('admin', {data: data});
    
});



app.use(router);




app.listen(port);
console.log('Magic happens on port ' + port);