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
  .factory('readingFactory', ['$http',
   'URLS', '$q',
    function($http, URLS, $q) {
    var loadReadings = function(scope){
      var self = this;
      var defer = $q.defer();
      $http({
          method: 'GET',
          url: URLS.api + '/readings'})
        .then(function(res) {
          defer.resolve(res.data.verses);
        })
        .catch(function(err) {
          defer.reject("loading readings error: ", err);
        }).finally(function() {
          console.log('loading readings complete');  
          scope.$broadcast('scroll.refreshComplete');
        });
      return defer.promise;
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
 