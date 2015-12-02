var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/instagram_database');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  post_url: { type: String, required: true, unique: true },
  user: { name: String, image_url: String },
  image_url: {low:String,medium:String,high:String},
  caption: String,
  likes: Number,
  comments: Number,
  
 
  created_at: Date
});

var Photo = mongoose.model('Photo', photoSchema);


module.exports = Photo;

