// Document ready function
$(document).ready(function() {
  $('#search-button').click(function() {
    /* Act on the event */
    $('.header h1').css('color', 'whitesmoke');

    var searchInput = $('#search-input').val();
    Trackster.searchTracksByTitle(searchInput);

    //change title logo back to pink
    $('.header h1').css('color', 'rgb(255, 0, 171)');

  });// ./click

  $('#search-input').keypress(function(event) {
    /* Act on the event */
    if(event.which === 13){
      event.preventDefault();
      $('#search-button').click();
    }
  }); // ./keypress


});


var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  var $trackList = $('#display-tracks');

  $trackList.empty();

  $.each(tracks,function(i, v) {
    var track=tracks[i];
    var convertTrackLength= (track.duration_ms / 1000) / 60;

  //template of rows for tracks
    var trackHTML=
      '<div class="row track">' +
      '<span class="col-xs-1 play-btn"><a href="' + track.preview_url + '"><i class="fa fa-play-circle-o fa-2x"></i></a>' +
      '</span><span class="col-xs-1 text-right">'+ track.track_number + '</span>' +
      '<span class="col-xs-3">' + track.name + '</span>' +
      '<span class="col-xs-2">' + track.artists[0].name + '</span>' +
      '<span class="col-xs-3">' + track.album.name + '</span>' +
      '<span class="col-xs-1">' + track.popularity + '</span>' +
      '<span class="col-xs-1">' + convertTrackLength.toFixed(2).replace('.',':') + '</span></div>';
  //add to div
      $('#display-tracks').append(trackHTML);
  });
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
    success: function(response){
      Trackster.renderTracks(response.tracks.items);
    }
  })
  // .done(function() {
  //   console.log("success");
  // })
  // .fail(function() {
  //   console.log("error");
  // })

};
