(function() {

  angular
    .module('demoApp', ['angular.theme'])
    .config(['$themeProvider', function ($themeProvider) {
      // overrides the default theme
      $themeProvider.setInitialTheme('blue');
    }])
    .controller('DemoController', DemoController);

  DemoController.$inject = ['$scope', '$theme'];

  function DemoController($scope, $theme) {
    $scope.theme = $theme.activeTheme;
    $scope.themes = $theme.themes;
    $scope.$watch('theme', $theme.setTheme);
  }

}());
