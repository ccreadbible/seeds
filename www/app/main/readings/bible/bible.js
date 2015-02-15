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
.controller('BibleCtrl', function($scope, $actions, $store, $stateParams){
  $store.bindTo($scope, function(){
    $scope.reading = $store.getReading($stateParams.bibleId);
    angular.element("section.reading-content").css('font-size', $store.getFontSize());
  });
  
  
  this.resizeFont = function(option){
    $actions.resizeFont(option);
    angular.element("section.reading-content").css('font-size', $store.getFontSize());
  };

  this.showSettings = function() {
    angular.element(".bible-view .bar-footer").slideDown();
  };

  this.hideSettings = function() {
    angular.element(".bible-view .bar-footer").slideUp();
  };

});
