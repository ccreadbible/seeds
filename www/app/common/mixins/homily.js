angular.module('seeds.common.mixins.homily', [])
  .service('audioService', ['$ionicPopup', function($ionicPopup) {
    var audio = new Audio();
    this.homily = [];
    var self = this;

    audio.addEventListener('error', function(e) {
      self.errorHandler(e);
    }, true);
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
    this.errorHandler = function(e) {
      if(e.type === 'error') {
         var alertPopup = $ionicPopup.alert({
           title: '音頻不存在',
           template: '由於林神父的個人行程，沒有參與此次彌撒'
         });
         alertPopup.then(function(res) {
          //reset to a valid link
          audio.src = 'http://www.ccreadbible.info/media/com_podcastmanager/2015homily/20150417.mp3'
          angular.element('.ion-play, .ion-pause').toggleClass('hide');
         });
      }
    };
  }])
  .factory('homilyFactory', ['$http', 'URLS', function ($http, URLS) {

      var loadHomily = function(){
        var self = this;

        $http({
          method: 'GET',
          url: URLS.api + '/homily'
        }).then(function(res){
          self.homily = res.data.homily;
        }).catch(function(res){
          console.err("loading homily error", res.status, res.data);
        }).finally(function(){
          console.log('loading homily complete');
        });
      };

      return {loadHomily: loadHomily};
  }]);
  
  