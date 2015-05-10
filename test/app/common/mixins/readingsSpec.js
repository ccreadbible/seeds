var expect = chai.expect,
    should = chai.should();

describe('seeds.common.mixins.readings', function() {
  var readingService, readingFactory;
  beforeEach(module('seeds.common'));
  beforeEach(module('seeds.common.mixins.readings'));
  beforeEach(inject(function($injector) {
    readingService = $injector.get('readingService');
    readingFactory = $injector.get('readingFactory');    
  }));

  describe('readingService', function() {
    it('should have readings as empty array', function() {
      expect(readingService.readings).to.be.an('array');
      expect(readingService.readings).to.have.length(0);
    });
    it('should have resizeFont method', function() {
      should.exist(readingService.resizeFont);
    });
    it('should have getFontSize method', function() {
      should.exist(readingService.getFontSize);
    });

    describe('getFontSize', function() {
      it('should return fontSize with default value 15', function() {
        expect(readingService.getFontSize()).equal(15);
      });
    });

    describe('resizeFont', function() {
      it('should increase fontSize by 1 with input 1', function() {
        readingService.resizeFont(1);
        readingService.resizeFont(1);
        var size = readingService.getFontSize();
        expect(size).equal(17);
      });
      it('should decrease fontSize by 1 with input 0', function() {
        readingService.resizeFont(0);
        readingService.resizeFont(0);
        var size = readingService.getFontSize();
        expect(size).equal(13);
      });
      it('should have maximum font size 28', function() {
        var count = 15;
        while(count < 40) {
          readingService.resizeFont(1);
          count++;          
        } 
        var size = readingService.getFontSize();
        expect(size).equal(28);

      });
      it('should have minimum font size 10', function() {
        var count = 15;
        while(count < 40) {
          readingService.resizeFont(0);
          count++;          
        } 
        var size = readingService.getFontSize();
        expect(size).equal(10);
      });
    });
  
  });
  describe('readingFactory', function() {
    it('should have loadReadings method', function() {
      should.exist(readingFactory.loadReadings);
    });
    it('should have getReading method', function() {
      should.exist(readingFactory.getReading);
    });
    it('should have getFontSize method', function() {
      should.exist(readingFactory.getFontSize);
    });
  });
});