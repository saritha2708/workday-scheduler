// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
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
  const $pTag = $('#currentDay');
  const $workHours = $('.time-block');
  const $saveButton = $('.saveBtn');
  let dayEvents = {}; // object to store all events of the day
  let currentDay = dayjs().format('dddd[,] MMMM DD[,] YYYY h:mm A');
  // let currentHour = dayjs().hour();

  let currentHour = 14;
 
  addBackgroundColor();
  setDayEvent();

  $pTag.text(currentDay);

  function addBackgroundColor() {
    for(let i=0; i< $workHours.length ; i++){
      let hourID = $workHours.eq(i).attr('id');
      let hour = parseInt(hourID.match(/(\d+)/)[0]);
     
      if(hour < currentHour){
        $workHours.eq(i).attr('class', 'row time-block past');
        $workHours.eq(i).children('.description,.saveBtn').attr('disabled', true);
        
      } else if(hour === currentHour) {
        $workHours.eq(i).attr('class', 'row time-block present');
      } else {
        $workHours.eq(i).attr('class', 'row time-block future');
      }
    }
  }
  
  function setDayEvent() {
    dayEvents = JSON.parse(localStorage.getItem("dayEvents"));
    console.log(dayEvents);
    if(dayEvents !== null) {
      let objectKeys = Object.keys(dayEvents);
      objectKeys.forEach((key) => {
        $(`#${key}`).children('.description').text(dayEvents[key]);  
      })   
    }

  }
 
  function saveEvent(event) {
    let id = $(event.target).parent().attr('id');
    let content = $(event.target).parent().children('.description').val(); 
    dayEvents[id] = content;
    localStorage.setItem("dayEvents", JSON.stringify(dayEvents));
  }
  
  
  $saveButton.on("click", saveEvent);
  
});

