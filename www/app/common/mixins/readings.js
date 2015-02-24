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

      loadReadings: function(){
        var self = this;

        $http({
          method: 'GET',
          url: URLS.api + '/readings'
        }).then(function(res){
          self.readings = res.data.verses;
          self.emitChange();
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