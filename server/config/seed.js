/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Keys = require('../api/keys/keys.model');
var Addcv = require('../api/addcv/addcv.model');

Keys.find({}).remove(function(){
    Keys.create(
        {  name:'C#'},{  name:'C'},{name:'Java'},{  name:'Android'},
        {  name:'ASP'},{  name:'Assembly'},{  name:'Cobol'},{  name:'Fortran'},{  name:'Haskell'},
        {  name:'JavaScript'},{  name:'Lisp'},{  name:'Lua'},{  name:'Objective C'},{  name:'PHP'},{  name:'Perl'},{  name:'Python'},
        {  name:'Ruby'},{  name:'SQL'},{  name:'Shell'},{  name:'Visual Basic'},{  name:'Linux'},{  name:'Unix'}
    );

});

Addcv.find({}).remove(function() {
    Addcv.create({
        firstname: 'Andrei',
        surname: 'Lupu',
        pathname: 'bun',
        skills: 'bun la toate '
    }, {
        firstname: 'Andrei',
        surname: 'Lupu',
        pathname: 'bun',
        skills: 'bun la toate '
    }, {
        firstname: 'Cosmin',
        surname: 'Sparhat',
        pathname: 'bun',
        skills: 'C# Cobol JavaScript Unix '
    }, {
        firstname: 'Andrei',
        surname: 'Lupu',
        pathname: 'bun',
        skills: 'java '
    }, {
        firstname: 'Andrei',
        surname: 'Lupu',
        pathname: 'bun',
        skills: 'javascript '
    });
});

    Thing.find({}).remove(function() {
        Thing.create({
            name : 'Development Tools',
            info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Sass, CoffeeScript, and Less.'
        }, {
            name : 'Server and Client integration',
            info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
        }, {
            name : 'Smart Build System',
            info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
        },  {
            name : 'Modular Structure',
            info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
        },  {
            name : 'Optimized Build',
            info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
        },{
            name : 'Deployment Ready',
            info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
        });
    });