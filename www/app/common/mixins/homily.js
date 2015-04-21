angular.module('seeds.common.mixins.homily', [])
  .service('audioService', [function() {
    var audio = new Audio();
    this.homily = [];

    this.playAudio = function(id) {
      if(audio.src !== this.homily[id].link)
        audio.src = this.homily[id].link;

      audio.play();
    };
    this.pauseAudio = function() {
        audio.pause();
    };
    this.stopAudio = function() {
      this.pauseAudio();
      audio.currentTime = 0.0;
    };
  }])
  .factory('homilyFactory', ['$http', 'URLS', '$timeout', '$q',
   function ($http, URLS, $timeout, $q) {

      var loadHomily = function(){
        var self = this;

        $http({
          method: 'GET',
          url: URLS.api + '/homily'
        }).then(function(res){
          self.homily = res.data.homily;
          console.log(self.homily);
        }).catch(function(res){
          console.err("loading homily error", res.status, res.data);
        }).finally(function(){
          console.log('loading homily complete');
        });

      };

      return {loadHomily: loadHomily};
  }]);
  
  