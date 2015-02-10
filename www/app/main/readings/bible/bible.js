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
    angular.element("section").css('font-size', $store.getFontSize());
  });
  
  
  this.resizeFont = function(option){
    $actions.resizeFont(option);
    angular.element("section").css('font-size', $store.getFontSize());
  };

  this.showSettings = function() {
    angular.element(".bible-view .bar-footer").slideDown();
  };

  this.hideSettings = function() {
    angular.element(".bible-view .bar-footer").slideUp();
  };

  this.textToSpeech = function(option) {
    console.log('ststus',$store.getTTSStatus());
    if($store.getTTSStatus() === 'stop'){
      var text;
      /*0: reading1, 1: gospel*/
      (option === 0)? text = $scope.reading.origin_reading1 : 
        text = $scope.reading.origin_gospel;
      $actions.textToSpeech(text);
    }else{
      $actions.textToSpeech();
    }
  };
});
