app.factory("UserService", ["$firebaseObject",
  function($firebaseObject) {
    return function(username) {
      var ref = firebase.database().ref("users");
      var profileRef = ref.child(username);
      return $firebaseObject(profileRef);
    }
  }
]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

app.factory("Commentaires", ["$firebaseObject",
  function($firebaseObject) {
    return function(type,limit) {
      console.log('id is : ' + type);
      var ref = firebase.database().ref("items");
      return $firebaseObject(ref);
    }
  }
]);


app.factory("Database",
  function() {
    // create a reference to the database where we will store our data
    var ref = firebase.database();
    return ref;
  }
);
