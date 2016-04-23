angular
  .module('angular.theme')
  .directive('ngTheme', ngTheme);

ngTheme.$inject = ['$theme'];

function ngTheme($theme) {
  var directive = {
    restrict: 'A',
    scope: {
      themeName: '@ngTheme'
    },
    link: link
  };
  return directive;

  function link(scope, elem, attrs) {
    if (elem[0].tagName !== 'LINK') return;

    var isDefault = (attrs.default !== undefined);

    $theme.addTheme(scope.themeName);

    if (isDefault && $theme.activeTheme == null) {
      $theme.setTheme(scope.themeName);
    }

    scope.$watch(function () {
      return $theme.activeTheme === scope.themeName;
    }, function (isEnabled) {
      elem[0].disabled = !isEnabled;
    });
  }
}
