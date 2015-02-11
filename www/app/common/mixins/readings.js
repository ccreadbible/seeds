angular.module('seeds.common.mixins.readings', [])
  .factory('ReadingsMixin', function ($http, URLS, $actions) {

    return ReadingsMixin = {
      fontSize: 15,
      ttsStatus: 'stop',
      readings: [],

      actions: [
        $actions.loadReadings,
        $actions.resizeFont,
        $actions.textToSpeech
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
      },

      textToSpeech: function(text) {
        this.audio = new SpeechSynthesisUtterance();
        if(!text){
          speechSynthesis.cancel();
          this.ttsStatus = 'stop';
        }else{
          this.audio.text = text;
          this.audio.lang = 'zh-TW';
          this.audio.rate = 0.8;
          this.audio.onend = function(){this.ttsStatus = 'stop';}
          speechSynthesis.speak(this.audio);
          this.ttsStatus = 'playing';
        }

      }

    };

  });