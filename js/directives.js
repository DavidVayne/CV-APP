function merge(firstObject, secondObject) {
    var result = $.extend(true, {}, firstObject, secondObject);
    for (var k in result) {
        if ("object" === typeof result[k]) {
            firstObject[k] = firstObject[k] || {};
            secondObject[k] = secondObject[k] || {};
            result[k] = merge(firstObject[k], secondObject[k]);
        } else {
            firstObject[k] = firstObject[k] || 0;
            secondObject[k] = secondObject[k] || 0;
            result[k] = ("number" === typeof firstObject[k] && "number" === typeof secondObject[k]) ? (firstObject[k] + secondObject[k]) : result[k];
        }
    }
    return result;
}

app.directive('backButton', function() {
  return {
    restrict: 'E',
    template: '<button class="btn">{{back}}</button>',
    scope: {
      back: '@back',
      icons: '@icons'
    },
    link: function(scope, element, attrs) {
      $(element[0]).on('click', function() {
        history.back();
        scope.$apply();
      });
    }
  };
});
