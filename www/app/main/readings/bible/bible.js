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
          controller: 'BibleCtrl'
        }
      }
    });
})
.controller('BibleCtrl', function($scope, $actions, $store, $stateParams){
  $store.bindTo($scope, function(){
    $scope.reading = $store.getReading($stateParams.bibleId);
  });
});
