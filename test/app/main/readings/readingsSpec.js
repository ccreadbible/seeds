var expect = chai.expect,
should = chai.should();

describe("seeds.main.readings", function() {
  var $scope, controller, serviceMock1, serviceMock2;

  beforeEach(module('ui.router'));
  beforeEach(module('seeds.common'));
  beforeEach(module('seeds.main.readings'));
  beforeEach(function() {
    //create mock readingService
    serviceMock1 = {
      readings: ['def', 'abc']
    }; 
    serviceMock2 = {
      readings: []
    }; 
  });
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $scope = _$rootScope_.$new();
    //construct controller
    controller = _$controller_('ReadingsCtrl', {
      $scope: $scope});
  }));
  
  it('should have readings under $scope', function() {
    should.exist($scope.readings);
  });
  it('should have loadReadings method', function() {
    should.exist(controller.loadReadings);
  });
  it('should have displayReadings method', function() {
    should.exist(controller.displayReadings);
  });

  describe('loadReadings', function() {
    it('should emit readings:loaded event', function() {
      
    });
  });
  describe('displayReadings', function() {
    var spy, $controller;
    beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
    }));
    it('should display readings from readingService', function() {
      controller = $controller('ReadingsCtrl', {
        $scope: $scope,
        readingService: serviceMock1});

      controller.displayReadings();
      expect($scope.readings).to.have.length(2);
    });
    it('should load readings if readingService.readings.length = 0', function() {
      controller = $controller('ReadingsCtrl', {
        $scope: $scope,
        readingService: serviceMock2});

      spy = sinon.spy(controller, 'loadReadings');
      controller.displayReadings();
      expect(spy.calledOnce).to.be.true;
    });
  });


});