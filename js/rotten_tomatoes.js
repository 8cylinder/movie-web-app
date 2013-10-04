
var RT = {
	rt_api_key: 'caxewwhecy767pye7zr3dfrb',
	base_url: 'http://api.rottentomatoes.com/api/public/v1.0/',

	search: function (title, callback_fn){
		/*var url = this.base_url + 'movies.json?q='
			+ title
			+ '&page_limit=50&page=1&apikey='
			+ this.rt_api_key;*/

		var url = '__movies.json?q=__&page_limit=50&page=1&apikey=__';
		var full_url = url.merge(
			this.base_url, title, this.rt_api_key);
		this._get_data (full_url, callback_fn);
	},

	details: function (rt_movie_id, callback_fn){
		/*var url = this.base_url
		    + '/movies/'
			+ rt_movie_id
			+ '.json?apikey='
			+ this.rt_api_key
			+ '&_prettyprint=false';*/

		var url = '__movies/__.json?apikey=__';
		var full_url = url.merge(
			this.base_url, rt_movie_id, this.rt_api_key);
		this._get_data (full_url, callback_fn);
	},

	in_theaters: function (callback_fn){
		//lists/movies/in_theaters.json?apikey=[your_api_key]&page_limit=1
		var url = '__lists/movies/in_theaters.json?apikey=__&page_limit=50';
		var full_url = url.merge(
			this.base_url, this.rt_api_key);
		this._get_data (full_url, callback_fn);
	},

	coming_soon: function (callback_fn){
		//lists/movies/upcoming.json?apikey=caxewwhecy767pye7zr3dfrb&page_limit=50&_prettyprint=true
		var url = '__lists/movies/upcoming.json?apikey=__&page_limit=50';
		var full_url = url.merge(
			this.base_url, this.rt_api_key);
		this._get_data (full_url, callback_fn);
	},

	_get_data: function (rt_url, callback_fn){
		var x = $.ajax({
			url: rt_url,
			dataType: 'jsonp',
			success: callback_fn
		});
	}

};
