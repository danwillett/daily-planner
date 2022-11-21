// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// grabs existing entries from local storage and pastes them onto hour scheduler if they exist
var loadCalendarEntries = function () {
  for (var i = 0; i < timeIds.length; i++) {
    console.log(localStorage.getItem(timeIds[i]))
    const eventExists = (localStorage.getItem(timeIds[i]) !== null);
    console.log(eventExists)
    if (eventExists) {
      document.getElementById(timeIds[i]).querySelector('textarea').textContent = localStorage.getItem(timeIds[i]);
    }
  }

}

// saves user-inputted calendar item to local storage
var PutItOnTheCalendar = function () {
  var saveButton = $('.saveBtn');
  console.log(saveButton)

  $('.saveBtn').click(function (event) {
    event.preventDefault();
    // gets id of saved hour timeslot
    var contentId = $(this).parent().attr('id');
    console.log(contentId)

    // saves any text within that hour timeslot
    var textEl = document.getElementById(contentId).querySelector('textarea').value;
    console.log(textEl)
    localStorage.setItem(contentId, textEl);

    var today = dayjs().format('MMM D, YYYY');
    localStorage.setItem("timestamp", today)
  })
};




//need a function that loops through and grabs local storage items for the day
// if daytime = today or whatever then load items from local storage. If not, clear local storage

$(function () {

  // if there's already an existing record for today in localstorage, load those entries
  var today = dayjs().format('MMM D, YYYY');
  var timestamp = localStorage.getItem("timestamp")
  if (today === timestamp) {
    loadCalendarEntries();
  } else {
    for (var i = 0; i < timeIds.length; i++) {
    localStorage.removeItem(timeIds[i])
    }
  }
  // get ready to add new entries.
  PutItOnTheCalendar();

})

var timeIds = ["hour-9", "hour-10", "hour-11", "hour-12", "hour-1", "hour-2", "hour-3", "hour-4", "hour-5"];


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

