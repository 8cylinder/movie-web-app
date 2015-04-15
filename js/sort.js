//build: movie-app

var sort = (function(pub, $, config, c, movielists)
{
  pub.init = function(){
    var list = movielists.get_one(config.get_list());
    pub.set_title(list.title);

    pub.preload_form(list);
  };
  pub.preload_form = function(list){
    var sort_id;
    if (list.sort_method){
      sort_id = '#sort_' + list.sort_method;
      c.log(sort_id)
    } else {
      sort_id = '#sort_title';
    }
    $(sort_id).prop('checked', true);

    var sort_dir;
    if (list.sort_direction){
      sort_dir = '#dir_' + list.sort_direction;
    } else {
      sort_dir = 'ascending';
    }
    $(sort_dir).prop('checked', true);
  };
  pub.setup_events = function(){

    $('#sort_form').submit(function(){
      var list = movielists.get_one(config.get_list());
      var sort_method = $('input[name=sort_by]:checked').val();
      var sort_direction = $('input[name=sort_dir]:checked').val();
      //c.log('>>>', list.id, sort_method, sort_direction)
      movielists.set_sort(list.id, sort_method, sort_direction);

      home.show_movies();
      $('body').pagecontainer('change', '#home');
      return false;
    });
  };

  pub.set_title = function(title){
    $('#sort_list_title').html(title);
  };

  pub.set_sort_order = function(list_name, method){

  };

  return pub;
})({}, jQuery, Config, console, MovieLists);