'use strict';

app.controller('GlobalCtrl', function($scope, $firebase, $rootScope, $location, UserService, Auth, Database, $cookies) {
  $rootScope.db = Database;
  $rootScope.loading = false;
  $rootScope.names = NAMES_TEMPLATE;
  $rootScope.reglages = {
    "disposition": 'grid'
  }

  Auth.$onAuthStateChanged(function(firebaseUser) {
    $rootScope.user = firebaseUser;
    if ($rootScope.user) {
      UserService($rootScope.user.uid).$bindTo($scope, "userData");
    }
  });

});

app.controller('HomeCtrl', function($scope, $firebase, $rootScope, $location, UserService) {
  $scope.changeTab = function(id, $event) {
    $('.tabs-profil .level-item').removeClass('active');
    $($event.currentTarget).addClass('active');
    $('.tabs-content .tab').removeClass('active');
    $(id).addClass('active');
  }
});

app.controller('ProfileCtrl', function($scope, $firebase, $rootScope, $location, Auth, currentAuth, UserService) {
  if (currentAuth) {
    UserService(currentAuth.uid).$bindTo($scope, "profil");
  }
});

app.controller('LoginCtrl', function($scope, $firebase, $rootScope, $location, Auth) {
  $scope.loginModel = {};

  $scope.signUp = function() {
    $scope.error = null;
    Auth.$createUserWithEmailAndPassword($scope.signUpModel.email, $scope.signUpModel.password).then(function(firebaseUser) {
      firebase.database().ref('users/' + firebaseUser.uid).set({
        name: "Inconnu",
        email: $scope.signUpModel.email
      });
      $('#loginModal').modal('hide');
      $rootScope.user = firebaseUser;
    }).catch(function(error) {
      $scope.errorUp = error;
    });
  };

  $scope.doLogin = function() {
    $scope.error = null;
    Auth.$signInWithEmailAndPassword($scope.loginModel.email, $scope.loginModel.password).then(function(firebaseUser) {
      firebase.database().ref('users/' + firebaseUser.uid).ref('customUi').set({
        //$rootScope.customUi
      });
      $('#loginModal').modal('hide');
      $rootScope.user = firebaseUser;
    }).catch(function(error) {
      $scope.error = error;
    });
  };

  $scope.socialLogin = function(providerText) {
    console.log('social login ' + providerText)
    var provider = getProviderLink(providerText);
    $rootScope.auth.$signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      $rootScope.firebaseUser = result.user;
      if (result.user) {
        console.log('modification du nom de la personne');
        console.log(result.user);
        $rootScope.db.ref('/users/' + result.user.uid).set({
          name: getName(result.user),
          email: result.user.email,
          photoURL: result.user.photoURL,
          score: 0,
          current: 0,
          idQuiz: 32
        });
      }
      alert('connecté');
    }).catch(function(error) {
      console.log(error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        var pendingCred = error.credential;
        var email = error.email;

        firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
          if (providers[0] === 'password') {
            var password = promptUserForPassword();
            $rootScope.auth.$signInWithEmailAndPassword(email, password).then(function(user) {
              return user.link(pendingCred);
            }).then(function() {
              alert('connecté');
            });
            return;
          }
          alert('Un compte ' + providers[0] + ' existe déjà pour cette adresse email, voulez-vous essayer de vous connecter avec ?');
          var finalProvider = getProviderLink(providers[0]);
          $rootScope.auth.$signInWithPopup(finalProvider).then(function(result) {
            console.log(result);
            result.user.link(pendingCred).then(function() {
              alert('connecté');
            }).catch(function(err) {
              $scope.error = err;
            });
          });
        });
      } else {
        $scope.error = error;
      }
    });
  }

  $scope.oubli = function() {
    // fonction d'oubli de mot de passe / réinitialisation
  }
});

app.controller('HeaderCtrl', function($scope, $firebase, $rootScope, $location, $http, Auth, $cookies) {
  $http.get('../json/menu.json').then(function(result) {
    $rootScope.menu = result.data.menu;
  });
  if ($cookies.get('langue')) {
    $rootScope.langue = $cookies.get('langue');
  } else {
    $rootScope.langue = 'FR';
  }

  $rootScope.trad = TRADUCTION[$rootScope.langue];

  $scope.signOut = function() {
    Auth.$signOut().then(function(result) {
      $location.path("/home");
    });
  }
  $scope.changeLang = function() {
    $rootScope.trad = TRADUCTION[$rootScope.langue];
    $cookies.put('langue', $rootScope.langue);
  }

  $scope.hasDrop = function(value) {
    if (value) {
      return 'has-dropdown is-hoverable';
    }
  }

  $scope.toggleMenuMobile = function($event) {
    $($event.currentTarget).toggleClass('is-active');
    $('#nav').toggleClass('is-active');
  }

});

app.controller('SkillsCtrl', function($scope, $firebase, $rootScope, $location) {
  $scope.Number = window.Number;
  $scope.skills = SKILLS;
  $scope.search = {
    "value": ""
  }
  $scope.skillsFilters = {
    "show": false
  }
  $scope.changeDisposition = function(type) {
    $rootScope.reglages.disposition = type;
  }

  $scope.classDisposition = function(type) {
    if (type == $rootScope.reglages.disposition) {
      return 'is-active';
    }
  }
  $scope.toggleFilter = function($event) {
    $($event.currentTarget).toggleClass('is-outlined');
    $scope.skillsFilters.show = !$scope.skillsFilters.show;
  }
});

app.controller('KnowledgeCtrl', function($scope, $firebase, $rootScope, $location) {
  console.log('know');
});

app.controller('ShowcaseCtrl', function($scope, $firebase, $rootScope, $location, $http) {
  $http.get('../json/showcase.json').then(function(result) {
    $scope.showcases = result.data.showcase;
  });
});
app.controller('CareerCtrl', function($scope, $firebase, $rootScope, $location, $http) {
});

app.controller('FooterCtrl', function($scope, $firebase, $rootScope, $location, $http) {});

app.controller('ContactCtrl', function($scope, $firebase, $rootScope, $location, $http) {
  $scope.contactForm = {};

  $scope.processForm = function($event) {
    // traiter le formulaire
    console.log($event);
    $('.submit-contact').addClass('is-loading');
  }
  $scope.resetForm = function() {
    $scope.contact = {
      "infos": "",
      "mail": "",
      "demande": "",
      "message": ""
    }
  }
});
