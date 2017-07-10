'use strict';

app.controller('GlobalCtrl', function($scope, $firebase, $rootScope, $location, UserService, Auth, Database, $cookies) {
  $rootScope.db = Database;
  $rootScope.loading = false;
  $rootScope.names = NAMES_TEMPLATE;
  $rootScope.customUi = CUSTOM_UI;
  $rootScope.reglages = {
    "disposition" : 'grid'
  }

  Auth.$onAuthStateChanged(function(firebaseUser) {
    $rootScope.user = firebaseUser;
    if($rootScope.user) {
      UserService($rootScope.user.uid).$bindTo($scope, "userData");
    }
  });

  $rootScope.ui = {
    "spells" : {
      "name" : "spells",
      "bool" : $cookies.get("spells") || true
    },
    "stats" : {
      "name" : "stats",
      "bool" : $cookies.get("stats") || true
    },
    "sets" : {
      "name" : "sets",
      "bool" : $cookies.get("sets") || true
    },
    "infos" : {
      "name" : "infos",
      "bool" : $cookies.get("infos") || true
    },
    "items" : {
      "name" : "items",
      "bool" : $cookies.get("items") || true
    },
    "build" : {
      "name" : "build",
      "bool" : $cookies.get("build") || true
    }
  }
});

app.controller('HomeCtrl', function($scope, $firebase, $rootScope, $location, UserService) {

});

app.controller('SkillsCtrl', function($scope, $firebase, $rootScope, $location) {
  $scope.Number = window.Number;
  $scope.skills = SKILLS;
  $scope.search = {
    "value" : ""
  }
  $scope.skillsFilters = {
    "show" : false
  }
  $scope.changeDisposition = function(type) {
    $rootScope.reglages.disposition = type;
  }

  $scope.classDisposition = function(type) {
    if(type == $rootScope.reglages.disposition) {
      return 'is-active';
    }
  }
  $scope.toggleFilter = function($event) {
    $($event.currentTarget).toggleClass('is-outlined');
    $scope.skillsFilters.show = !$scope.skillsFilters.show;
  }
});

app.controller('UiMenuCtrl', function($scope, $firebase, $rootScope, $location, UserService, $cookies) {
  console.log('uimenu');
  $scope.changeUi = function(id) {
    console.log(id);
    if( $rootScope.ui[id].bool == "false") {
      $rootScope.ui[id].bool = "true";
    }
    else {
      $rootScope.ui[id].bool = "false";
    }
    $cookies.put(id, $rootScope.ui[id].bool);
    console.log($rootScope.ui);
  }
});

app.controller('ProfileCtrl', function($scope, $firebase, $rootScope, $location, Auth, currentAuth, UserService) {
  if (currentAuth) {
    UserService(currentAuth.uid).$bindTo($scope, "profil");
  }
});

app.controller('ItemsCtrl', function($scope, $firebase, $rootScope, $location, Auth, Items, Categories) {
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

app.controller('HeaderCtrl', function($scope, $firebase, $rootScope, $location, $http, Auth) {
  $http.get('../json/menu.json').then(function(result) {
    $rootScope.menu = result.data.menu;
    console.log(result.data.menu);
  });

  $rootScope.langue = 'FR';
  $rootScope.trad = TRADUCTION[$rootScope.langue];

  $scope.signOut = function() {
    Auth.$signOut().then(function(result) {
      $location.path("/home");
    });
  }
  $scope.changeLang = function() {
      $rootScope.trad = TRADUCTION[$rootScope.langue];
  }

  $scope.hasDrop = function(value) {
    if(value) {
      return 'has-dropdown is-hoverable';
    }
  }

});

app.controller('FooterCtrl', function($scope, $firebase, $rootScope, $location, $http) {});

app.controller('ContactCtrl', function($scope, $firebase, $rootScope, $location, $http) {
  $scope.contactForm = {};
  $scope.processForm = function() {
    // traiter le formulaire
    console.log('traitement du formulaire');
  }
});



app.controller('BuildIdCtrl', function($scope, $firebase, $rootScope, $location, $http, BuildId, $routeParams) {
  $rootScope.loading = true;
  $scope.id = $routeParams.id;
  $scope.build = BuildId($scope.id);

  $scope.build.$loaded().then(function() {
    console.log($scope.build);
    $rootScope.loading = false;
  });
});



app.controller('ItemsTypeCtrl', function($scope, $firebase, $rootScope, $location, $http, $routeParams, currentAuth, Items, BuildId) {
  $rootScope.loading = true;
  $scope.buildId = $routeParams.build;

  $scope.build = BuildId($scope.buildId);

  $scope.typeId = $routeParams.type;

  $scope.items = Items('type' + $scope.typeId, 30);
  $scope.items.$loaded().then(function() {
    $rootScope.loading = false;
  });

  $scope.addToBuild = function(item, key) {
    var type = "type" + $scope.typeId;

    // construction de l'objet
    if (!$scope.build.items) {
      $scope.build['items'] = {}
    }
    $scope.build.items[type] = [];
    item['idItem'] = parseInt(key);
    $scope.build.items[type].push(item);

    // sauvegarde de l'objet
    $scope.build.$save().then(function(ref) {
      // retour au build
      history.back();
    }, function(err) {
      console.log(err);
    });
  }
});
