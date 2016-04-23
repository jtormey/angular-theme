/**
 * angular-theme v1.0.0
 * Sat Apr 23 2016 15:42:37 GMT-0400 (EDT)
 * Justin Tormey <jrtormey@gmail.com>
 */

(function() {
"use strict";

angular.module('angular.theme', []);
angular.module('angular.theme').provider('$theme', ThemeProvider);

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
    if (! ~service.themes.indexOf(theme)) service.themes.unshift(theme);
  }

  function setTheme(theme) {
    if (!! ~service.themes.indexOf(theme)) service.activeTheme = theme;
  }
}
angular.module('angular.theme').directive('ngTheme', ngTheme);

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

    var isDefault = attrs['default'] !== undefined;

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
}());
