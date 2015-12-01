var request = require('sync-request');
var instagram_api = {



	grabImages: function(tag, count) {
	
    var URL = 'https://api.instagram.com/v1/tags/' + tag + 
    					'/media/recent?callback=?&count=' + count +
    					 '&access_token=16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587';

   	var res = request('GET', URL, {
  'headers': {
    'Content-type': 'application/json'
  }
});
   	return JSON.parse(res.getBody('utf8'));

   
}


}

module.exports = instagram_api;