angular.module('seeds.common.mixins.readings', [])
  .service('readingService', [function() {
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
 