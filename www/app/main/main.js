 /**
* seeds.main Module
*
* Description
*/
angular.module('seeds.main', [
  'seeds.main.readings',
  'seeds.main.home'
])
.config(function($stateProvider) {
  $stateProvider
    .state('seeds.main', {
      url: '/main',
      abstract: true,
      templateUrl: 'app/main/main.tpl.html',
      controller: 'MainCtrl as main'
    });
})
.controller('MainCtrl',['$scope', 
  function($scope){

}]);
