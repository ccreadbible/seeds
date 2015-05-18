 /**
* seeds.main.homilies Module
*
* Description: play a list of recent homilies
*/

angular.module('seeds.main.homilies', [])
.config(function($stateProvider) {
  $stateProvider
    .state('seeds.main.homilies', {
      url: '/homilies',
      views: {
        'menuContent': {
          templateUrl: 'app/main/homilies/homilies.tpl.html',
          controller: 'HomiliesCtrl as homilyCtrl'
        }
      }
    });
})
.controller('HomiliesCtrl', ['$scope', 
    'homilyFactory', 'audioService', 'readingService',
    function($scope, homilyFactory, audioService, readingService) {
      var self = this;
      $scope.currentTrack = 0;
      $scope.homilies = audioService.homily;
      $scope.readingTitles = _.pluck(readingService.readings, 'date');
      $scope.$on('audio:invalid', function(id) {
        self.toggleButton();
        ($scope.currentTrack === 6)? $scope.currentTrack = 0 : $scope.currentTrack++;
      });
      //audio functionalities
      this.playAudio = function() {
        this.toggleButton();
        this.highlightCurrent();
        audioService.playAudio($scope.currentTrack, $scope);
      };
      this.forward = function() {
        if(!audioService.isPaused($scope.currentTrack))
          this.stopAudio();
        this.resetStyle();
        ($scope.currentTrack === 6)? $scope.currentTrack = 0 : $scope.currentTrack++;
        this.playAudio();
      };

      this.backward = function() {
        if(!audioService.isPaused($scope.currentTrack))
          this.stopAudio();

        this.resetStyle();
        ($scope.currentTrack === 0)? $scope.currentTrack = 6 : $scope.currentTrack--;
        this.playAudio();
      };

      this.pauseAudio = function() {
        this.toggleButton();
        audioService.pauseAudio($scope.currentTrack);
      };

      this.stopAudio = function() {
        this.toggleButton();
        this.resetStyle();
        audioService.stopAudio($scope.currentTrack);
      };

      //style UI
      this.resetStyle = function() {
        angular.element('.homilies-view ion-item:nth-child('+
            ($scope.currentTrack+2)+')').css('color', '#444');
      }
      this.highlightCurrent = function() {
        angular.element('.homilies-view ion-item:nth-child('+
            ($scope.currentTrack+2)+')').css('color', '#3FDCB6');
      };

      this.toggleButton = function () {
        var ele = '.homilies-view .ion-play, '+
                  '.homilies-view .ion-pause';
        angular.element(ele).toggleClass('hide');
      };
}])