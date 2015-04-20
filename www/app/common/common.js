/**
* seeds.common Module
*
* Description
*/
angular.module('seeds.common', [
  'seeds.common.mixins.readings'
])
.constant('URLS', {
  api: 'http://ccreadbible.azurewebsites.net/api'
});
