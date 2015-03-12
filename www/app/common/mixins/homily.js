angular.module('seeds.common.mixins.homily', [])
  .factory('HomilyMixin', function ($http, URLS, $actions) {

    return homilyMixin = {
      homily: [],

      actions: [
        $actions.loadHomilyList
      ],

      loadHomilyList:function(scope){
        var self = this;
        $http({
          method: 'GET',
          url: URLS.api + '/homily'
        }).then(function(res){
          self.homily = res.data.homily;
          self.emitChange();
        }).catch(function(res){
          console.err("loading homily error", res.status, res.data);
        }).finally(function(){
          scope.$broadcast('scroll.refreshComplete');
        });
      }

    };

  });