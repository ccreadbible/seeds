/**
* seeds.common Module
*
* Description
*/
angular.module('seeds.common', [
  'seeds.common.flux'
])
.constant('URLS', {
  api: 'http://ccreadbible.azurewebsites.net/api'
});
