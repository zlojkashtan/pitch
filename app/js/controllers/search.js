angular.module('app')

.controller('SearchCtrl', function ($scope, $state, PitchesResource) {

  // Test data
  $scope.trending = [
    'hello world',
    'shopping marathon',
    '3 bananas for you'
  ];

  $scope.search = function (query) {
    $scope.query = query;

    var res = PitchesResource.search({ title: query });

    res.$httpPromise.then(function () {
      $scope.results = res;
      $scope.hasResults = true;
    });
  };

  $scope.cancelSearch = function () {
    $scope.results = [];
    $scope.hasResults = false;
    $scope.query = null;
  };

  $scope.viewPitch = function (id) {
    $state.go('tab.search-details', { id: id });
  };

});