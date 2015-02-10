angular.module('seeds.common.flux',[])
  .factory('$actions', function(flux){
    return flux.actions([
      'loadReadings',
      'loadHomilyList',
      'createAudioObj',
      'resizeFont',
      'textToSpeech'
    ]);
  })
  .factory('$store', function(flux, $actions, $http, URLS){
    return flux.store({
      readings: [],
      media: [],
      homily: [],
      audio: undefined,
      lastPlay: 0,
      fontSize: 15,
      ttsStatus: 'stop',

      actions:[
        $actions.loadReadings,
        $actions.loadHomilyList,
        $actions.createAudioObj,
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

      loadHomilyList:function(){
        var self = this;

        $http({
          method: 'GET',
          url: URLS.api + '/homily'
        }).then(function(res){

          self.homily = res.data.homily;
          self.emitChange();
        });
      },

      createAudioObj: function(){
        this.audio = new Audio();
      },

      resizeFont: function(option) {
        if(this.fontSize === 12 && option === 0 ||
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
          this.audio.onend = function(){console.log('done');}
          speechSynthesis.speak(this.audio);
          this.ttsStatus = 'playing';
        }

      },

      exports:{
        getReadings: function(){
          return this.readings;
        },

        getReading: function(id){
          return this.readings[id];
        },

        getMedia: function(){
          return this.media;
        },

        getHomilyList: function(){
          return this.homily;
        },

        playAudio: function(id){
          if(id === undefined){
            id = this.lastPlay;
          }else{
            this.audio.src = this.homily[id].link;
            this.lastPlay = id;
          }
          this.audio.play();
        },

        pauseAudio: function(){
          this.audio.pause();
        },

        stopAudio: function(){
          this.audio.pause();
          console.log(this.audio.currentTime);
          this.audio.currentTime = 0.0;
        },

        getFontSize: function() {
          return this.fontSize;
        },

        getTTSStatus: function() {
          return this.ttsStatus;
        }

      }
    });
  })
