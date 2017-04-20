// Document ready function
$(document).ready(function() {
  $('#search-button').click(function() {
    /* Act on the event */
    var searchInput = $('#search-input').val();
    Trackster.searchTracksByTitle(searchInput);
  });// ./click


});


var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {

};

/*
  Given a search term as a string, query the Spotify API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  //call to the API
  $.ajax({
    url: 'https://api.spotify.com/v1/search?type=track&q='+ title,
    type: 'GET',
    dataType: 'json',
  })
  .done(function(data) {
    console.log("success");
    console.log(data.tracks.items);
  })
  .fail(function() {
    console.log("error");
  })

};
