angular
  .module('angular.theme')
  .provider('$theme', ThemeProvider);

function ThemeProvider() {
  var initialTheme;

  this.setInitialTheme = function (themeName) {
    initialTheme = themeName;
  };

  this.$get = function themeFactory() {
    return new Theme(initialTheme);
  };
}

function Theme(initialTheme) {
  var service = {
    themes: [],
    activeTheme: initialTheme,
    addTheme: addTheme,
    setTheme: setTheme
  };
  return service;

  function addTheme(theme) {
    if (!~service.themes.indexOf(theme)) service.themes.unshift(theme);
  }

  function setTheme(theme) {
    if (!!~service.themes.indexOf(theme)) service.activeTheme = theme;
  }
}
