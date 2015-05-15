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

      $scope.homilies = audioService.homily;
      $scope.readingTitles = _.pluck(readingService.readings, 'date');
      this.playAudio = function (id) {
        //if currently playing another soundtrack, pause it first
        if(audioService.currentPlaying !== null)
          if(id === audioService.currentPlaying)
            audioService.pauseAudio();
          else
            this.pauseAudio(audioService.currentPlaying);

        this.toggleButton(id);
        angular.element('.homilies-view ion-item:nth-child('+(id+2)+')')
            .css('color', '#3FDCB6');

        var ele = '.homilies-view ion-item:nth-child('+(id+2)+') .ion-play, '+
          '.homilies-view ion-item:nth-child('+(id+2)+') .ion-pause'
        audioService.playAudio(id, ele);
      };

      this.pauseAudio = function(id) {
        this.toggleButton(id);
        angular.element('.homilies-view ion-item:nth-child('+(id+2)+')').css('color', '#444');
        audioService.pauseAudio();
      };

      this.toggleButton = function (id) {
        console.log('toggle',id);
        var ele = '.homilies-view ion-item:nth-child('+(id+2)+') .ion-play, '+
                  '.homilies-view ion-item:nth-child('+(id+2)+') .ion-pause'
        angular.element(ele).toggleClass('hide');
      };
}])