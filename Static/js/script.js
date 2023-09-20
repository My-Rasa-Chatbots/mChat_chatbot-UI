var root_chat_element = document.querySelector('#chatbot-element')

// Chat header
var chat_header_logo = document.createElement('img')
chat_header_logo.setAttribute('class','chat_header_logo')
chat_header_logo.src = 'static/img/marlabs_logo_png.png'

var chat_header_title = document.createElement('span')
chat_header_title.setAttribute('class','chat_header_title')
chat_header_title.innerText = 'mChat'

var chat_header_actions_restart = document.createElement('span')
chat_header_actions_restart.setAttribute('class','material-icons material-symbols-outlined')
chat_header_actions_restart.setAttribute('id', 'chat_header_actions_restart');
chat_header_actions_restart.title = 'Restart'
chat_header_actions_restart.innerText = 'autorenew'

var chat_header_actions_close = document.createElement('span')
chat_header_actions_close.setAttribute('class','material-icons material-symbols-outlined')
chat_header_actions_close.setAttribute('id', 'chat_header_actions_close');
chat_header_actions_close.title = 'Close'
chat_header_actions_close.innerText = 'close'

var chat_header_actions = document.createElement('span')
chat_header_actions.setAttribute('class','chat_header_actions')
chat_header_actions.appendChild(chat_header_actions_restart)
chat_header_actions.appendChild(chat_header_actions_close)

var chat_header = document.createElement('div')
chat_header.setAttribute('class','chat_header')
chat_header.appendChild(chat_header_logo)
chat_header.appendChild(chat_header_title)
chat_header.appendChild(chat_header_actions)

// Chat body
var chat_body = document.createElement('div')
chat_body.setAttribute('class','chat_body')
chat_body.setAttribute('id', 'chat_body')

// Chat footer
var chat_footer_input = document.createElement('textarea')
chat_footer_input.placeholder = 'Type your query here...'
chat_footer_input.setAttribute('id','chat_footer_input')
var chat_footer_sendButton = document.createElement('div')
chat_footer_sendButton.setAttribute('id', 'chat_footer_sendButton')
chat_footer_sendButton.innerHTML = `<span class="material-icons material-symbols-outlined">send</span>`

var chat_footer = document.createElement('div')
chat_footer.setAttribute('class','chat_footer')
chat_footer.appendChild(chat_footer_input)
chat_footer.appendChild(chat_footer_sendButton)

// Chat widget
var chat_widget = document.createElement('div')
chat_widget.setAttribute('class','chat_widget')
chat_widget.appendChild(chat_header)
chat_widget.appendChild(chat_footer)

// Chatbot start button
var chatbot_start_btn_img = document.createElement('img')
chatbot_start_btn_img.setAttribute('class', 'chatbot_start_btn_img')
chatbot_start_btn_img.src = 'static/img/botAvatar.jpg'

var chatbot_start_btn = document.createElement('div')
chatbot_start_btn.setAttribute('id', 'chatbot_start_btn')
chatbot_start_btn.appendChild(chatbot_start_btn_img)

// Chatbot pop prompt
// var 

// <!-- Bot pop-up intro -->
// <div class="show-prompt" id="show-prompt">
//   <div class="show-prompt-content">
//     <span class="hi">Hi there, 👋</span>
//     <p class="white-text">
//       I'm your smart chatbot to answer your queries. Click on bot icon to get started.
//     </p>
//   </div>
// </div>

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
        <textarea id="userInput" placeholder="Type your query here..." class="usrInput"></textarea>
        <div id="sendButton">
          <span class="material-icons material-symbols-outlined">send</span>
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

    if (!user_session) { // no previous session existed or no conversation exist
      // console.log("restarting...");
      restartConversation();
    } else { //session already there
      var user_conversations = JSON.parse(user_session).conversation
      if(!user_conversations.length){
        restartConversation()
      }
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




