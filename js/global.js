//build: movie-app

jQuery.noConflict();

var Config = (function(pub, store)
{
  pub.debug = true;
  pub.storage_version = 1;
  pub.app_version = 1;

  pub.set_page = function(page){
    store.put('current_page', page);
  };
  pub.get_page = function(){
    return store.get('current_page');
  };
  pub.set_details_id = function(id){
    store.put('details_id', id);
  };
  pub.get_details_id = function(){
    return store.get('details_id');
  };
  pub.set_list = function(name){
    store.put('active_list', name);
  };
  pub.get_list = function(){
    var l = store.get('active_list') || [];
    if (l.length == 0){
      l = '0';
      pub.set_list(l);
    }
    return l;
  };
  return pub;
})({}, Store);

var Pages = {
  init: 'init',
  home: 'home',
  search: 'search',
  details: 'details',
  sort: 'sort',
  lists: 'lists'
};

(function(config, pages, c, $)
{
  $(document).on("pagecreate", function(event){
    var list_count = JSON.parse(localStorage.getItem('lists'));
    if (! list_count || ! list_count.length){
      c.log('creating first list (id: 0)');
      MovieLists.create('All Movies', '', '0');
    }
  });
  $(document).on("pagecreate", '#home', function(event){
    home.show_movies();
  });
  $(document).on("pagecreate", '#search', function(event){
    search_init.setup_events();
  });
  $(document).on("pagecreate", '#sort', function(event){
    sort.setup_events();
  });
  $(document).on("pagecreate", '#lists', function(event){
    lists.setup_events();
    lists.show_lists();
  });
  $(document).on("pagecreate", '#sort', function(event){
    sort.init();
  });

  $(document).on('pagecontainershow', function(event, ui){
    var current_page = ui.toPage[0].id;
    config.set_page(current_page);

    switch (current_page){
      case pages.init:
        break;
      case pages.home:
        break;
      case pages.search:
        break;
      case pages.details:
        details.show_details();
        break;
      case pages.sort:
        break;
      case pages.lists:
        break;
    }
  });
})(Config, Pages, console, jQuery);
