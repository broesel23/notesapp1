// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    Parse.initialize("Broesel0815", "Broesel0815javascriptKey"); // , PARSE_JS);
    Parse.serverURL = 'https://still-badlands-81431.herokuapp.com/parse';

    NoteObject = Parse.Object.extend("NoteObject");

    function getNotes() {
      var note = new NoteObject();
      var query = new Parse.Query(note);

      query.find({
        success:function(results) {
          console.dir(results);
          var s = "";
          for(var i=0, len=results.length; i<len; i++) {
            var note = results[i];
            s += "<p>";
            s += "<b>ID: "+note.id + "<br/>";
            s += "<b>"+note.get("title")+"</b><br/>";
            s += "<b>Written "+note.createdAt + "<br/>";
            s += note.get("body");
            s += "</p>";
          }
          $("#notes").html(s);
        },
        error:function(error) {
          alert("Error when getting notes!");
        }
      });
    }

    $("#addNoteBtn").on("click", function(e) {
      e.preventDefault();

      //Grab the note details, no real validation for now
      var title = $("#noteTitle").val();
      var body = $("#noteBody").val();

      var note = new NoteObject();
      note.save({title:title, body:body}, {
        success:function(object) {
          console.log("Saved the object!");
          alert("Saved the object: "+note.id);
          $("#noteTitle").val("");
          $("#noteBody").val("");
          getNotes();
        },
        error:function(object,error) {
          console.dir(error);
          alert("Sorry, I couldn't save it."+object);
        }
      });
    });

    //call getNotes immediately
    getNotes();


  });
})
