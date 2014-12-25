 /**
* seeds.main.media Module
*
* Description: show pictures 
*/
angular.module('seeds.main.media', [])
.config(function($stateProvider) {
  $stateProvider
    .state('seeds.main.media', {
      url: '/media',
      views: {
        'menuContent': {
          templateUrl: 'app/main/media/media.tpl.html',
          controller: 'MediaCtrl as media'
        }
      }
    });
})
.controller('MediaCtrl', function($scope){
  
});
