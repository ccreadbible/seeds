 /**
* seeds.main.lectures Module
*
* Description
*/
angular.module('seeds.main.lectures', [])
.config(function($stateProvider) {
  $stateProvider
    .state('seeds.main.lectures', {
      url: '/lectures',
      views: {
        'menuContent': {
          templateUrl: 'app/main/lectures/lectures.tpl.html',
          controller: 'LecturesCtrl as lectures'
        }
      }
    });
})
.controller('LecturesCtrl', function($scope){
  
});
