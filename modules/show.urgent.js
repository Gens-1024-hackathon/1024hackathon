angular
  .module('show', [
    'ui.router'
  ])
  .config(moduleConfig)
  .directive('show', ShowDirective);

function moduleConfig($stateProvider) {

  $stateProvider.state('show', {
    url: '/show',
    templateUrl: 'views/show.html',
    controller: ShowController,
    controllerAs: 'vm'
  });

}

function ShowDirective() {
  return {
    scope: {
      show: '='
    },
    link: function(scope, element) {
      scope.$watch('show', function(newValue) {
        if (newValue) {
          element[0].innerHTML = newValue;
        }
      });
    }
  };
}

/**
 * @ngInject
 */
function ShowController($q) {
  this.$q = $q;
  this.initialize();
}

ShowController.prototype.initialize = function() {
  var $q = this.$q;
  var Book = _model.Book;
  var self = this;
  this.diagram = new _model.Diagram();
  $q
    .when(Book.findAll())
    .then(function(books) {
      self.books = books;
    });
};

ShowController.prototype.open = function(bookId) {
  var $q = this.$q;
  var self = this;
  $q
    .when(this.diagram.open(bookId))
    .then(function() {
      self.dom = self.diagram.render();
    });
};

ShowController.prototype.close = function(bookId) {
  var $q = this.$q;
  var self = this;
  $q
    .when(this.diagram.close(bookId))
    .then(function() {
      self.dom = self.diagram.render();
    });
};
