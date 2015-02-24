 /**
* seeds.main.readings Module
*
* Description: disply a list of recent readings
*/
angular.module('seeds.main.readings', ['seeds.main.bible'])
.config(function($stateProvider) {
  $stateProvider
    .state('seeds.main.readings', {
      url: '/readings',
      views: {
        'menuContent': {
          templateUrl: 'app/main/readings/readings.tpl.html',
          controller: 'ReadingsCtrl'
        }
      }
    });
})
.controller('ReadingsCtrl', function($scope, $actions, $store) {
    
  $store.bindTo($scope, function(){
    $scope.readings = $store.getReadings();
  });
 
});