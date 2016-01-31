(function() {

  angular
    .module('demoApp', ['angular.theme'])
    .controller('DemoController', DemoController);

  DemoController.$inject = ['$scope', '$theme'];

  function DemoController($scope, $theme) {
    $scope.theme = $theme.activeTheme;
    $scope.themes = $theme.themes.map(function(t){return t.name;});
    $scope.$watch('theme', $theme.setTheme);
  }

}());
