angular.module('seeds.common.mixins.readings', [])
  .factory('ReadingsMixin', function ($http, URLS, $actions) {

    return ReadingsMixin = {
      fontSize: 15,
      ttsStatus: 'stop',
      readings: [],

      actions: [
        $actions.loadReadings,
        $actions.resizeFont,
      ],

      loadReadings: function(scope){
        var self = this;

        $http({
          method: 'GET',
          url: URLS.api + '/readings'
        }).then(function(res){
          self.readings = res.data.verses;
          self.emitChange();
        }).catch(function(res){
          console.err("loading readings error", res.status, res.data);
        }).finally(function(){
          console.log('loading complete');  
          scope.$broadcast('scroll.refreshComplete');
        });
      },

      resizeFont: function(option) {
        if(this.fontSize === 10 && option === 0 ||
           this.fontSize === 28 && option === 1)
          return;
        if(option === 0) //decrease size
          this.fontSize -= 1;
        else
          this.fontSize += 1;
      }
    };

  });