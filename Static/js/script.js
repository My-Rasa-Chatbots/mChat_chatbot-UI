var root_chat_element = document.querySelector('#chatbot-element')
root_chat_element.innerHTML = `
    <div class="widget">
      <div class="chat_header">
        <!--Add the name of the bot here -->
        <img class="titleProfile" src="static/img/marlabs_logo_png.png" />
        <span class="chat_header_title">mChat</span>
        <span class="header_icons">
          <span id="restart" class="material-icons material-symbols-outlined" title="Restart">autorenew</span>
          <span id="close" class="material-icons material-symbols-outlined" title="Close">close</span>
        </span>
      </div>

      <!--Chatbot contents goes here -->
      <div class="chats" id="chats">
        <div class="clearfix"></div>
      </div>

      <!--keypad for user to type the message -->
      <div class="keypad">
        <img class="botAvatar" style="transform: scale(1.5); margin: 5px;" src="static/img/userAvatar.jpg" />
        <textarea id="userInput" placeholder="Type your query here..." class="usrInput"></textarea>
        <div id="sendButton">
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    
    <!--bot profile-->
    <div class="profile_div" id="profile_div">
      <img class="imgProfile" src="static/img/botAvatar.jpg" />
    </div>
  
    <!-- Bot pop-up intro -->
    <div class="show-prompt" id="show-prompt">
      <div class="show-prompt-content">
        <span class="hi">Hi there, 👋</span>
        <p class="white-text">
          I'm your smart chatbot to answer your queries. Click on bot icon to get started.
        </p>
      </div>
    </div>
`



/* module for importing other js files */
function include(file) {
  const script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);
}


// Bot pop-up intro
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelector(".show-prompt").style.visibility = "hidden";
  }, 5000);
});

/* import components */
include('./static/js/constants.js');
include('./static/js/components/index.js');

window.addEventListener('load', () => {
  // initialization

  $(document).ready(() => {

    // store sender_id in localStorage
    var user_session = localStorage.getItem("user_session")
    if (!user_session) { // no previous session existed
      restartConversation();
    } else { //session already there
      sender_id = JSON.parse(user_session).sender_id
      loadPreviousChats()
    }
  });

  // Toggle the chatbot screen
  $("#profile_div").click(() => {
    document.querySelector(".show-prompt").style.visibility = "hidden";
    $(".widget").toggle(function () { $(this).animate({}, 100); });
    scrollToBottomOfResults();
  });

  // close function to close the widget.
  $("#close").click(() => {
    // $(".profile_div").toggle();
    $(".widget").toggle(function () { $(this).animate({}, 100); });
    $(".chats").fadeIn();
  });
});

// close chat window if clicked outside chat window
$(document).mouseup(function (e) {
  if (e.target.tagName == "BODY" && $('.widget').is(':visible')) {
    $(".widget").toggle(function () { $(this).animate({}, 100); });
  }
});




