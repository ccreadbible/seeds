 /**
* seeds.main.media Module
*
* Description: show pictures 
*/
angular.module('seeds.main.home', [])
.config(function($stateProvider) {
  $stateProvider
    .state('seeds.main.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'app/main/home/home.tpl.html',
          controller: 'HomeCtrl'
        }
      }
    });
})
.controller('HomeCtrl', function($scope){
});
