'use strict';

function BuildMasonry() {

  var $container = $('#blocs-home').masonry();

  console.log('lol');

  $container.masonry({

    itemSelector: '.bloc-home'

  });

}



$(window).on("load", function() {

  $('.type-3').height(($('.type-2').height() / 2) - 3);

  $('.loading-screen').fadeOut();


});

var ctrl = angular.module('myApp', ['ngSanitize']);



ctrl.directive('onFinishRender', function($timeout) {

  return {

    restrict: 'A',

    link: function(scope, element, attr) {

      if (scope.$last === true) {

        $timeout(function() {

          scope.$emit(attr.onFinishRender);

        });

      }

    }

  }

});





ctrl.filter('nl2br', function() {

  var span = document.createElement('span');

  return function(input) {

    if (!input) return input;

    var lines = input.split('\n');



    for (var i = 0; i < lines.length; i++) {

      span.innerText = lines[i];

      span.textContent = lines[i]; //for Firefox

      lines[i] = span.innerHTML;

    }

    return lines.join('<br />');

  }

});



ctrl.service('Blocs', function($http) {
  var getBlocs = function() {
    return $http({
      url: "http://www.cityaventure.com/wp-content/themes/cityaventure/php/blocs.php",
      method: "GET",
      params: {
        blocs: 1,
      }
    });
  }

  var getBlocById = function(id) {
    return $http({
      url: "http://www.cityaventure.com/wp-content/themes/cityaventure/php/blocs.php",
      method: "GET",
      params: {
        blocById: 1,
        id: id
      }
    });
  }

  var getType1 = function() {
    return $http({
      url: "http://www.cityaventure.com/wp-content/themes/cityaventure/php/blocs.php",
      method: "GET",
      params: {
        type1: 1,
      }
    });
  }



  var updateBloc = function(data) {
    return $http({
      url: "http://www.cityaventure.com/wp-content/themes/cityaventure/php/blocs.php",
      method: "POST",
      data: {
        updateBloc: 1,
        "data": data
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  return {
    getBlocs: getBlocs,
    getType1: getType1,
    getBlocById: getBlocById,
    updateBloc: updateBloc
  }
});

ctrl.service('Attractions', function($http) {
  var getAttractions = function() {
    return $http({
      url: "http://www.cityaventure.com/wp-content/themes/cityaventure/php/attractions.php",
      method: "GET",
      params: {
        attractions: 1,
      }
    });
  }

  var getAttractionById = function(id) {
    return $http({
      url: "http://www.cityaventure.com/wp-content/themes/cityaventure/php/attractions.php",
      method: "GET",
      params: {
        attractionById: 1,
        id: id
      }
    });
  }

  var updateAttraction = function(data) {
    return $http({
      url: "http://www.cityaventure.com/wp-content/themes/cityaventure/php/attractions.php",
      method: "POST",
      data: {
        updateAttraction: 1,
        "data": data
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  return {
    getAttractions: getAttractions,
    getAttractionById: getAttractionById,
    updateAttraction: updateAttraction
  }
});

ctrl.service('Tarifs', function($http) {
  var getTarifs = function() {
    return $http({
      url: "http://www.cityaventure.com/wp-content/themes/cityaventure/php/tarifs.php",
      method: "GET",
      params: {
        tarifs: 1,
      }
    });
  }

  var getTarifById = function(id) {
    return $http({
      url: "http://www.cityaventure.com/wp-content/themes/cityaventure/php/tarifs.php",
      method: "GET",
      params: {
        tarifById: 1,
        id: id
      }
    });
  }

  var updateAttraction = function(data) {
    return $http({
      url: "http://www.cityaventure.com/wp-content/themes/cityaventure/php/attractions.php",
      method: "POST",
      data: {
        updateAttraction: 1,
        "data": data
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  return {
    getTarifs: getTarifs,
    getTarifById: getTarifById,
    updateAttraction: updateAttraction
  }
});

ctrl.controller("homeCtrl", function($scope, Blocs, $timeout) {
  console.log('ctrl');
  Blocs.getBlocs().then(function(response) {
    $scope.blocs = response.data;
    console.log(response.data);
  });

  $scope.edit = function(id) {
    Blocs.getBlocById(id).then(function(response) {
      console.log(response);
      $scope.toEdit = response.data[0];
      $('#bloc-modal').modal('show');
    });
  }

  $scope.update = function(data) {
    Blocs.updateBloc(data).then(function(response) {
      if (response.data == "200") {
        Blocs.getBlocs().then(function(r) {
          $scope.blocs = r.data;
          console.log(r.data);
          $('#bloc-modal').modal('hide');
        });
      }
    });
  }
});

ctrl.controller("attractionsCtrl", function($scope, Attractions, $timeout) {
  var hash = "";
  if(window.location.hash) {
     var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
 } else {
 }

  $scope.names = {
    "1" : {
      "nom" : "Lyon Ste Foy",
      "color" : "#e96e0f"
    },
    "2" : {
      "nom" : "Lyon Albigny",
      "color" : "#436c90"
    }
  }

  $scope.aFilter = {
    "parc" : '',
    "type" : [1,2,3],
    "parent" : ''
  }


  $scope.edit = function(id) {
    Attractions.getAttractionById(id).then(function(response) {
      console.log(response);
      $scope.toEdit = response.data[0];
      $('#bloc-modal').modal('show');
    });
  }
  $scope.updateAllFilter = function($event) {
    $scope.aFilter.parent = '';
    $scope.aFilter.parc = '';
    $scope.aFilter.type = [1,2,3];
    $('.a-Filter').removeClass('activeF');
    $($event.currentTarget).addClass('activeF');
  }

  $scope.typeFilter = function() {
    if($scope.attractions) {
      return $scope.attractions.filter(function(attraction) {
        if($scope.aFilter.type.length == 3) {
          return true;
        }

        else {
          return attraction.type[0].indexOf($scope.aFilter.type) !== -1;
        }
      });
      console.log($scope.attractions);
      console.log($scope.aFilter.type.length);
    }
  }
  $scope.updateFilter = function(key, value, $event) {
    $scope.aFilter[key] = value;
    $('.allF').removeClass('activeF');
  /*  $('.a-Filter.allF').removeClass('activeF');
    $('.a-Filter.' + key + 'F').removeClass('activeF');
    $($event.currentTarget).addClass('activeF');*/
  }

  $scope.isActive = function(type, value) {
    if(type == 'parent') {
      if($scope.aFilter.parent == value) {
        return 'activeF';
      }
    }
    if(type == 'type') {
      if(value == $scope.aFilter.type) {
        return 'activeF';
      }
    }
    if(type == 'parc') {
      if(value == $scope.aFilter.parc) {
        return 'activeF';
      }
    }
    if(type == 'all') {
      if(($scope.aFilter.parc == '') && ($scope.aFilter.type == [1,2,3]) && ($scope.aFilter.parent == '')) {
        return 'activeF';
      }
    }
  }
  $scope.updateParentEnfant = function(key, $event) {
    if($scope.aFilter[key] == '') {
      //$('.a-Filter.allF').removeClass('activeF');
      $scope.aFilter[key] = 1;
    }
    else if ($scope.aFilter[key] == 1){
      $scope.aFilter[key] = '';
    }
  }


  $scope.update = function(data) {
    Attractions.updateAttraction(data).then(function(response) {
      if (response.data == "200") {
        Attractions.getAttractions().then(function(r) {
          $scope.attractions = r.data;
          console.log(r.data);
          $('#attraction-modal').modal('hide');
        });
      }
    });
  }
  Attractions.getAttractions().then(function(response) {
    $scope.attractions = response.data;
    for (var e in $scope.attractions) {
      $scope.attractions[e].type = JSON.parse("[" + $scope.attractions[e].type + "]");
    }
    $scope.loadingAttractions = true;
    if (hash != "") {
      if(hash == "stefoy") {
        hash = 1;
      }
      else if (hash == "albigny"){
        hash = 2;
      }
      else {
        hash = 1;
      }
        $scope.updateFilter('parc', parseInt(hash), 'nothing');
    }

  });

});

ctrl.controller("tarifsCtrl", function($scope, $timeout, Tarifs) {
  $scope.names = {
    "1" : {
      "nom" : "Lyon Ste Foy",
      "color" : "#e96e0f"
    },
    "2" : {
      "nom" : "Lyon Albigny",
      "color" : "#436c90"
    }
  }

  Tarifs.getTarifs().then(function(response) {
    $scope.tarifs = response.data;
    $scope.loadingTarifs = true;
  });
});



$(document).ready(function() {

  console.log("try");

});
