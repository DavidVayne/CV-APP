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

var app = angular.module('myApp', ['ngRoute', 'firebase', 'ngCookies', 'ngDragDrop', 'angularMoment', 'ngSanitize', 'ngAnimate']);


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
    .when('/showcase', {
      templateUrl: 'views/showcase.html',
      controller: 'ShowcaseCtrl'
    })
    .when('/career', {
      templateUrl: 'views/career.html',
      controller: 'CareerCtrl'
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
    .otherwise({
      redirectTo: '/home'
    });
}]);
