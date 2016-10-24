/*!
 * survey.js v0.1 (https://nodeschool.io/bainbridge)
 * Copyright (c) 2016 IslandJS, Bainbridge Island NodeSchool
 * MIT License (https://github.com/nodeschool/bainbridge/blob/gh-pages/LICENSE)
 */
$(document).ready(function () {
  $('form').submit(function (e) {
    e.preventDefault();

    var weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        bestDays = [],
        venueRating = [],
        volunteerChoices = [],
        langs = [];

    // multi-choice answers go to an array
    $('input[id^=venue]:checked').filter(function () {
      venueRating.push($(this).val());
    });

    weekdays.forEach(function (day) {
      bestDays.push($('input[name=' + day + ']:checked').val());
    });

    $('input[id^=volunteer]:checked').filter(function () {
      volunteerChoices.push($(this).val());
    });

    $('input[id^=langs]:checked').filter(function () {
      langs.push($(this).val());
    });

    var results = {
      Survey: 'NodeSchool',
      LastEventEnjoyed: $('input[name=enjoy-last-event]:checked').val(),
      LastEventFound: $('input[id=find-last-event]').val(),
      LastEventVenue: venueRating,
      LastEventFeedback: $('input[id=venuefeedback]').val(),
      MakeNextEventBetter: $('input[id=make-event-better]').val(),
      UpcomingEventInterest: $('input[name=enjoy-next-event]:checked').val(),
      BestDayAndTimes: bestDays,
      FutureTopicSuggestions: $('input[id=future-topics]').val(),
      PositiveChange: $('input[name=positive-change]:checked').val(),
      ShareYourProjects: $('input[name=personal-project-share]:checked').val(),
      ContributeToProjects: $('input[name=project-contribute]:checked').val(),
      Volunteer: volunteerChoices,
      ServerSideDev: $('input[name=server-side-dev]:checked').val(),
      YearsDeveloping: $('input[name=dev-years]:checked').val(),
      CodeLanguages: langs,
      AdditionalLangs: $('#otherlangs').val(),
      ContactInfo: $('#contact').val()
    };

    $.ajax({
      // TODO: https://github.com/nodeschool/bainbridge/issues/11
      url: '',
      type: 'POST',
      crossDomain: true,
      data: JSON.stringify(results),
      dataType: 'json'
    })
    .done(function (response) {
      if (localStorage) {
        localStorage.setItem('survey', 'completed');
      } else {
        $.cookie('survey', 'completed');
      }

      window.history.back().reload();
    })
    .fail(function (xhr, status) {
      $('#error-modal').openModal();
    });
  });

  $('#close-button').click(function () {
    window.history.back();
  });
});
