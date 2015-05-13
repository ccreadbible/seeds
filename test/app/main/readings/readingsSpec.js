var expect = chai.expect,
should = chai.should();

describe("seeds.main.readings", function() {
  var $scope, controller, mockService;

  beforeEach(module('ui.router'));
  beforeEach(module('seeds.common'));
  beforeEach(module('seeds.main.readings'));
  beforeEach(function() {
    //create mock readingService
    mockService = function() {
        this.readings = [{gospel: 'gospel1'}, 
          {gospel: 'gospel2'}];
    };
  });
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $scope = _$rootScope_.$new();
    //construct controller
    controller = _$controller_('ReadingsCtrl', {
      $scope: $scope,
      readingService: new mockService()
    });
  }));
  
  it('should have readings under $scope', function() {
    expect($scope).to.have.property('readings');
  });
  it('should display readings from readingService', function() {
    expect($scope.readings).to.have.length(2);
  });

  
  // describe('displayReadings', function() {
  //   var spy, $controller;
  //   beforeEach(inject(function(_$controller_) {
  //     $controller = _$controller_;
  //   }));
  //   it('should display readings from readingService', function() {
  //     controller = $controller('ReadingsCtrl', {
  //       $scope: $scope,
  //       readingService: serviceMock1});

  //     controller.displayReadings();
  //     expect($scope.readings).to.have.length(2);
  //   });
  //   it('should load readings if readingService.readings.length = 0', function() {
  //     controller = $controller('ReadingsCtrl', {
  //       $scope: $scope,
  //       readingService: serviceMock2});

  //     spy = sinon.spy(controller, 'loadReadings');
  //     controller.displayReadings();
  //     expect(spy.calledOnce).to.be.true;
  //   });
  // });


});