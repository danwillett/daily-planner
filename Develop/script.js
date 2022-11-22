var colorHourSlots = function() {
  console.log("current hour: " + currentHour)
  for (var i = 0; i < timeIds.length; i++) {
  console.log("compare hour: " + loadHour[i])
    // compares time slot id with current hour and then assigns past, present or future styling 
    if (loadHour[i] < currentHour) {
      console.log("less")
      $('#'+timeIds[i]).removeClass("present future")
      $('#'+timeIds[i]).addClass("past")
      
    } else if (loadHour[i] == currentHour) {
      console.log("current time")
      console.log($(timeIds[i]))
      $('#'+timeIds[i]).removeClass("past future")
      $('#'+timeIds[i]).addClass("present") 
    } else {
      console.log("future")
      console.log($(timeIds[i]))
      $('#'+timeIds[i]).removeClass("present past")
      $('#'+timeIds[i]).addClass("future")
    }
  }
}


// grabs existing entries from local storage and pastes them onto hour scheduler if they exist
// also sets initial hour slot colors based on future, past, and present hour
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

var currentHour = dayjs().hour();
console.log("hour: " + currentHour)
var timeIds = ["hour-9", "hour-10", "hour-11", "hour-12", "hour-1", "hour-2", "hour-3", "hour-4", "hour-5"];
var loadHour = [9, 10, 11, 12, 13, 14, 15, 16, 17];


$(function () {

  colorHourSlots()

  var weekDayEl = $("#weekDay");
  var dateEl = $("#date")

  setInterval(function(){
    var date = dayjs().format('MMMM D YYYY');
    var time = dayjs().format('h:mm a');

    var dayTime = dayjs().format('dddd') + ", " + time;

    $(weekDayEl).text(dayTime);
    $(dateEl).text(date);

    // reruns the hour color stylings when the hour changes
    var hour = dayjs().hour();
    if (hour !== currentHour) {
      colorHourSlots()
      currentHour = dayjs().hour();
      console.log("hour: " + currentHour)
    }
    

  }, 1000)
  
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

