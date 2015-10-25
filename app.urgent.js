angular.module('app', [
  'ui.router',
  'show',
  'ngFileUpload'
]).config(config);

/**
 * @ngInject
 */
function config($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise("/displayList/");
  $stateProvider.state('displayList',{
    url: '/displayList/:id',
    templateUrl: 'views/displayList.html'
  }).state('bookScanner', {
    url: '/bookScanner/:edit',
    templateUrl: 'views/bookScanner.html'
  }).state('eventScanner',{
    url: '/eventScanner/:id/:title/:edit',
    templateUrl: 'views/eventScanner.html'
  });
}
