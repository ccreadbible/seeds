 /**
* seeds.main Module
*
* Description
*/
angular.module('seeds.main', [
  'seeds.main.readings',
  'seeds.main.homilies',
  'seeds.main.home'
])
.constant('$ionicLoadingConfig', {
  template: '<md-progress-circular md-mode="indeterminate"></md-progress-circular>'
})
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
    'homilyFactory', 'audioService', 
    'readingService', 'readingFactory',
    '$ionicLoading', '$q',
    function($scope, homilyFactory, 
        audioService, readingService, 
        readingFactory, $ionicLoading,
        $q){

      $ionicLoading.show();
      
      this.loadHomilies = function() {
        return homilyFactory.loadHomily.call(audioService, $scope)
      };
      this.loadReadings = function() {
        return readingFactory.loadReadings.call(readingService, $scope);
      };

      //wait for loading homily and readings
      $q.all([this.loadHomilies(), this.loadReadings()])
      .then(function(results) {
        audioService.homily = results[0];
        readingService.readings = results[1];
        audioService.initAudios();
        console.log(audioService.homily);
        $ionicLoading.hide();
      })
      .catch(function(error) {
        console.log(error);
      });

}]);
