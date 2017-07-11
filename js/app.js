'use strict';

function getName(authData) {
  switch (authData.providerData[0].providerId) {
    case 'password':
      return 'Nouvel utilisateur';
    case 'twitter':
      return authData.twitter.displayName;
    case 'facebook':
      return authData.facebook.displayName;
    case 'google.com':
      return authData.providerData[0].displayName;
  }
  return 'Inconnu';
}

function getProviderLink(text) {
  switch (text) {
    case 'password':
      return 'no provider';
    case 'twitter.com':
      return new firebase.auth.TwitterAuthProvider();
    case 'facebook.com':
      return new firebase.auth.FacebookAuthProvider();
    case 'google.com':
      return new firebase.auth.GoogleAuthProvider();
  }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function setVal(value, defaultValue){
   return (value === undefined) ? defaultValue : value;
}

var app = angular.module('myApp', ['ngRoute', 'firebase', 'ngCookies', 'ngDragDrop', 'angularMoment', 'ngSanitize']);

app.constant('USERS_URL', 'https://makeanapp-f2e6e.firebaseio.com/users');

app.run(["$rootScope", "$location", function($rootScope, $location, amMoment) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/home");
    }
  });
}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl'
    })
    .when('/skills', {
      templateUrl: 'views/skills.html',
      controller: 'SkillsCtrl'
    })
    .when('/knowledge', {
      templateUrl: 'views/knowledge.html',
      controller: 'KnowledgeCtrl'
    })
    .when('/sets', {
      templateUrl: 'views/sets.html',
      controller: 'SetsCtrl'
    })
    .when('/set/:id', {
      templateUrl: 'views/setId.html',
      controller: 'SetIdCtrl'
    })
    .when('/itemsType/:type/:build', {
      templateUrl: 'views/itemsType.html',
      controller: 'ItemsTypeCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
    })
    .when('/item/:type/:id', {
      templateUrl: 'views/itemId.html',
      controller: 'ItemIdCtrl'
    })
    .when('/items', {
      templateUrl: 'views/items.html',
      controller: 'ItemsCtrl'
    })
    .when('/weapons', {
      templateUrl: 'views/weapons.html',
      controller: 'WeaponsCtrl'
    })
    .when('/sets', {
      templateUrl: 'views/sets.html',
      controller: 'SetsCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .when('/builds', {
      templateUrl: 'views/builds.html',
      controller: 'BuildsCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireSignIn();
        }]
      }
    })
    .when('/build/:id', {
      templateUrl: 'views/buildId.html',
      controller: 'BuildIdCtrl'
    })
    .when('/build/:id/edit', {
      templateUrl: 'views/buildEdit.html',
      controller: 'BuildEditCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireSignIn();
        }]
      }
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireSignIn();
        }]
      }
    })
    .when('/compare', {
      templateUrl: 'views/buildsCompare.html',
      controller: 'CompareCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireSignIn();
        }]
      }
    })
    .when('/resultCompare/:firstBuild/:secondBuild', {
      templateUrl: 'views/resultCompare.html',
      controller: 'ResultCompareCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);
