//build: movie-app

var sort = (function(pub, $, config, c, movielists)
{
  pub.init = function(){
    var list = movielists.get_one(config.get_list());
    pub.set_title(list.title);

    pub.preload_form(list);
  };
  pub.preload_form = function(list){
    if (list.sort_method){
      var sort_id = '#sort_' + list.sort_method;
      c.log(sort_id)
    } else {
      var sort_id = '#sort_title';
    }
    //c.log(sort_id)
    $(sort_id).prop('checked', true);

    if (list.sort_direction){
      var sort_dir = '#dir_' + list.sort_direction;
    } else {
      var sort_dir = 'ascending';
    }
    //c.log(sort_dir)
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