/**
  * Make an Object that encompasses the behavior of this script. This way,
  * only this Objec will be exposed to other scripts, thus reducing the namespace
  * conflicts
  */
var Login = function(){
  
  $('#loginForm').submit(function(event){
    /**
      * Prevent the form from taking default action.
      */
    event.preventDefault();
    console.log('TESTING LOGGIN: ' + $(this).serialize())

    $.post('/login', $(this).serialize(), function(response){
      console.log(response)
      if(response.message === "unauthorized") 
        window.location = '/authFailed';
      else {
        $('#loginForm').hide();
        $('#loginPrompt').html('Welcome, ' + response.user.username);
      }
    });
  });
};

$(document).ready(function(){
  Login(); 
});