var app = angular.module('talentApp', []);



app.controller('talentController', ['$scope', '$http', function($scope, $http){
    console.log('Talent controller takeover');

    $scope.formData = {};
    $scope.allTalent = [];
    $scope.skill = {};
    $scope.allSkills = [];

    $scope.addTalent = function() {
        $scope.data = $scope.formData;
        console.log($scope.allSkills);
        console.log(this.formData);
        //function to POST to DB
        $http.post('/api/addTalent', $scope.data).success(function (response) {

            $scope.allTalent = response;


        });
    };
    $scope.getInfo = function() {
        console.log('click');

        $http.get('/api/addTalent').success(function(response) {
            console.log(response);
            $scope.allTalent = response;
        });
        $http.get('/api/addSkill').success(function(response) {
            $scope.allSkills = response;
            console.log(response);
        })


    };

    $scope.addSkill = function() {
        $scope.data = $scope.skill;

        console.log(this.skill);
        //function to POST to DB
        $http.post('/api/addSkill', $scope.data).success(function (response) {


            $scope.allSkills = response;
            console.log($scope.allSkills);

        });

    }

}]);