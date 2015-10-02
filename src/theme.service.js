angular
  .module('angular.theme')
  .factory('$theme', $theme);

$theme.$inject = [];

function $theme() {
  var service = {
    themes: [],
    activeTheme: undefined,
    addTheme: addTheme,
    setTheme: setTheme
  };
  return service;

  function addTheme(themeName, setter) {
    service.themes.unshift({ name: themeName, setDisabled: setter });
  }

  function setTheme(themeName) {
    service.themes.forEach(function(theme) {
      var match = (theme.name === themeName);
      if (match) {
        service.activeTheme = theme.name;
      }
      theme.setDisabled(!match);
    });
  }
}
