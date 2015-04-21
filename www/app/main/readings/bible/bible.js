 /**
* seeds.main.bible Module
*
* Description
*/
angular.module('seeds.main.bible', [])
.config(function($stateProvider) {
  $stateProvider
    .state('seeds.main.bible', {
      url: '/readings/:bibleId',
      views: {
        'menuContent': {
          templateUrl: 'app/main/readings/bible/bible.tpl.html',
          controller: 'BibleCtrl as bible'
        }
      }
    });
})

.controller('BibleCtrl', ['$scope', '$stateParams', 'readingService', 
  'readingFactory', 'audioService', 'homilyFactory',
  function($scope, $stateParams, readingService, readingFactory, audioService, homilyFactory) {
    //BibleCtrl methods
    this.loadReading = function() {
      readingFactory.loadReadings.call(readingService, $scope.$parent)
      .then(function() {
        //tell rootScope readings are loaded
        $scope.$emit('readings:loaded');
      }, function(err) {
        $scope.readings = ["Something is wrong.."+err];
      });
    };

    this.resizeFont = function(size) {
      readingService.resizeFont(size);
      angular.element("section.reading-content")
        .css('font-size', readingFactory.getFontSize.call(readingService));
    };
    
    this.playAudio = function() {
      audioService.playAudio($stateParams.bibleId);
    };

    this.pauseAudio = function() {
      audioService.pauseAudio();
    };

    this.stopAudio = function() {
      audioService.stopAudio();
    };


    //bind daily reading
    $scope.reading = readingFactory.getReading.call(readingService, $stateParams.bibleId);
    //loading weekly readings before rendering today's reading
    if(readingService.readings.length === 0) {
      this.loadReading();
      homilyFactory.loadHomily.call(audioService);
      //render reading when receive event from rootScope
      $scope.$on('readings:render', function() {
        $scope.reading = readingFactory.getReading.call(readingService, $stateParams.bibleId);
      });
    }

}]);