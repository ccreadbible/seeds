angular.module('seeds.common.mixins.homily', [])
  .factory('HomilyMixin', function ($http, URLS, $actions) {

    return homilyMixin = {
      homily: [],

      actions: [
        $actions.loadHomilyList
      ],

      loadHomilyList:function(){
        var self = this;
        $http({
          method: 'GET',
          url: URLS.api + '/homily'
        }).then(function(res){

          self.homily = res.data.homily;
          self.emitChange();
        });
      }

    };

  });