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
          controller: 'HomilyListCtrol'
        }
      }
    });
})
.controller('HomilyListCtrol', function($scope, $actions, $store){
  $actions.createAudioObj();
  console.log('created audio');
  $actions.loadHomilyList();

  $store.bindTo($scope, function(){
    $scope.homilyList = $store.getHomilyList();
    $scope.playAudio = $store.playAudio;
    $scope.stopAudio = $store.stopAudio;
    $scope.pauseAudio = $store.pauseAudio;

  });
});
