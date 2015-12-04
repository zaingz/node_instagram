var express    = require('express');        // call express
var app        = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var instagram_api = require("./instagram_api.js");
var Photo = require('./models/Photo');   

app.use('/public',express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//
var port = process.env.PORT || 8080;        // set our port


var router = express.Router();             

 io.on('connection', function(socket){
  console.log('a user connected');
});


router.get('/admin', function(req, res) {


    var data1 =  instagram_api.grabTag1Images(12);
     var data12 =  instagram_api.grabTag2Images( 12);
      var data13 =  instagram_api.grabTag2Images("directaid", 12);
      var data14 =  instagram_api.grabTag2Images("hashtagkuwait", 12);
    var data2 =  instagram_api.grabUserImages();

    var db_images;
     Photo.find({}, function(err, photos) {
  		if (err) throw err;

  	db_images = photos
 	 res.render('admin', {data1: data1, data12: data12,data13: data13, data14: data14, data2:data2, db_images:db_images});
  	
	}).sort({created_at : '-1'}).limit(12);

	
    
});


router.post('/publish', function(req, res, next) {


    var photo_recived = req.body.photo;
    
    var photo = new Photo(photo_recived);


    Photo.find({ post_url: photo.post_url }, function(err, user) {
 		 if (user.length == 0) {
 		 
				photo.save(function(err) {
  					if (err) throw err;

  				 res.status(201).send({"message": "Saved photo"});
				});

 		 	 
 		 }else{	
 		 		console.log("Duplicate Insertion");
 		 		res.status(403).send({"error": "Duplicate photo"});
 		 }

  
  		
	});

	
    
});


router.get('/astaric_feed', function(req, res) {


   Photo.find({}, function(err, photos) {
  		if (err) throw err;

  	var data2 =  instagram_api.grabUserImages();


  
 	res.render('public_feed', {data: photos.slice(0,6), data2:data2, data3:photos.slice(6,12)});
  	
	}).sort({created_at : '-1'}).limit(12);
	
    
});


router.delete('/unpublish', function(req, res){

	var to_be_deleted = req.body.photo;
	Photo.findOneAndRemove({ post_url: to_be_deleted.post_url }, function(err) {
 		 if (err) throw err;

   	res.status(201).send({"message": "Deleted photo"});
  	console.log('Photo deleted!');
});


});

router.get("/", function(req, res){
	 res.render("index");
})


app.use(router);






app.listen(port);
console.log('Magic happens on port ' + port);