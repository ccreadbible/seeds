angular.module('seeds.common.mixins.readings', [])
  .service('readingService', [function(){
    var fontSize = 15;
    this.readings = [];
    this.resizeFont = function(option) {
        if(fontSize === 10 && option === 0 ||
           fontSize === 28 && option === 1)
          return;
        if(option === 0) //decrease size
          fontSize -= 1;
        else
          fontSize += 1;
    };
    this.getFontSize = function() {
      return fontSize;
    };
  }])
  .factory('readingFactory', ['$http', 'URLS', '$timeout', '$q',
   function($http, URLS, $timeout, $q) {
    var loadReadings = function(scope){
        var self = this;
        var deferred = $q.defer();
        
        $timeout(function() {
          $http({
              method: 'GET',
              url: URLS.api + '/readings'})
            .then(function(res) {
              self.readings = res.data.verses;
              deferred.resolve(self.readings);
            })
            .catch(function(err) {
              console.err("loading readings error", res.status);
              deferred.reject(err);
            }).finally(function() {
              console.log('loading complete');  
              scope.$broadcast('scroll.refreshComplete');
            });
        }, 1000);
        return deferred.promise;
        // $http({
        //   method: 'GET',
        //   url: URLS.api + '/readings'
        // }).then(function(res) {
        //   self.readings = res.data.verses;
        //   return res;
        // }).catch(function(res) {
        //   console.err("loading readings error", res.status, res.data);
        // }).finally(function() {
        //   console.log('loading complete');  
        //   scope.$broadcast('scroll.refreshComplete');
        // });
    };
    var getReading = function(id) {
      return this.readings[id];
    };

    var getFontSize = function() {
      return this.getFontSize();
    };

    return {
      loadReadings: loadReadings,
      getReading: getReading,
      getFontSize: getFontSize
    };

  }]);
  // .factory('ReadingsMixin', function ($http, URLS, $actions) {

  //   return ReadingsMixin = {
  //     fontSize: 15,
  //     ttsStatus: 'stop',
  //     readings: [],

  //     actions: [
  //       $actions.loadReadings,
  //       $actions.resizeFont,
  //     ],

  //     loadReadings: function(scope){
  //       var self = this;

  //       $http({
  //         method: 'GET',
  //         url: URLS.api + '/readings'
  //       }).then(function(res){
  //         self.readings = res.data.verses;
  //         self.emitChange();
  //       }).catch(function(res){
  //         console.err("loading readings error", res.status, res.data);
  //       }).finally(function(){
  //         console.log('loading complete');  
  //         scope.$broadcast('scroll.refreshComplete');
  //       });
  //     },

  //     resizeFont: function(option) {
  //       if(this.fontSize === 10 && option === 0 ||
  //          this.fontSize === 28 && option === 1)
  //         return;
  //       if(option === 0) //decrease size
  //         this.fontSize -= 1;
  //       else
  //         this.fontSize += 1;
  //     }
  //   };

  // });