angular.module('seeds.common.flux',[
  'seeds.common.mixins.homily',
  'seeds.common.mixins.readings'
  ])
  .factory('$actions', function(flux){
    return flux.actions([
      'loadReadings',
      'loadHomilyList',
      'createAudioObj',
      'resizeFont',
      'textToSpeech',
      'playAudio',
      'pauseAudio',
      'stopAudio'
    ]);
  })
  .factory('$store', function(flux, $actions, 
    HomilyMixin, ReadingsMixin){

    return flux.store({
      mixins: [homilyMixin, ReadingsMixin],
      audio: undefined,
      lastPlay: 0,
      
      actions:[
        $actions.createAudioObj,
        $actions.playAudio,
        $actions.pauseAudio,
        $actions.stopAudio
      ],

      
      createAudioObj: function(){
        this.audio = new Audio();
      },

      playAudio: function(id){
        if(id === undefined){
          id = this.lastPlay;
        }else{
          this.audio.src = this.homily[id].link;
          this.lastPlay = id;
        }
        console.log(this.audio.src);
        this.audio.play();
      },

      pauseAudio: function(){
        this.audio.pause();
      },

      stopAudio: function(){
        this.audio.pause();
        // console.log(this.audio.currentTime);
        this.audio.currentTime = 0.0;
      },

      exports:{
        getReadings: function(){
          return this.readings;
        },

        getReading: function(id){
          return this.readings[id];
        },

        getHomilyList: function(){
          return this.homily;
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
