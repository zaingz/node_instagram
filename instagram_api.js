var request = require('sync-request');
var instagram_api = {



	grabTagImages: function(tag, count) {
	
    var URL = 'https://api.instagram.com/v1/tags/' + tag + 
    					'/media/recent?callback=?&count=' + count +
    					 '&access_token=16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587';

   	var res = request('GET', URL, {
  'headers': {
    'Content-type': 'application/json'
  }
});
   	return JSON.parse(res.getBody('utf8'));

   
},

grabUserImages: function() {
  
    var URL = 'https://api.instagram.com/v1/users/222642745/media/recent/?count=6&client_id=092fd1da6072444693cfdce04caa2af9';

    var res = request('GET', URL, {
  'headers': {
    'Content-type': 'application/json'
  }
});
    return JSON.parse(res.getBody('utf8'));

   
}


}

module.exports = instagram_api;