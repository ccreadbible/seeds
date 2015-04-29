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
          controller: 'ReadingsCtrl as read'
        }
      }
    });
})
.controller('ReadingsCtrl', ['$scope', 'readingService', 'readingFactory',
  'homilyFactory', 'audioService',
 function($scope, readingService, readingFactory, homilyFactory, audioService) {
  
  //ReadingsCtrl methods
  this.loadReadings = function() {
    readingFactory.loadReadings.call(readingService, $scope)
    .then(function() {
      $scope.$emit('readings:loaded');
    }, function(err) {
      $scope.readings = ["Something is wrong.."+err];
    });
  };

  this.displayReadings = function() {
    //bind readings to scope
    $scope.readings = readingService.readings;
    //loading weekly readings before rendering today's reading
    if(readingService.readings.length === 0) {
      this.loadReadings();
      homilyFactory.loadHomily.call(audioService);
      $scope.$on('readings:render', function() {
        $scope.readings = readingService.readings;
      });
    }
  };

  this.displayReadings();
}]);
