//  //build: movie-app

var home = (function(pub, $, hb, c, movies, config, movielists)
{
  pub.show_movies = function() {
    var current_list = config.get_list();
    var data = movies.get_all(current_list);

    var source = $('#movie_list_template').html();
    var template = hb.compile(source);
    var html = template({'movies':data});
    $('#home_content').html(html);

    // set the title and description for the lists
    if (current_list) {
      var list = movielists.get_one(current_list);
      $('#list_name').text(list.title);
      if (list.description){
        $('#home_list_description').css('display', 'block');
        $('#home_list_description').text(list.description);
      } else {
        $('#home_list_description').css('display', 'none');
      }
    } else {
      $('#list_name').text('All Movies');
      $('#home_list_description').css('display', 'none');
    }

    // set the sort title
    if (current_list){
      var list = movielists.get_one(current_list);
      var sort_method = list.sort_method;

      switch (sort_method){
        case 'title':
          sort_method = 'Sort: Title';
        break;
        case 'dvd':
          sort_method = 'Sort: DVD';
        break;
        case 'theater':
          sort_method = 'Sort: Theater';
        break;
        case 'rt_score':
          sort_method = 'Sort: Rating';
        default:
          sort_method = sort_method;
      }
      $('#sort_link').text(sort_method);
    }

    pub.bind_events();
  };

  pub.bind_events = function(){
    // using .on('tap') causes event problems.  Somehow
    // there are 1 1/2 events being fired if tap is used.
    $('.itemcontainer').on('click', '.movie', function(){
      c.log('click')
      var detail_id = this.id;
      config.set_details_id(detail_id);
      $('body').pagecontainer('change', '#details');
    });

    // set a global var because I'm lazy right now.
    window.last_taphold_id = '';
    $('.itemcontainer').on('taphold', function(){
      var movie_id = this.id;
      // hide lists if this is a second taphold on same row
      if(window.last_taphold_id == movie_id){
        $('.home_lists').empty();
        c.log('remove drop down')
        window.last_taphold_id = '';
        return false;
      } else {
        window.last_taphold_id = movie_id;
      }
      // get the lists and check if this movie
      // is in any of them
      var all_lists = movielists.get_all_but_0();
      for (var i=0; i<all_lists.length; i++){
        if (all_lists[i].movies.contains(movie_id)){
          all_lists[i].cssstate = 'on';
          all_lists[i].state = '1';
        } else {
          all_lists[i].cssstate = 'off';
          all_lists[i].state = '0';
        }
      }

      // build the template
      var template_source = $('#home_list_template').html();
      var template = hb.compile(template_source);
      var html = template({'lists':all_lists});

      // hide others and display the list
      //$('.home_lists').empty();
      var insert_point = '#__ .home_lists'.merge([this.id]);
      $(insert_point).html(html);
      $('.home_drop_down').slideDown('slow', function(){
        c.log('animate done', this)
      });

      $('.home_list_item').on('tap', null, {'movie_id':movie_id}, function(event){
        var state = $(this).data('state');
        if (state == 0){
          movielists.add_movie(this.id, event.data.movie_id);
        } else if (state == 1) {
          movielists.remove_movie(this.id, event.data.movie_id);
        }
        $('.home_lists').empty();
        return false;
      });

      // delete movie
      $('.home_delete').on('tap', null, {movie_id:movie_id}, function(event){
        movies.delete_single(event.data.movie_id);
        pub.show_movies();
      });

      return true;
    });
  };
  return pub;
})({}, jQuery, Handlebars, console, Movies, Config, MovieLists);
