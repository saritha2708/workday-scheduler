$(function () {
 
  const $pTag = $('#currentDay');
  const $workHours = $('.time-block');
  const $saveButton = $('.saveBtn');
  let dayEvents = {}; // object to store all events of the day
  let currentDay = dayjs().format('dddd[,] MMMM DD[,] YYYY h:mm A');
  let currentHour = dayjs().hour();

  // these two functions are called when page loads
  addBackgroundColor();
  setDayEvent();

  $pTag.text(currentDay);//displays current date and time on the page

  // adds background color to the hour divs based on current hour
  function addBackgroundColor() {
    for(let i=0; i< $workHours.length ; i++){
      let hourID = $workHours.eq(i).attr('id');
      let hour = parseInt(hourID.match(/(\d+)/)[0]);// parses only number from the string, eg: 11 from hour-11
     
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
  
  // gets stored events of the day from local storage and displays on the page
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
  
  // saves all the events of the day to local storage 
  function saveEvent(event) {
    let id = $(event.target).parent().attr('id');
    let content = $(event.target).parent().children('.description').val(); 
    dayEvents[id] = content;
    localStorage.setItem("dayEvents", JSON.stringify(dayEvents));
  }
  
  //Event listener to the save button
  $saveButton.on("click", saveEvent);
  
});

