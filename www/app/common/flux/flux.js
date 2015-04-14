angular.module('seeds.common.flux',[
  'seeds.common.mixins.homily',
  'seeds.common.mixins.readings'
  ])
  .factory('$actions', ['flux', function(flux){
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
  }])
  .factory('$store', ['flux', '$actions', 'HomilyMixin',
   'ReadingsMixin', function(flux, $actions, 
    HomilyMixin, ReadingsMixin){

    return flux.store({
      mixins: [homilyMixin, ReadingsMixin],
      audio: null,
      lastPlay: 0,
      currentTime: 0.0,
      
      actions:[
        $actions.createAudioObj,
        $actions.playAudio,
        $actions.pauseAudio,
        $actions.stopAudio
      ],
      
      createAudioObj: function(){
        if(!this.audio)
          this.audio = new Audio();
      },

      playAudio: function(id){
        this.audio.src = this.homily[id].link;
        this.audio.currentTime = (id !== this.lastPlay)? 0.0 : this.currentTime;
        this.audio.play();

        this.lastPlay = id;
      },

      pauseAudio: function(){
        this.audio.pause();
        this.currentTime = this.audio.currentTime;
      },

      stopAudio: function(){
        this.audio.pause();
        this.currentTime = 0.0;
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
  }]);
