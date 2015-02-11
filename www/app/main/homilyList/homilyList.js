 /**
* seeds.main.homilyList Module
*
* Description: display homily list in the last 5 days
*/
angular.module('seeds.main.homilyList', [])
.config(function($stateProvider) {
  $stateProvider
    .state('seeds.main.homilyList', {
      url: '/homily',
      views: {
        'menuContent': {
          templateUrl: 'app/main/homilyList/homilyList.tpl.html',
          controller: 'HomilyListCtrol as homily'
        }
      }
    });
})
.controller('HomilyListCtrol', function($scope, $actions, $store){
  $actions.createAudioObj();
  $actions.loadHomilyList();

  $store.bindTo($scope, function(){
    $scope.homilyList = $store.getHomilyList();
  });

  this.playAudio = function(id){
    $actions.playAudio(id);
    angular.element(".homily-view ion-footer-bar").slideDown();
  };

  this.pauseAudio = function(){
    $actions.pauseAudio();
  };

  this.stopAudio = function(){
    $actions.stopAudio();
    angular.element(".homily-view ion-footer-bar").slideUp();
  };
});

