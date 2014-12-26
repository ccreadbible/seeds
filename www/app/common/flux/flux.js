angular.module('seeds.common.flux',[])
  .factory('$actions', function(flux){
    return flux.actions([
      'loadReadings',
      'loadMedia',
      'loadHomilyList',
      'createAudioObj'
    ]);
  })
  .factory('$store', function(flux, $actions, $http, URLS){
    return flux.store({
      readings: [],
      media: [],
      homily: [],
      audio: undefined,
      lastPlay: 0,

      actions:[
        $actions.loadReadings,
        $actions.loadMedia,
        $actions.loadHomilyList,
        $actions.createAudioObj
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

      loadMedia: function(){

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
        }

      }
    });
  })
