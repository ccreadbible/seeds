/**
* seeds.common Module
*
* Description
*/
angular.module('seeds.common', [
  'seeds.common.mixins.homily',
  'seeds.common.mixins.readings'
])
.constant('URLS', {
  api: 'http://ccreadbible.azurewebsites.net/api'
});
