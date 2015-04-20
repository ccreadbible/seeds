var $actions;
describe("flux module", function() {
  beforeEach(module('seeds.common.flux'));
  beforeEach(function() {
    inject(function($injector) {
    $actions = $injector.get('$actions');
  });
  });
  it('should contain $actions service', function() {
    expect($actions).not.to.equal(null);
  });

});