// Document ready function
$(document).ready(function() {
  $('#search-button').click(function() {
    /* Act on the event */
    $('.header h1').css('color', 'whitesmoke');

    var searchInput = $('#search-input').val();
    Trackster.searchTracksByTitle(searchInput,'none');

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

  $('.header-attribute').click(function(event) {
    /* Act on the event */
    var sel=$(this).text();
    var searchInput = $('#search-input').val();
    Trackster.searchTracksByTitle(searchInput,sel);
  });
  // end click


});
// ./doc ready


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

    // console.log(track.name[0]);
  //template of rows for tracks
    var trackHTML=
      '<div class="row track">' +
      '<span class="col-xs-1 play-btn"><a href="' + track.preview_url + '"><i class="fa fa-play-circle-o fa-2x"></i></a>' +
      '</span><span class="col-xs-1 text-right">'+ track.track_number + '</span>' +
      '<span class="col-xs-3 track-name" >' + track.name + '</span>' +
      '<span class="col-xs-2">' + track.artists[0].name + '</span>' +
      '<span class="col-xs-3">' + track.album.name + '</span>' +
      '<span class="col-xs-1">' + track.popularity + '</span>' +
      '<span class="col-xs-1">' + convertTrackLength.toFixed(2).replace('.',':') + '</span></div>';

  //add data elements
      // $('.track-name').data('trackName', track.name[0]);


  //add to div
      $('#display-tracks').append(trackHTML);

  }); // ./each

};

/*
  Given a search term as a string, query the Spotify API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title, header) {
  //call to the API
  $.ajax({
    url: 'https://api.spotify.com/v1/search?type=track&q='+ title,
    type: 'GET',
    dataType: 'json',
    success: function(response){
      var list = response.tracks.items;
      //change header based on header clicked
      if(header !== 'none') {
          switch (header) {
            case 'Song':
              header = 'name';
              break;
            case 'Album':
              header = 'album';
              break;
            case 'Popularity':
              header= 'popularity'
              break;
            case 'Length':
              header= 'duration_ms'
              break;
            default:
              header = 'none'
              break;
          } // ./switch

          list= Trackster.sortList(list,header);
      } // ./if
      Trackster.renderTracks(list);
    } //./success
  })
};

Trackster.sortList=function(tracks,key){
  return tracks.sort(function(a,b){
    var x=a[key]; var y=b[key];
    if(key === 'album') {x=a[key]["name"]; y=b[key]["name"]};
    console.log(y);
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  })
}
