$(document).ready(function () {

  // Hide survey button if user has already completed it.
  var surveyCookie;
  if (localStorage) {
    surveyCookie = localStorage.getItem('survey');
  } else {
    surveyCookie = $.cookie('survey'); }

  // commenting this out for now until the survey is tested.
  //if (!surveyCookie) $('#survey').removeClass('hiddendiv');

  // Initilize parallax
  $('.parallax').parallax();

  // Populate Meetup Information
  getMeetupInfo();
});

// Call the Meetup API to get info about the next meetup
function getMeetupInfo() {
  var nextMeetup = 'https://api.meetup.com/2/events?&callback=?' +
                      '&group_urlname=IslandJS-Nodeschool' +
                      '&status=upcoming' +
                      '&page=1',
      lastMeetup = 'https://api.meetup.com/2/events?&callback=?' +
                      '&offset=0' +
                      '&group_urlname=IslandJS-Nodeschool' +
                      '&time=-12w,' +
                      '&status=past' +
                      '&desc=true' +
                      '&page=1';

  // If no upcoming meetups scheduled, check for past meetups instead
  $.getJSON(nextMeetup)
    .done(function (nextMeetupData) {
      if (nextMeetupData.results.length !== 0) {
        $('#past-future-event').text('Details on our next event: ');
        displayMeetupInfo(nextMeetupData);
      } else {
        $.getJSON(lastMeetup)
          .done(function (lastMeetupData) {
            $('#past-future-event').text('Details from our last event: ');
            displayMeetupInfo(lastMeetupData);
          }).fail(function (err) {
            console.error(err);
            missingData();
          });
      }
    }).fail(function (err) {
      console.error(err);
      missingData();
    });
}

function displayMeetupInfo(data) {
  // handle (rare) scenario of no past or upcoming meetups scheduled
  if (data.results.length === 0) {
    missingData();
    return;
  }

  // Store necessary data in variables, convert UTC to Gregorian
  var results = data.results[0],
      time = results.time,
      dateObj = new Date(time),
      days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'],
      day = days[dateObj.getDay()],
      date = dateObj.getDate(),
      month = months[dateObj.getMonth()],
      year = dateObj.getFullYear(),
      venue = results.venue.name,
      url = results.event_url,
      title = results.name,
      description = results.description,
      lat = results.venue.lat,
      lon = results.venue.lon,
      address = results.venue.address_1 + ',' +
                results.venue.city + ',' +
                results.venue.state + ' ' +
                results.venue.zip;

  // Write meetup details to the page
  $('.meetup-title').text(title);
  $('#meetup-date').text(day + ', ' + month + ' ' + date + ', ' + year);
  $('#meetup-location').text('at ' + venue);
  $('#meetup-event-url').attr('href', url);
  $('#meetup-description').html(description); // api returns HTML, not text
  initializeMap(lat, lon, address);
}

// Call Google Maps API to display a map of the meetup location
var map, marker;
function initializeMap(lat, lon, address) {
  var mapOptions =  {
        zoom: 15,
        scrollwheel: false,
        draggable: false,
        center: new google.maps.LatLng(lat, lon)
      },
      mapCanvas = document.getElementById('map-canvas');

  map = new google.maps.Map(mapCanvas, mapOptions),
  marker = new google.maps.Marker({ map: map, title: 'Bainbridge NodeSchool' });
  marker.setPosition(new google.maps.LatLng(lat, lon));
  $('#map-url').attr('href', 'https://www.google.com/maps/place/' + address);
}

function missingData() {
  //library = [47.6352486, -122.522736], brewery = [47.64836, -122.52508]
  initializeMap(47.6352486, -122.522736);
  $('#meetup-details').html(
    '<blockquote>' +
      'We will schedule another meetup soon. ' +
      '<a href="https://www.meetup.com/IslandJS-Nodeschool/join/" target="_blank">' +
        'Join us' +
      '</a>' +
      ' on Meetup to get notified about our next event!' +
    '</blockquote>'
  );
}
