// function applies styling to hour slots based on current time
var colorHourSlots = function(thisHour) {
  console.log("current hour: " + thisHour)
  for (var i = 0; i < timeIds.length; i++) {
  console.log("compare hour: " + loadHour[i])
    // compares time slot id with current hour and then assigns past, present or future styling 
    if (loadHour[i] < thisHour) {
      console.log("less")
      $('#'+timeIds[i]).removeClass("present future")
      $('#'+timeIds[i]).addClass("past")
      
    } else if (loadHour[i] == thisHour) {
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

// sets global variables that are called in above functions
var currentHour = dayjs().hour();
console.log("hour: " + currentHour)
var timeIds = ["hour-9", "hour-10", "hour-11", "hour-12", "hour-1", "hour-2", "hour-3", "hour-4", "hour-5"];
var loadHour = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// when page is fully loaded, jquery function runs
$(function () {
  // sets styling based on current time
  colorHourSlots(currentHour)

  var weekDayEl = $("#weekDay");
  var dateEl = $("#date");

  // changes current time displayed on webpage as well as tracks hour changes for styling
  setInterval(function(){
    var date = dayjs().format('MMMM D YYYY');
    var time = dayjs().format('h:mm a');

    var dayTime = dayjs().format('dddd') + ", " + time;

    $(weekDayEl).text(dayTime);
    $(dateEl).text(date);

    // reruns the hour color stylings when the hour changes
    var hour = dayjs().hour();
    if (hour !== currentHour) {
      colorHourSlots(hour)
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
  // adds new entries to local storage
  PutItOnTheCalendar();

})


