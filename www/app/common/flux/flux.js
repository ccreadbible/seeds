angular.module('seeds.common.flux',[])
  .factory('$actions', function(flux){
    return flux.actions([
      'loadReadings',
      'loadMedia',
      'loadLectures'
    ]);
  })
  .factory('$store', function(flux, $actions, $http, URLS){
    return flux.store({
      readings: [],
      media: [],
      lectures: [],

      actions:[
        $actions.loadReadings,
        $actions.loadMedia,
        $actions.loadLectures
      ],

      loadReadings: function(){
        var self = this;

        $http({
          method: 'GET',
          url: URLS.api + '/dailybible'
        }).then(function(res){

          self.readings = res.data.verses;
          self.emitChange();
        });
      },

      loadMedia: function(){

      },

      loadLectures:function(){

      },

      exports:{
        getReadings: function(){
          return this.readings;
        },

        getMedia: function(){
          return this.media;
        },

        getLectures: function(){
          return this.lectures;
        }

      }
    });
  })
