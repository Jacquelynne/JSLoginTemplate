//Declaring intial variables
let divReg, divMain;
let scrolling = true;

//When DOM is loaded, runs following function:
document.addEventListener('DOMContentLoaded', function() {
    //Loads two div elements into variables
    divReg = document.getElementById('divRegistered');
    divMain = document.getElementById('divMain');
    //Calls funciton when elements are clicked or lose focus
    divMain.addEventListener('focus', function(event) {fHandleEnter(event);}, true);
    divMain.addEventListener('blur', function(event) {fHandleExit (event);}, true);
    //Declares a new array and sets input elements into it 
    let inputElements;
    inputElements = document.querySelectorAll('#frmRegister input[type="text"],[type="password"]');
    //Declares a new array and sets all span elements into it
    let spanElements;
    spanElements = document.querySelectorAll('span');
    //For testing, logs each element into the console
    $.each(spanElements, function(index, element) {console.log(element.id)});
    //Checks password element for appropriate parameters upon input
    inputElements[1].oninput= fPasswordCheck;
    /*When second password input loses focus, passes applicable inputs and alert span into the comparing function */
    inputElements[2].addEventListener('blur', function(){
        fCompareinput(inputElements[1].value, inputElements[2].value, spanElements[3]);
    });
    /*When second email input loses focus, passes applicable inputs and alert span into comparing function */
    inputElements[4].addEventListener('blur', function(){
        fCompareinput(inputElements[3].value, inputElements[4].value, spanElements[5]);
    });
    /* jQuery event that slowly hides the text scroll element when loses focus */
    $('#txtPassword').focusout(function() {
        $('#txtScroll').fadeOut(2500);});
    /*jQuery event that calls and fades in the text scroll element when user clicks into password input */
    $('#txtPassword').focusin(function() {
        fStartScrolling();
        $('#spnPasswordComplexity').fadeIn(2000);});
    /*jQuery event- when password input loses focus, calls the function to stop text scrolling by passing a variable, and fades out span password commentary */
    $('#txtPassword').focusout(function() {
        fStopScroll(true);
        $('#spnPasswordComplexity').fadeOut(2500);
    });
    //Imediately calls the function upon loading
    fProcessForm();
});

function fHandleEnter(e) {
    /* Sets whatever event object was passed into function to have a yellow background */
    e.target.style.backgroundColor = 'yellow';
}

function fHandleExit(e) {
     /* Sets whatever event was passed into function to remove yellow background */
    e.target.style.backgroundColor = '';
}

function fProcessForm() {
    //Declares a variable and sets html address into it
    let strQueryString = location.search;
    /* Uses a RegEx to update the variable to only contain the searched element, in this case, the login input */
    strQueryString = strQueryString.replace(/^.+=/, '');
    // Gets the below divs and sets them in vairables
    divReg = document.getElementById('divRegistered');
    divMain = document.getElementById('divMain');
    /* Decides which div element is displayed based on whether there is input in the login feild or not */
    if (strQueryString.length != 0) {
        // New variable with strQueryString input
        let login = strQueryString;
        //Puts message with user's login into div's innerHTML
        divReg.innerHTML = 'Thank you, ' + login + ', you are now registered.' + '<img id="happyface" height="40" src="smiles.png" alt="Thank you!">';
        //Hides divMain
        divMain.style.display = 'none';
        //Fades in divReg over 2 sec
        $(divReg).fadeIn(2000);
        //Drops and expands image in two seconds
        $("img").fadeOut().show(2000);
    } else {
        /*If there's no input (strQueryString is empty), hides divReg and keeps divMain displayed. */
        divReg.style.display = 'none';
        divMain.style.display = 'block';
    }
}


function fCompareinput(value1, value2, display) {
    // If no input within the "confirm" input, sets/keeps elements empty
    if  (value2.length === 0) {
        display.innerHTML = '';
        display.style = '';
    /* If both inputs match exactly, displays a message in the span element next to the second input with a green background. */
    } else if (value1 === value2) {
        display.innerHTML = 'Entries match';
        display.style.backgroundColor = 'green';
    /* If inputs do not match, displays a message in the span element next to the second input with a red background. */
    }  else {
        display.innerHTML = 'Entries do not match';
        display.style.backgroundColor = 'red';
}
}

/* Checks for length, capital letter, number, and special symbol. Updates span accordingly */
function fPasswordCheck(){
    //Declares and sets new variables with span and input elements
    let param, scroll, text;
    param = document.getElementById('spnPasswordComplexity');
    text = document.getElementById('txtPassword');
    scroll = document.getElementById('txtScroll');
    /* If input is less than 6, clear param span element and set background to red */
    if (text.value.length < 6) {
        text.style.backgroundColor = 'red';
        param.innerHTML = '';
    /* If input is 6-20 characters, tests for certain characters by comparing with RegEx variables, then changes the background color and span commentary accordingly */
    } else if (text.value.length >= 6 && text.value.length <= 20){
        /* Strongest password cirteria. A variable with a RegEx containing a special character, capital letter, lowercase letter, and number */
        let strongRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
        /* Good password criteria. A variable with a RegEx checking for a capital letter, lowercase letter, and number, but no special character */
        let betterRegex = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/g);
        /* Medium criteria. A variable with a RegEx checking for either a lower case and capital letter only, or lower case letter and number, or uppercase letter and number */
        let mediumRegex = new RegExp (/[a-z]+[A-Z]+|[a-z]+[0-9]+|[A-Z]+[0-9]+/g);
        /* Weak criteria. Containing only capital letters, lower case letters, or numbers. */
        let poorRegex = new RegExp(/[a-z]|[0-9]|[A-Z]/);
        //If input equals the strongRegEx variable
        if (strongRegex.test(text.value)) {
            //Displays below message in span element above input
            param.innerHTML = '<b>Strong password. Nice work, Master-Jedi.</b>';
            //Hides the span text scroll
            scroll.style.display = 'none';
            //Sets background color to green
            text.style.backgroundColor = 'green'; 
        // If input matches betterRegex
        } else if (betterRegex.test(text.value)) {
            //Displays below message in span element above input
            param.innerHTML = 'Better password. Very good, padawan.';
            //Sets background color to dark green
            text.style.backgroundColor = 'darkgreen';
        // If input matches mediumRegex
        } else if (mediumRegex.test(text.value)) {
            //Displays below message in span element above input
            param.innerHTML = 'Mild password. Not bad, apprentice.'; 
            //Sets background color to dark orange
            text.style.backgroundColor = 'darkorange';   
        //If input matches poorRegex
        } else if (poorRegex.test(text.value)) {
            //Displays below message in span element above input
            param.innerHTML = 'Weak password. Do you work for the <i>dark side?</i>';
            //Sets background color to orange
            text.style.backgroundColor = 'orange';
         }
    } else if (text.value.length >=20) {
        //Displays below message in span element above input
        param.innerHTML = 'Must be: <b>6-20</b> characters';
        //Sets background color to red
        text.style.backgroundColor = 'red';
        //jQuery event that causes the above span element to flash
        $(param).fadeIn().fadeOut().fadeIn(); 
    } else { 
        //If input is empty, continue text scroll
        scrolling = true;
        //Fades out any message previously displayed above
        $(param).fadeout(3000);
        //Clears message
        param.innerHTML = '';''
        //Sets background to clear
        text.style.backgroundColor= '';
    } 
}

function fStartScrolling() {
    //Declares variables
    let len, msg, pos, pad, pwScroll, scroll; 
    //Sets scrolling to be true
    scrolling = true;
    //Message
    msg = 'Must be 6-20 characters. Try to have: a capital letter (A-Z), number (0-9), and special character (@#$%, etc).';
    //Desired ticker length
    len = 37; 
    pos = 0;
    //Takes characters in msg and replaces with a blank space
    pad = msg.replace(/./g,' ');
    //Cuts the length of the pad var to the length of the ticker space
    pad= pad.slice(0,len);
    //Combines the blank space with the text message
    pwScroll = pad.concat(msg);
    //Assigns txtScroll element into var
    scroll = document.getElementById('txtScroll');
    //Sets display CSS value
    scroll.style.display = 'inline';
    /*Internal function that uses the above variables to create the scolling effect */
    function fScrollText() {
        /*New var that adjusts pwScroll to begin at position pos with set length*/
        curMsg = pwScroll.substr(pos++, len);
        //Inserts the message into the span element
        scroll.innerHTML = curMsg;
        /*Checks when the function has iterated through the whole pwScroll text */
        if (curMsg.toString().length == 0) {
            //Resets starting point
                pos = 0;
        }
        //If variable is true, runs function every second
        if (scrolling) {
            setTimeout(fScrollText, 100);
       }
    }
    //Starts the function
    fScrollText();
}

/* How to exit out of the scrolling funciton so it's not always running in the background */
function fStopScroll(stop) {
    //If variable passed is true
    if (stop) {
    /* Sets scrolling to false. Scrolling is the conditional variable to keep fScrollText running */
       scrolling = false; 
    }
}
