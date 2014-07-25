'use strict';
angular.module('qweApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.awesomeThings = [];
        $scope.newPath = '';
        $scope.paths = [];
        $scope.searchedText = '';
        $scope.searchedName = '';
        $scope.foundKeys = [];
        $scope.keywords = [];
        $scope.searchedKey = '';
        $scope.selectedKeys = [];
        $scope.cvs = [];
        $scope.fileContent = 'Testing skill search for Javascript, Unix and sometimes C#. Rarely Python. Never Cobol.';

        //////////////////GET REQUESTS/////////////////

        $http.get('/api/things').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });
        $http.get('/api/addcvs').success(function(cvs) {
            $scope.cvs = cvs;
        });
        $http.get('/api/keyss').success(function(keywords) {
            $scope.keywords = keywords;
        });
        $http.get('/api/addcvs').success(function(paths) {
            $scope.paths = paths;
        });

        //////////////////FILTERS//////////////////////

        $scope.nameFilter= function(item){
            if($scope.searchedName == ''){
                return false;
            }
            var searchRegex = new RegExp( $scope.searchedName, "ig");
            if(item.firstname.search(searchRegex) != -1 || item.surname.search(searchRegex) != -1){
                return true;
            }
            return false;
        }

        $scope.skillsFilter = function(item) {
            if($scope.selectedKeys.length == 0){
                return false;
            }
            $scope.searchedName ='';
            for(var i = 0; i<$scope.selectedKeys.length ; i++){
                var searchRegex = new RegExp( $scope.selectedKeys[i] + ' ', "ig");
                if(item.skills.search(searchRegex) == -1){
                    return false;
                }
            }
            return true;
        }


        /////////////METHODS////////////

        //update array of selected skills on click
        $scope.selectSkill = function(key){

            if($scope.selectedKeys.indexOf(key)>-1){
                $scope.selectedKeys.splice($scope.selectedKeys.indexOf(key), 1);
            }
            else{
                $scope.selectedKeys.push(key);
            }
            console.log($scope.selectedKeys);
        }

        // not to be used at the end. for testing purposes
        $scope.findKeywords = function(){

            $scope.foundKeys = [];
            for(var i=0; i < $scope.keywords.length; i++) {
                var regex = "[^A-Za-z](" + $scope.keywords[i].name + ")[^A-Za-z#+]";
                var reg = new RegExp(regex, "ig");

                if ($scope.searchedText.search(reg) != -1) {
                    $scope.cvs.push($scope.keywords[i]);
                }
            }
        };

        ///////////METHODS MODIFYING THE DB/////////////

        $scope.deleteItAll = function() {
            $http.delete('/api/addcvs');
        };

        $scope.deleteCvs = function(thing) {
            $http.delete('/api/addcvs/' + thing._id);
        };

        //!!!!! this currently takes only the first entry. Modify to work for all selections!!!
        $scope.uploadFile = function(files) {
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", files[0]);
            var containedKeys = '';
            //search for skills
            for(var i=0; i < $scope.keywords.length; i++) {

                var regex = "[^A-Za-z]("+$scope.keywords[i].name+")[^A-Za-z#+]";
                var reg = new RegExp(regex, "ig");

                if ($scope.fileContent.search(reg) != -1){
                    containedKeys = containedKeys.concat($scope.keywords[i].name, ' ');
                }
            }
            $http.post('/api/addcvs', {
                firstname: files[0].name.split(" ")[0],
                surname: files[0].name.split(" ")[1].split(".")[0],
                pathname:"http://localhost:9000/"+files[0].name,
                skills: containedKeys});

//            $scope.getDoc();
//            $http.post('/api/addcvs/cvs', fd, {
//                withCredentials: true,
//                headers: {'Content-Type': undefined },
//                transformRequest: angular.identity
//            }).success(console.log("all good") ).error(console.log("baaad bad") );

        };

        //////////////PDFJS///////////////

        $scope.getDoc = function()
        {
//            console.log(PDFJS);
            PDFJS().getDocument('test.pdf').then(function(pdf) {
                console.log("scasca");
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

        //////////////LINKEDIN////////////////

        $scope.startIn = function()
        {
            var express = require('express')
                , linkedin_client = require('linkedin-js')('key', 'secret', 'http://localhost:3003/auth')
                , app = express.createServer(
                    express.cookieParser()
                    , express.session({ secret: "string" })
                );

            app.get('/auth', function (req, res) {
                // the first time will redirect to linkedin
                linkedin_client.getAccessToken(req, res, function (error, token) {
                    // will enter here when coming back from linkedin
                    req.session.token = token;

                    res.render('auth');
                });
            });

            app.post('/message', function (req, res) {
                linkedin_client.apiCall('POST', '/people/~/shares',
                    {
                        token: {
                            oauth_token_secret: req.session.token.oauth_token_secret
                            , oauth_token: req.session.token.oauth_token
                        }
                        , share: {
                        comment: req.param('message')
                        , visibility: {code: 'anyone'}
                    }
                    }
                    , function (error, result) {
                        res.render('message_sent');
                    }
                );
            });

            app.listen(3003);
        }
    });
