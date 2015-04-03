//build: movie-app

var lists = (function(pub, $, config, c, movielists, hb)
{
  pub.set_return = function(){
    $('#lists #footer_plus').text('<');
    $('#lists #footer_plus').attr('href', '#home');
  };
  pub.setup_events = function(){
    $('#lists_form').submit(function(){
      var new_name = $('#lists_input').val();
      if (!new_name){
        alert('A list title is required');
        return false;
      }
      var description = $('#lists_description').val();
      var list_id = $('#lists_id').val();

      $('#lists_input').val('');
      $('#lists_description').val('');
      $('#lists_id').val('');

      pub.new_list(new_name, description, list_id);
      pub.setup_list_events();
      return false;
    });
  };
  pub.setup_list_events = function(){

    $('#lists_all').on('click', function(){
      config.set_list('0');
      home.show_movies();
      $('body').pagecontainer('change', '#home');
    });
    $('.lists_item input.lists_edit').on('click', function(){
      pub.edit($(this).data('id'));
    });
    $('.lists_item input.lists_delete').on('click', function(){
      movielists.remove($(this).data('id'));
      pub.show_lists();
    });
    $('.lists_item input.lists_use').off();
    $('.lists_item input.lists_use').on('click', function(){
      c.log($(this).data('id'))
      config.set_list($(this).data('id'));
      home.show_movies();
      $('body').pagecontainer('change', '#home');
    });
  };

  pub.edit = function(id){
    var list = movielists.get_one(id);
    $('#lists_input').val(list.title);
    $('#lists_description').val(list.description);
    $('#lists_id').val(list.id);
  };

  pub.new_list = function(name, description, id){
    if (id){
      movielists.update(id, name, description);
    } else {
      movielists.create(name, description);
    }
    pub.show_lists();
  };

  pub.show_lists = function(){
    var all_lists = movielists.get_all_but_0();
    var source = $('#lists_list_template').html();
    var template = hb.compile(source);
    var html = template({'lists':all_lists});
    $('#lists_content').html(html);

    pub.setup_list_events();
  };

  return pub;
})({}, jQuery, Config, console, MovieLists, Handlebars);