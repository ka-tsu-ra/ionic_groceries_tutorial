// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.factory('Items', ['$firebaseArray', function($firebaseArray) {
  var itemsRef = new Firebase('https://intense-inferno-1606.firebaseio.com/items');
  return $firebaseArray(itemsRef);
}])


// firebase array is a smart array that keeps your local angular data in sync with your remote firebase data. it takes a firebase reference and returns a javascript array that contains the data at that firebase location
// every piece of data in firebase is referenced by a url


.controller('ListCtrl', function($scope, $ionicListDelegate, Items) {
  $scope.items = Items;
  // Items is a firebase array so use it here instead of an empty array for the list of items
  $scope.addItem = function() {
    var name = prompt('What do you need to buy?');
    if (name) {
      $scope.items.$add({
        'name': name
      });
    }
  };

  $scope.purchaseItem = function(item) {
    var itemRef = new Firebase('https://intense-inferno-1606.firebaseio.com/items/' + item.$id);
    itemRef.child('status').set('prchased');
    $ionicListDelegate.closeOptionButtons();
  };
});
