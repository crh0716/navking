var PageController = (function() {
  var _curId = '';
  var _navigateTo = function(id) {
    var page = document.getElementById(_curId);
    if (page) {
      page.hidden = true;
    }

    _curId = id;
    var newPage = document.getElementById(_curId);
    newPage.hidden = false;
  };

  return {
    navigateTo: _navigateTo
  };
})();
