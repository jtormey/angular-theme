/**
 * angular-theme v0.1.0
 * Thu Oct 01 2015 22:52:00 GMT-0400 (EDT)
 * Justin Tormey <jrtormey@gmail.com>
 */

(function() {
"use strict";

angular.module('angular.theme', []);
angular.module('angular.theme').factory('$theme', $theme);

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
    service.themes.forEach(function (theme) {
      var match = theme.name === themeName;
      if (match) {
        service.activeTheme = theme.name;
      }
      theme.setDisabled(!match);
    });
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
    var isDefault = attrs['default'] !== undefined;

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
}());
