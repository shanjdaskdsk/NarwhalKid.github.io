const text = document.getElementById('text')
const r = document.querySelector(':root');
menu = 0
menuAnim = 0


function countdown(seconds) {
  displayTime(seconds);

  var i = 0
  function myLoop(loopDay) {
    dayy = document.getElementById('day').innerText[0]
    displayTime(seconds - i);
    i++;
    if (i < seconds) {
      if (menu == 0) {


        var something = (new Date).getSeconds();
        var something_cachedValue = something;

        function doStuff() {
          if ((new Date).getSeconds() === something_cachedValue) {
            setTimeout(doStuff, 50);
            return;
          }
          something_cachedValue = something;
          console.log(loopDay + " " + dayy)
          if (menu == 0 && dayy == loopDay) {
            calcTimeSincePd();
          }
        }

        doStuff();
      }
    } else {
      calcTimeSincePd();
    }
  }

  myLoop(document.getElementById('day').innerText[0]);
}

function getPercent(length, total) {
  document.getElementById("bar").style.transitionDuration = "0s";
  percent = (total * 100) / length
  r.style.setProperty('--percent', percent + '%');
  console.log("hi: " + percent)
  setTimeout(() => {
    document.getElementById("bar").style.transitionDuration = total + "s";
    r.style.setProperty('--percent', "0%");
  }, 10)
}

function displayTime(seconds) {
  hrs = Math.floor(seconds / 3600);
  mins = Math.floor(seconds / 60) % 60;
  secs = seconds % 60
  if (secs < 10) {
    secs = "0" + secs;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  document.title = hrs + ":" + mins + ":" + secs;
  text.innerHTML = hrs + ":" + mins + ":" + secs;
}


function calcTimeSincePd(day) {

  date = new Date();
  date2 = new Date();

  // date = new Date('August 19, 1975 00:00:00');
  periodsC = [[0, 00, "No School"]]
  periodsA = [[0, 00, "No School"], [7, 25, "Homeroom"], [7, 35, "Switching Classes"], [7, 40, "French"], [9, 05, "Switching Classes"], [9, 10, "Foundations of Technology"], [10, 35, "Switching Classes"], [10, 40, "Algebra II"], [11, 05, "Lunch"], [11, 30, "Algebra II"], [12, 30, "Switching Classes"], [12, 35, "Gym"], [14, 00, "No School"]]
  periodsB = [[0, 00, "No School"], [7, 25, "Homeroom"], [7, 35, "Switching Classes"], [7, 40, "Band"], [9, 05, "Switching Classes"], [9, 10, "English"], [10, 35, "Switching Classes"], [10, 40, "American Government"], [11, 35, "Lunch"], [12, 00, "American Government"], [12, 30, "Switching Classes"], [12, 35, "Biology"], [14, 00, "No School"]]

  if (document.cookie[4] == "A") {
    periods = periodsA
    if (date.getDay() == 2 || date.getDay() == 4) {
      document.getElementById('day').innerText = "A Day*";
    } else {
      document.getElementById('day').innerText = "A Day";
    }
  } else if (document.cookie[4] == "B") {
    periods = periodsB
    if (date.getDay() == 1 || date.getDay() == 3) {
      document.getElementById('day').innerText = "B Day*";
    } else {
      document.getElementById('day').innerText = "B Day";
    }
  } else if (date.getDay() == 1 || date.getDay() == 3 || day == "A") {
    periods = periodsA
    document.getElementById('day').innerText = "A Day";
  } else if (date.getDay() == 2 || date.getDay() == 4 || day == "B") {
    periods = periodsB
    document.getElementById('day').innerText = "B Day";
  } else if (date.getDay() == 0 || date.getDay() == 6) {
    periods = periodsC
    document.getElementById('day').innerText = "Weekend";
  } else {
    alert('aw i messed up the code somehow')
  }

  dateHrs = date.getHours() * 60 + date.getMinutes();

  period = periods.length - 1;
  for (let i = 0; i < periods.length - 1; i++) {
    if (dateHrs >= 60 * periods[i][0] + periods[i][1] && dateHrs < 60 * periods[i + 1][0] + periods[i + 1][1]) {
      period = i;
    }


  }
  console.log(period)



  date.setSeconds(0)
  date.setMinutes(periods[period][1])
  date.setHours(periods[period][0])
  if (period == periods.length - 1) {
    date2.setSeconds(59)
    date2.setMinutes(59)
    date2.setHours(23)
  } else {
    date2.setSeconds(0)
    date2.setMinutes(periods[period + 1][1])
    date2.setHours(periods[period + 1][0])
  }



  length = Math.floor((date2.getTime() - date.getTime()) / 1000)
  console.log(length)
  distance = Math.floor((Math.floor(new Date().getTime()) - date.getTime()) / 1000)
  console.log(distance)

  remaining = length - distance


  countdown(remaining)
  getPercent(length, remaining);
  document.getElementById('two').innerText = periods[period][2]
}

// heres the spot u can test the date in
date = new Date();
if (date.getDay() == 5 && document.cookie == "") {
  document.getElementById('aOrB').style.display = "inline";
  document.getElementsByClassName('innerMain')[0].style.display = "none"
  document.getElementsByClassName('innerMain')[1].style.display = "none"
} else {
  calcTimeSincePd();
}

function changeDayPost() {
  document.getElementById('aOrB').style.display = "inline";
  document.getElementsByClassName('innerMain')[0].style.display = "none"
  document.getElementsByClassName('innerMain')[1].style.display = "none"
}

function setDay(day) {

  saveDay(day);

  document.getElementById('aOrB').style.display = "none";
  document.getElementById('day').innerText = day + " Day";
  document.getElementsByClassName('innerMain')[0].style.display = "inline"
  document.getElementsByClassName('innerMain')[1].style.display = "inline"



  calcTimeSincePd(day);
}

function openMenu() {
  menu = 1;
  menuAnim = 1

  three = document.getElementById('three')
  div = document.getElementsByClassName('main2')[0]
  div2 = document.getElementsByClassName('main2')[1]

  three.innerText = ""

  three.style.backgroundColor = "#689268";
  three.style.height = "200vh"
  three.style.width = "200vw"
  div.style.display = "inline-block"
  div2.style.display = "inline-block"

  setTimeout(() => {

    document.body.style.backgroundColor = "#689268";

    document.getElementsByClassName('innerMain')[0].style.display = "none"
    document.getElementById('main').style.display = "none";


    div.style.opacity = "1"
    div2.style.opacity = "1"
    setTimeout(() => {
      menuAnim = 0
    }, 700)
  }, 2000)

}

function fillTable() {

  fillAAndB(1)
  fillAAndB(3)
  fillAAndB(5)
  fillAAndB(7)
  fillAAndB(8)
  fillAAndB(9)
  fillAAndB(11)
  fillAAndB(12)



  function fillAAndB(i) {
    AMins = periodsA[i][1]
    BMins = periodsB[i][1]

    if (AMins < 10) {
      AMins = "0" + AMins
    }
    if (BMins < 10) {
      BMins = "0" + BMins
    }

    // e

    var row = document.getElementsByTagName("tr")[1];
    var x = row.insertCell(row.length);
    x.innerHTML = "<span class='tableElem' onclick=if(mobile==1){alert(\"" + periodsA[i][0] + ":" + AMins + "\")} title ='" + periodsA[i][0] + ":" + AMins + "'>" + periodsA[i][2] + "</span>";

    var row2 = document.getElementsByTagName("tr")[2];
    var x2 = row2.insertCell(row2.length);
    x2.innerHTML = "<span class='tableElem' onclick=if(mobile==1){alert(\"" + periodsB[i][0] + ":" + BMins + "\")} title ='" + periodsB[i][0] + ":" + BMins + "'>" + periodsB[i][2] + "</span>";
  }



}



function closeSched() {

  menuAnim = 1

  three = document.getElementById('three')
  div = document.getElementsByClassName('main2')[0]
  div2 = document.getElementsByClassName('main2')[1]



  document.getElementsByClassName('innerMain')[1].style.display = "inline";
  document.getElementById('main').style.display = "inline";
  div.style.opacity = "0"
  div2.style.opacity = "0"






  setTimeout(() => {
    three.style.backgroundColor = "#3f226b";
    three.style.height = null
    three.style.width = null



    document.getElementsByClassName('innerMain')[0].style.display = null
    document.getElementById('main').style.display = null


    div.style.display = null
    div2.style.display = null

    document.body.style.backgroundColor = "#15042e";

    menu = 0;
    calcTimeSincePd()

    setTimeout(() => {
      three.innerText = "Open Full Schedule";
      menuAnim = 0
    }, 2500)



  }, 700)
}

function saveDay(day) {
  var now = new Date();
  now.setSeconds(0)
  now.setMinutes(0)
  now.setHours(0)
  now.setDate(now.getDate() + 1)

  var expireTime = now
  now.setTime(expireTime);
  document.cookie = 'day=' + day + ';expires=' + now.toUTCString() + ';path=/';
  console.log(document.cookie);
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  mobile = 1
  document.getElementById('sched').innerText = "Schedule (Click on a period for times)"
} else {
  mobile = 0
}

function fillLoop() {
  if (periodsA && periodsB) {
    fillTable();
  } else {
    setTimeout(() => {
      fillLoop()
    }, 100)
  }
}

fillLoop();