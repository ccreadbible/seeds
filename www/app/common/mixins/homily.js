angular.module('seeds.common.mixins.homily', [])
  .service('audioService', ['$ionicPopup', '$q',
      function($ionicPopup, $q) {
        var audios = [];
        var ele = null;
        var self = this;
       
        this.initAudios = function() {
          this.homily.forEach(function(item, index) {
            var audio = new Audio();
            audio.src = item.link
            audio.load();
            audio.addEventListener('error', function(e) {
              audios[index] = null;
            }, true);
            audio.addEventListener('loadedmetadata', function() {
              var secs = Math.floor(audio.duration);
              var min = Math.floor(secs / 60);
              var sec = Math.floor(secs % 60);
              self.homily[index].duration = ((min < 10)? '0'+min : min) +
                  ':' + ((sec < 10)? '0'+sec : sec);
            });
            audios.push(audio);
          });
        };
        this.playAudio = function(id, scope) {
          if(audios[id] === null) {
            this.errorHandler(id, scope);
          }else {
            audios[id].play();
          }
        };
        this.pauseAudio = function(id) {
          audios[id].pause();
        };
        this.stopAudio = function(id) {
          this.pauseAudio(id);
          audios[id].currentTime = 0.0;
        };
        this.isPaused = function(id) {
          return audios[id].paused;
        };
        this.errorHandler = function(index, scope) {
            $ionicPopup.alert({
              title: '音頻不存在',
              template: '此音頻可能未錄製完成，請稍候再試',
              okType: 'button-assertive'
            })
            .then(function(res) {
              scope.$emit('audio:invalid');
              self.resetStyle(index);
            });
        };
        this.resetStyle = function (id) {
          angular.element('.homilies-view ion-item:nth-child('+
              (id+2)+')').css('color', '#444');
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
  
  