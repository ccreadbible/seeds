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
.controller('HomilyListCtrol', function($scope, $actions, $store, $state){
  $actions.createAudioObj();

  $store.bindTo($scope, function(){
    $scope.homilyList = $store.getHomilyList();
  });

  this.loadHomilyList = function(){
    $actions.loadHomilyList($scope);
  };

  var selected = null;
  this.playAudio = function(id, item){
    selected = item;
    $actions.playAudio(id);
    angular.element("ion-side-menu-content ion-footer-bar").slideDown();
  };

  this.openBible = function(id){
    $state.go('seeds.main.bible', {'bibleId':id});
  };

  this.isSelected = function(item){
    return selected === item;
  };
});

