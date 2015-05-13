var expect = chai.expect,
    should = chai.should();

describe('seeds.common.mixins.readings', function() {
  var readingService, readingFactory, authRequestHandler, 
      httpBackend;
  beforeEach(module('seeds.common'));
  beforeEach(module('seeds.common.mixins.readings'));
  beforeEach(inject(function(_readingService_, _readingFactory_,$httpBackend) {
    readingService = _readingService_;
    readingFactory = _readingFactory_;
    httpBackend = $httpBackend;
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
    var mockService;
    beforeEach(function() {
      mockService = function() {
        var fontSize = 15;
        this.readings = [{gospel: 'gospel1'}, 
            {gospel: 'gospel2'}];
        this.getFontSize = function() {
          return fontSize;
        };
      };
    });
    it('should have loadReadings method', function() {
      should.exist(readingFactory.loadReadings);
    });
    it('should have getReading method', function() {
      should.exist(readingFactory.getReading);
    });
    it('should have getFontSize method', function() {
      should.exist(readingFactory.getFontSize);
    });

    describe('loadReadings', function() {
      it('should fetch readings', function() {
        httpBackend.whenGET('http://ccreadbible.azurewebsites.net/api/readings')
          .respond({
            verses: ['data1', 'data2', 'data3']
          });
        readingFactory.loadReadings()
          .then(function(res) {
            expect(res).to.be.an('array');
          });
        httpBackend.flush();
      });
    });

    describe('getReading', function() {
      it('should retrive the reading by id', function() {
        service = new mockService();
        expect(readingFactory.getReading.call(service, 0).gospel)
            .equal('gospel1');
        expect(readingFactory.getReading.call(service, 1).gospel)
            .equal('gospel2');
      });
    });

    describe('getFontSize', function() {
      it('should get font size through readingService', function() {
        service = new mockService();
        var spy = sinon.spy(service, 'getFontSize');
        readingFactory.getFontSize.call(service);
        expect(spy.calledOnce).to.be.true;
      });
      it('should return the font size configured in readingService', function() {
        expect(readingFactory.getFontSize.call(service)).equal(15);
      });
    });
  });
});