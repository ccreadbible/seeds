 /**
* seeds.main Module
*
* Description
*/
angular.module('seeds.main', [
  'seeds.main.readings',
  'seeds.main.homilyList',
  'seeds.main.home'
])
.config(function($stateProvider) {
  $stateProvider
    .state('seeds.main', {
      url: '/main',
      abstract: true,
      templateUrl: 'app/main/main.tpl.html',
      controller: 'MainCtrl as main'
    });
})
.controller('MainCtrl',['$scope', 'readingService', 'readingFactory', 
  function($scope, readingService, readingFactory){
  // $actions.loadReadings(); 
  
  // $actions.loadHomilyList();

  // this.pauseAudio = function(){
  //   $actions.pauseAudio();
  // };

  // this.stopAudio = function(){
  //   $actions.stopAudio();
  //   angular.element("ion-side-menu-content > ion-footer-bar").slideUp();
  // };

  // this.playAudio = function(id){
  //   $actions.playAudio(id);
  // };

}]);
