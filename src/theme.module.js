angular
.module('angular.theme', [])
.directive('ngTheme', function($theme) {
  return {
    restrict: 'A',
    scope: {
      themeName: '@ngTheme'
    },
    link: function(scope, elem, attrs) {
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
  };
})
.factory('$theme', function() {
  var service = {
    themes: [],
    activeTheme: undefined,
    addTheme: addTheme,
    setTheme: setTheme
  };
  return service;

  function addTheme(themeName, setter) {
    service.themes.unshift({ name: themeName, setDisabled: setter });
  };

  function setTheme(themeName) {
    service.themes.forEach(function(theme) {
      var match = (theme.name === themeName);
      if (match) {
        service.activeTheme = theme.name;
      }
      theme.setDisabled(!match);
    });
  };

});

