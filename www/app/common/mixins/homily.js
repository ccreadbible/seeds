angular.module('seeds.common.mixins.homily', [])
  .service('audioService', ['$ionicPopup', function($ionicPopup) {
    var audio = new Audio();
    this.homily = [];
    this.currentPlaying = null;
    var ele = null;
    var self = this;

    audio.addEventListener('error', function(e) {
      self.errorHandler(e, ele);
    }, true);
    this.playAudio = function(id, element) {
      ele = element;
      this.currentPlaying = id;
      if(audio.src !== this.homily[id].link)
        audio.src = this.homily[id].link;

      this.homily[id].duration = audio.duration;
      audio.play();
    };
    this.pauseAudio = function() {
      audio.pause();
    };
    this.stopAudio = function() {
      this.currentPlaying = null;
      this.pauseAudio();
      audio.currentTime = 0.0;
    };
    this.errorHandler = function(e, element) {
      if(e.type === 'error') {
        $ionicPopup.alert({
          title: '音頻不存在',
          template: '由於林神父的個人行程，沒有參與此次彌撒',
          okType: 'button-assertive'
        })
        .then(function(res) {
          //reset to a valid link
          audio.src = 'http://www.ccreadbible.info/media/com_podcastmanager/2015homily/20150417.mp3'
          self.resetStyle(element);
        });
      }
    };
    this.resetStyle = function (element) {
      angular.element(element).toggleClass('hide');
      if(element.split(' ')[0] === '.homilies-view') {
        angular.element('.homilies-view ion-item:nth-child('+
            (this.currentPlaying+2)+')').css('color', '#444');
      }
      this.currentPlaying = null;
    };
  }])
  .factory('homilyFactory', ['$http', 
      'URLS', '$q', 
      function ($http, URLS, $q) {

        var loadHomily = function(scope){
          var self = this;
          var defer = $q.defer();
          $http({
            method: 'GET',
            url: URLS.api + '/homily'
          }).then(function(res){
            defer.resolve(res.data.homily);
          }).catch(function(err){
            defer.reject("loading homily error: ", err);
          }).finally(function(){
            console.log('loading homily complete');
          });

          return defer.promise;
        };

        return {loadHomily: loadHomily};
  }]);
  
  