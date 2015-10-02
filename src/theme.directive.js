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
    var isDefault = (attrs.default !== undefined);

    setDisabled(!isDefault);
    $theme.addTheme(scope.themeName, setDisabled);

    if (isDefault) {
      $theme.setTheme(scope.themeName);
    }

    function setDisabled(state) {
      elem[0].disabled = state;
    }
  }
}
