function isStringPalindrome(str) {
    var listOfChars = str.split("");
    var reversedListOfChar = listOfChars.reverse();
    var reversedString = reversedListOfChar.join("");
    if(str === reversedString){
        return true;
    }
    else
    {
        return false;
    }
}

function getDateAsString(date) {
  var dateInStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateInStr.day = "0" + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = "0" + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return dateInStr;
}

function getDateInAllFormats(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
  var dateFormatList = getDateInAllFormats(date);
  var palindromeList = [];

  for (var i = 0; i < dateFormatList.length; i++) {
    var result = isStringPalindrome(dateFormatList[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

function getNextDate(date) {
  //console.log(new Date(date.year, date.month-1, date.day+1));
  var nextDate= new Date(date.year, date.month, date.day+1);
  
  return {
    day: nextDate.getDate(),
    month: nextDate.getMonth(),
    year: nextDate.getFullYear(),
  };
}

function getNextPalindromeDate(date) {
    debugger;
  var nextDate = getNextDate(date);
  var counter = 0;

  while (1) {
    counter+=1;
    var dateStr = getDateAsString(nextDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [counter, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPrevDate(date)
{   
    var prevDate= new Date(date.year, date.month, date.day-1);     
    return {
        day: prevDate.getDate(),
        month: prevDate.getMonth(),
        year: prevDate.getFullYear(),
    };     
}


function getPreviousPalindromeDate(date) {
    debugger;
  var previousDate = getPrevDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = getDateAsString(previousDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, previousDate];
      }
    }
    previousDate = getPrevDate(previousDate);
  }
}

function clickEventHandler(e) 
{
    debugger;
    var bdayValue = document.getElementById("birthdateId").value;
    var retResult = document.getElementById("resultId");

    if (bdayValue !== "") 
    {
        var date = bdayValue.split("-");
        var yyyy = date[0];
        var mm = date[1];
        var dd = date[2];

        var date = {
            day: parseInt(dd),
            month: parseInt(mm),
            year: parseInt(yyyy),
        };

        var dateStr = getDateAsString(date);
        var list = checkPalindromeForAllDateFormats(dateStr);
        var isPalindrome = false;

        for (let i = 0; i < list.length; i++) {
            if (list[i]) {
            isPalindrome = true;
            break;
            }
        }

        if (!isPalindrome) {
            const [ctr1, nextDate] = getNextPalindromeDate(date);
            const [ctr2, prevDate] = getPreviousPalindromeDate(date);

            if (ctr1 > ctr2) {
                retResult.innerText = "The next palindrome date is " + prevDate.day + "-" + prevDate.month + "-" + prevDate.year + ", you missed by " + ctr2 + " days.";
            } 
            else
            {
                retResult.innerText ="The previous palindrome date is " + nextDate.day + "-" + nextDate.month + "-" + nextDate.year + ", you missed by " + ctr1 + " days.";
            }
        } 
        else
        { 
            retResult.innerText = "Yay! Your birthday is palindrome!";
        }
    }
    else
    {
        alert("Please enter value to proceed");
    }
}