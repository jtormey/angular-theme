# Angular Theme

Dynamic style and layout switching using Angular

## API

### Loading Themes

```html
<head>
  <link href="/basic.css" ng-theme="basic" default />
  <link href="/dark.css" ng-theme="dark" />
</head>
```

Attributes:

* `ng-theme` - Tells angular-theme about the style, and gives it a name for future reference
* `default` - Specifies the style to show on load

### Managing Themes Programatically

```js
angular.controller('MyController', function($scope, $theme) {
  $scope.theme = $theme.activeTheme;
  $scope.$watch('theme', $theme.setTheme);
});
```

## License

MIT

