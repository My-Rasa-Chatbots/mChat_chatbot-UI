/**
 * Convert JS Markdown to HTML
 */
const converter = new showdown.Converter()

// turn 
// know if its bot turn or user turn 
var turn = ''

/**
 * scroll to the bottom of the chats after new message has been added to chat
 */
function scrollToBottomOfResults() {
  const terminalResultsDiv = document.getElementById('chats')
  terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight
}

/**
 * Set user response on the chat screen
 * @param {String} message user message
 */
function setUserResponse(message) {
  const user_response = `<p class="userMsg">${message} </p><div class="clearfix"></div>`
  $(user_response).appendTo('.chats').hide().fadeIn(100)
  $('.usrInput').val('')
  showBotTyping()
  scrollToBottomOfResults()
  turn = 'user'
}

/**
 * returns formatted bot response
 * @param {String} text bot message response's text
 *
 */
function getBotResponse(text) {
    // console.log(turn);
  if (turn=='bot') {
    turn = 'bot'
    return `<span class="botMsg">${text}</span><div class="clearfix"></div>`
  }
  turn = 'bot'
  return `<img class="botAvatar" src="${botAvatar_img_src}"/><span class="botMsg first">${text}</span><div class="clearfix"></div>`
  
}

/**
 * renders bot response on to the chat screen
 * @param {Array} response json array containing different types of bot response
 */
function setBotResponse(response) {
  // renders bot response after 500 milliseconds
  hideBotTyping()

  if (response.length < 1) {
    // if there is no response from Rasa, send  fallback message to the user
    
    const BotResponse = getBotResponse(fallbackMsg)

    $(BotResponse).appendTo('.chats').hide().fadeIn(100)
    scrollToBottomOfResults()
  } else {
    // if we get response from Rasa
    // console.log("Responsess:: "+response[1].text)
    if (typeof response == 'string') {
    //   console.log('resppp:', response)
      const BotResponse = getBotResponse(response)
      $(BotResponse).appendTo('.chats').hide().fadeIn(100)
      scrollToBottomOfResults()
    }
    for (let i = 0; i < response.length; i += 1) {

      // check if the response contains "text"  
      if (Object.hasOwnProperty.call(response[i], 'text')) {
        if (response[i].text != null) {
          // convert the text to markdown format using showdown.js(https://github.com/showdownjs/showdown);
          // let botResponse
          // let html = response[i].text
          // html = html
          //   .replaceAll('<p>', '')
          //   .replaceAll('</p>', '')
          //   .replaceAll('<strong>', '<b>')
          //   .replaceAll('</strong>', '</b>')
          // html = html.replace(/(?:\\r\\n|\\r|\\n)/g, '<br>')
          // // console.log("html: "+html);
          // // check for blockquotes
          // if (html.includes('<blockquote>')) {
          //   html = html.replaceAll('<br>', '<br>')
          //   botResponse = getBotResponse(html)
          // }
          // // check for image
          // if (html.includes('<img')) {
          //   html = html.replaceAll('<img', '<img class="imgcard_mrkdwn" ')
          //   botResponse = getBotResponse(html)
          // }
          // // check for preformatted text
          // if (html.includes('<pre') || html.includes('<code>')) {
          //   botResponse = getBotResponse(html)
          // }
          // // check for list text
          // if (
          //   html.includes('<ul') ||
          //   html.includes('<ol') ||
          //   html.includes('<li') ||
          //   html.includes('<h3')
          // ) {
          //   html = html.replaceAll('<br>', '<br>')
          //   // botResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><span class="botMsg">${html}</span><div class="clearfix"></div>`;
          //   botResponse = getBotResponse(html)
          // } else {
          //   // if no markdown formatting found, render the text as it is.
          //   if (!botResponse) {
          //     style =
          //       i + 1 == response.length
          //         ? `<img class="botAvatar" src="${botAvatar_img_src}"/>`
          //         : ''
          //     botResponse = getBotResponse(response[i].text)//`${style}<p class="botMsg">${response[i].text}</p><div class="clearfix"></div>`
          //   }
          // }
          // append the bot response on to the chat screen
          const botResponse = getBotResponse(response[i].text)
          $(botResponse).appendTo('.chats').hide().fadeIn(100)
        }
      }

      // check if the response contains "images"
      if (Object.hasOwnProperty.call(response[i], 'image')) {
        if (response[i].image !== null) {
          const BotResponse = `<div class="singleCard"><img class="imgcard" src="${response[i].image}"></div><div class="clearfix">`
          $(BotResponse).appendTo('.chats').hide().fadeIn(100)
        }
      }

      // check if the response contains "buttons"
      if (Object.hasOwnProperty.call(response[i], 'buttons')) {
        // console.log("bs:"+response[i].buttons)
        if (response[i].buttons.length > 0) {
          // console.log("tp:"+response[i].buttons)
          addSuggestion(response[i].buttons)
        }
      }

      // check if the response contains "attachment"
      if (Object.hasOwnProperty.call(response[i], 'attachment')) {
        if (response[i].attachment != null) {
          if (response[i].attachment.type === 'video') {
            // check if the attachment type is "video"
            const video_url = response[i].attachment.payload.src

            const BotResponse = `<div class="video-container"> <iframe src="${video_url}" frameborder="0" allowfullscreen></iframe> </div>`
            $(BotResponse).appendTo('.chats').hide().fadeIn(100)
          }
        }
      }
      // check if the response contains "custom" message
      if (Object.hasOwnProperty.call(response[i], 'custom')) {
        custom_message = response[i].custom
        for (key in custom_message) {
        //   console.log("type:"+custom_message[key])
          scrollToBottomOfResults()
        }
      }
    }
  }
  $('.usrInput').focus()
  scrollToBottomOfResults()
  // showForm()
}

/**
 * sends the user message to the rasa server,
 * @param {String} message user message
 */
function send(message) {
  $.ajax({
    url: rasa_server_API,
    type: 'POST',
    contentType: 'application/json',
    // headers:
    data: JSON.stringify({ message, sender: sender_id }),
    success(botResponse, status) {
      console.log('User message: ', message)
      console.log('Response from Rasa: ', botResponse, '\nStatus: ', status)

      // if user wants to restart the chat and clear the existing chat contents
      if (message.toLowerCase() === '/restart') {
        restartConversation()
        return
      }
      // render responses on chat window
      setBotResponse(botResponse)

      // store conersations to local storage
      // as user
      storeConversation(message, 'user', sender_id)
      // as bot
      storeConversation(botResponse, 'bot', sender_id)
    },
    error(xhr, textStatus) {
      if (message.toLowerCase() === '/restart') {
        // console.log("error while restarting");
      }
      // if there is no response from rasa server, set error bot response
      setBotResponse('')
      // storeConversation(fallbackMsg, 'bot', sender_id)
      console.log('Error from bot end: ', textStatus, '\nMessage: ', message)
    },
  })
}

/**
 * send custom intent to server with '/'
 * @param {String} intent intent name
 */
function customActionTrigger(intent) {
  showBotTyping()
  send(intent)
}

/**
 * clears the conversation from the chat screen
 * & sends the `/resart` event to the Rasa server
 */
function restartConversation() {
  $('#userInput').prop('disabled', true)
  // destroy the existing chart
  $('.collapsible').remove()

  $('.chats').html('')
  $('.usrInput').val('')
  // remove and set new sender_id in localStorage
  localStorage.removeItem('sender_id')
  // set sender_id and clear and start new chat session storage
  setChatClient()

  $('#userInput').prop('disabled', false)
  turn='user'
  customActionTrigger('/greet')
  $('.chats').fadeIn()
}

/**
 * restart button clicked
 **/
$('#restart').click(() => {
  send('/restart')
})

/**
 * send message to send() function
 * @param {String} text user message
 */
function sendUserMessage(text) {
  setUserResponse(text)
  send(text)
}

/**
 * if user hits enter or send button
 * */
$('.usrInput').on('keyup keypress', (e) => {
  const keyCode = e.keyCode || e.which

  const text = $('.usrInput').val()
  if (keyCode === 13) {
    if (text === '' || $.trim(text) === '') {
      e.preventDefault()
      return false
    }
    sendUserMessage(text)
    e.preventDefault()
    return false
  }
  return true
})

$('#sendButton').on('click', (e) => {
  const text = $('.usrInput').val()
  if (text === '' || $.trim(text) === '') {
    e.preventDefault()
    return false
  }
  sendUserMessage(text)
  e.preventDefault()
  return false
})
