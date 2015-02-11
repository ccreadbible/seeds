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
      'textToSpeech'
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
      ],

      
      createAudioObj: function(){
        this.audio = new Audio();
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
