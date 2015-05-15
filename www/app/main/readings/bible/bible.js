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

.controller('BibleCtrl', ['$scope', '$stateParams', '$ionicModal', 'readingService', 
  'readingFactory', 'audioService', 'homilyFactory',
  function($scope, $stateParams, $ionicModal, readingService, readingFactory, audioService, homilyFactory) {

    //bind daily reading to the scope
    $scope.reading = readingFactory.getReading.call(readingService, $stateParams.bibleId);

    this.resizeFont = function(size) {
      readingService.resizeFont(size);
      angular.element("section.reading-content")
        .css('font-size', readingFactory.getFontSize.call(readingService));
    };

    /*settings*/
    $ionicModal.fromTemplateUrl('app/main/readings/bible/font.html', {
      scope: $scope,
      animation: 'slide-in-up',
      backdropClickToClose: true
    }).then(function(modal) {
      $scope.fontModal = modal;
    }).catch(function(err) {
      console.log('err');
    });

    $scope.openModal = function() {
      $scope.fontModal.show();
    };
    $scope.closeModal = function() {
      $scope.fontModal.hide();
    };
}]);