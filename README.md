# Angular Theme

Dynamic style and layout switching using Angular

## API

### Loading Themes

```html
<head>
  <link href="/light.css" ng-theme="light" default />
  <link href="/dark.css" ng-theme="dark" />
</head>
```

Attributes:

* `ng-theme` - Tells angular-theme about the style, and gives it a name for future reference
* `default` - Specifies the style to show on load

### Programatic API

#### $themeProvider

* `setInitialTheme(themeName)` - Sets the initial theme

```js
angular.module('my.app', ['angular.theme']).config(function ($themeProvider) {
  // will override default theme
  $themeProvider.setInitialTheme('dark');
});
```

#### $theme

* `themes` - Array of available theme names
* `activeTheme` - Name of active theme
* `setTheme(themeName)` - Sets the active theme

```js
angular.module('my.app').controller('MyController', function ($scope, $theme) {
  $scope.theme = $theme.activeTheme;
  $scope.$watch('theme', $theme.setTheme);
});
```

## License

MIT
