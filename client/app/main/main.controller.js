'use strict';

angular.module('qweApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.awesomeThings = [];
        $scope.newPath = '';
        $scope.paths = [];
        $scope.searchedText = '';
        $scope.foundKeys = [];
        $scope.keywords = [];
        $scope.searchedKey = '';
        $scope.selectedKeys = [];
        $scope.cvs = [];

        $http.get('/api/things').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });
        $http.get('/api/addcvs').success(function(cvs) {
            $scope.cvs = cvs;
        });
        $http.get('/api/keyss').success(function(keywords) {
            $scope.keywords = keywords;
            console.log(keywords[0].name);
        });
        $http.get('/api/addcvs').success(function(paths) {
            $scope.paths = paths;
        });

        $scope.selectSkill = function(key)
        {

            if($scope.selectedKeys.indexOf(key)>-1)
            {
                $scope.selectedKeys.splice($scope.selectedKeys.indexOf(key), 1);
            }
            else
            {
                $scope.selectedKeys.push(key);
            }
            console.log($scope.selectedKeys);
        }

        $scope.addThing = function() {
            if($scope.newThing === '') {
                return;
            }
            $http.post('/api/things', { name: $scope.newThing });
            $scope.newThing = '';
        };


        $scope.findKeywords = function(){
            $scope.foundKeys = [];
            for(var i=1; i < $scope.keywords.length; i++) {
                var regex = "[^A-Za-z]("+$scope.keywords[i].name+")[^A-Za-z#+]";
//                var regex = "("+$scope.keywords[i].name + ")[ ,)/.;:_!?]";
                var reg = new RegExp(regex, "ig");

                if ($scope.searchedText.search(reg) != -1) {
                    console.log('is in');
                    $scope.foundKeys.push($scope.keywords[i]);
                    $http.put('/api/keyss/' + $scope.keywords[i]._id,{cv : [{
                        firstname: 'andrei',
                        surname: 'lupu',
                        pathname: 'n-am'
                    }]} );
                }
            }
            $http.get('/api/keyss').success(function(keywords) {
                $scope.keywords = keywords;
                for(var i=0; i< keywords.length; i++)
                for(var j=0; j<keywords[i].cv.length; j++)
                console.log(keywords[i].cv[j].firstname);
            });
        };

        $scope.deleteItAll = function() {
            $http.delete('/api/addcvs');
        };

        $scope.deleteThing = function(thing) {
            $http.delete('/api/things/' + thing._id);
        };

        $scope.addPath = function(){
            if($scope.newThing === '') {
                return;
            }
            $http.post('/api/addcvs', { pathName: $scope.newPath });
            $scope.newPath = '';
        };
        $scope.getDoc = function()
        {
//            console.log(PDFJS);
            (new PDFJS()).getDocument('test.pdf').then(function(pdf) {
                pdf.getPage(1).then(function(page) {
                    var scale = 1.5;
                    var viewport = page.getViewport(scale);

                    var canvas = document.getElementById('the-canvas');
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext);
                });
            });

        }
    });