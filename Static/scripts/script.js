// Global Variable Initialization
const static_file_url = staticServerUrl

const rasa_server_API = rasaServerUrl

const fallback_message = 'Something went wrong, please try again later.'

const marlabs_logo_path = `${static_file_url}/img/marlabs_logo_png.png`
const restart_icon_path = `${static_file_url}/icons/icons8-reset.png`
const close_icon_path = `${static_file_url}/icons/icons8-minimize.png`
const send_icon_path = `${static_file_url}/icons/icons8-send.png`
const chatbot_icon_path = `${static_file_url}/icons/icons8-chatbot.png`

// ////////////////////////////////////////////////////
// mounting Header and Body Stylesheet and Scripts
const doc_head = document.querySelector('head')
const doc_body = document.querySelector('body')

const google_font_preconnect = document.createElement('link')
google_font_preconnect.href = 'https://fonts.gstatic.com'
google_font_preconnect.rel = 'preconnect'

const google_font = document.createElement('link')
google_font.href =
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap'
google_font.rel = 'stylesheet'

const custom_style = document.createElement('link')
custom_style.href = `${static_file_url}/styles/style.css`
custom_style.rel = 'stylesheet'

doc_head.appendChild(google_font_preconnect)
doc_head.appendChild(google_font)
doc_head.appendChild(custom_style)

const uuid_lib = document.createElement('script')
uuid_lib.type = 'text/javascript'
uuid_lib.src = `${static_file_url}/lib/uuid.min.js`

doc_body.appendChild(uuid_lib)

var messages = '';
var message_input = '';
var chatbot_send_button = '';
var sender_id = '';
var bot_typing = false;
var chat_started = false;

// var lastMessageType = '';

// var bot_icon_element = document.createElement('img')
// bot_icon_element.setAttribute('class', 'bot_icon')
// bot_icon_element.src = './icons/icons8-bot-32.png'

function mountHTML() {
  /** chatbot popup intro */
  const chatbot_popup_el = document.createElement('div')
  chatbot_popup_el.setAttribute('id', 'chatbot-popup')
  chatbot_popup_el.style.display = 'block'
  const chatbot_popup_hi_el = document.createElement('span')
  chatbot_popup_hi_el.setAttribute('id', 'chatbot-popup_hi')
  chatbot_popup_hi_el.innerText = 'Hi there, 👋'
  const chatbot_popup_instruction_el = document.createElement('p')
  chatbot_popup_instruction_el.setAttribute('id', 'chatbot-popup-instruction')
  chatbot_popup_instruction_el.innerText =
    "I'm your smart chatbot to answer your queries. Click on bot icon to get started."
  chatbot_popup_el.appendChild(chatbot_popup_hi_el)
  chatbot_popup_el.appendChild(chatbot_popup_instruction_el)

  /** chatbot body */
  const chatbot_header_logo_el = document.createElement('img')
  chatbot_header_logo_el.setAttribute('id', 'chatbot-header-logo')
  chatbot_header_logo_el.src = marlabs_logo_path

  const chatbot_header_title_el = document.createElement('span')
  chatbot_header_title_el.setAttribute('id', 'chatbot-header-title')
  chatbot_header_title_el.innerText = 'mChat'

  const chatbot_header_actions_el = document.createElement('span')
  chatbot_header_actions_el.setAttribute('id', 'chatbot-header-actions')
  const chatbot_header_actions_restart_el = document.createElement('img')
  chatbot_header_actions_restart_el.setAttribute('id', 'chatbot-restart')
  chatbot_header_actions_restart_el.src = restart_icon_path
  chatbot_header_actions_restart_el.alt = 'Restart'
  const chatbot_header_actions_close_el = document.createElement('img')
  chatbot_header_actions_close_el.setAttribute('id', 'chatbot-close')
  chatbot_header_actions_close_el.src = close_icon_path
  chatbot_header_actions_close_el.alt = 'Close'
  chatbot_header_actions_el.appendChild(chatbot_header_actions_restart_el)
  chatbot_header_actions_el.appendChild(chatbot_header_actions_close_el)

  const chatbot_header_el = document.createElement('div')
  chatbot_header_el.setAttribute('id', 'chatbot-header')
  chatbot_header_el.appendChild(chatbot_header_logo_el)
  chatbot_header_el.appendChild(chatbot_header_title_el)
  chatbot_header_el.appendChild(chatbot_header_actions_el)

  const chatbot_messages_el = document.createElement('div')
  chatbot_messages_el.setAttribute('id', 'chatbot-messages')

  const chatbot_body_el = document.createElement('div')
  chatbot_body_el.setAttribute('id', 'chatbot-body')
  chatbot_body_el.appendChild(chatbot_header_el)
  chatbot_body_el.appendChild(chatbot_messages_el)

  /** chatbot footer */
  const chatbot_user_input_el = document.createElement('input')
  chatbot_user_input_el.setAttribute('id', 'chatbot-user-input')
  chatbot_user_input_el.placeholder = 'Type your query here...'
  chatbot_user_input_el.autocomplete = 'off'

  const chatbot_send_button_el = document.createElement('id')
  chatbot_send_button_el.setAttribute('id', 'chatbot-send-button')
  const chatbot_send_button_img_el = document.createElement('img')
  chatbot_send_button_img_el.src = send_icon_path
  chatbot_send_button_img_el.alt = 'Send'
  chatbot_send_button_el.appendChild(chatbot_send_button_img_el)

  const chatbot_footer_el = document.createElement('div')
  chatbot_footer_el.setAttribute('id', 'chatbot-footer')
  chatbot_footer_el.setAttribute('class', 'open')
  chatbot_footer_el.appendChild(chatbot_user_input_el)
  chatbot_footer_el.appendChild(chatbot_send_button_el)

  /** chatbot widget */
  const chatbot_widget_el = document.createElement('div')
  chatbot_widget_el.setAttribute('id', 'chatbot-widget')
  chatbot_widget_el.style.display = 'none'
  // chatbot_widget_el.appendChild(chatbot_popup_el)
  chatbot_widget_el.appendChild(chatbot_body_el)
  chatbot_widget_el.appendChild(chatbot_footer_el)

  /** chatbot toggle icon */
  const chatbot_toggle_el = document.createElement('div')
  chatbot_toggle_el.setAttribute('id', 'chatbot-toggle')
  const chatbot_toggle_img_el = document.createElement('img')
  chatbot_toggle_img_el.setAttribute('id', 'chatbot-toggle-img')
  chatbot_toggle_img_el.src = chatbot_icon_path
  chatbot_toggle_el.appendChild(chatbot_toggle_img_el)

  /** chatbot root element */
  const chatbot_root_el = document.createElement('div')
  chatbot_root_el.setAttribute('id', 'chatbot-root')
  chatbot_root_el.appendChild(chatbot_popup_el)
  chatbot_root_el.appendChild(chatbot_widget_el)
  chatbot_root_el.appendChild(chatbot_toggle_el)

  /** website body */
  doc_body.appendChild(chatbot_root_el)
}

// scroll to bottom of the chat window
function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight
  message_input.focus()
}

/**
 * Start new session with new sender_id
 * @returns sender_id
 */
function newSession() {
  sender_id = uuidv4() //(Math.random() + 1).toString(36).substring(7);
  ChatbotLog('new session: ', sender_id)
  sessionStorage.setItem("sender_id", sender_id)
  return sender_id
}

/**
 *  add new text message to the chat
 * @param {String} message_text message_text string text
 */
function appendMessageText(message_text, type) {
  message_text = message_text.replaceAll(/(?:\\r\\n|\\r|\\n)/g, '<br>')

  const item = document.createElement('p')
  item.classList.add('chat-message')
  item.classList.add(`chat-message_${type}`)
  item.setHTML(message_text)

  messages.appendChild(item)
  const lineBreak = document.createElement('div')
  lineBreak.classList.add('line_break')
  messages.appendChild(lineBreak)
}

/**
 * implement different kind of buttons with different elements/events
 * @param {String} button_title
 * @param {String} button_value
 * @param {String} button_type url/payload
 * @returns
 */
function getResponseButton(button_title, button_value, button_type) {
  if (button_type === 'payload') {
    const responseButtonPayload = document.createElement('div')
    responseButtonPayload.setAttribute(
      'class',
      'response-button response-button_payload'
    )
    responseButtonPayload.innerText = button_title
    responseButtonPayload.setAttribute('data-payload', button_value)
    responseButtonPayload.addEventListener('click', () => {
      sendMessage(button_title)
    })
    return responseButtonPayload
  } else if (button_type === 'url') {
    const responseButtonUrl = document.createElement('a')
    responseButtonUrl.setAttribute(
      'class',
      'response-button response-button_url'
    )
    responseButtonUrl.innerText = button_title
    responseButtonUrl.href = button_value
    responseButtonUrl.target = '_blank'
    responseButtonUrl.rel = 'noopener noreferrer'
    return responseButtonUrl
  }
}

/**
 *  add new buttons to the chat
 * @param {Array} buttons buttons json array
 */
function appendMessageButtons(buttons) {
  if (buttons.length > 0) {
    const buttons_group = document.createElement('div')
    buttons_group.setAttribute('class', 'buttons-group')
    buttons.forEach((button) => {
      const button_type = Object.hasOwnProperty.call(button, 'payload')
        ? 'payload'
        : 'url'
      const response_button =
        button_type === 'payload'
          ? getResponseButton(button.title, button.payload, button_type)
          : getResponseButton(button.title, button.url, button_type)

      buttons_group.appendChild(response_button)
    })
    messages.appendChild(buttons_group)
    scrollToBottom()
  }
}

/**
 *
 * @param {url} image_url
 */
function appendMessageImage(image_url) {
  // TODO
}

/**
 *
 * @param {url} attachment_url
 */
function appendMessageAttachments(attachment_url) {
  // TODO
}

/**
 * // parse bot json responses into appropriate HTML element
 * @param {Array} responses
 */
function parseResponse(responses) {
  responses.forEach((response) => {
    if (Object.hasOwnProperty.call(response, 'text')) {
      appendMessageText(response.text, 'received')
    } else if (Object.hasOwnProperty.call(response, 'buttons')) {
      appendMessageButtons(response.buttons)
    } else if (Object.hasOwnProperty.call(response, 'image')) {
      appendMessageImage(response.image)
    } else if (Object.hasOwnProperty.call(response, 'attachment')) {
      appendMessageAttachments(response.attachment)
    } else if (response.quick_replies) {
      appendQuickReplies(response.quick_replies)
    }
    scrollToBottom()
  })
}

/**
 * fetch response from rasa server api
 * @param {String} rasa_api
 * @param {String} message
 * @param {String} sender_id
 */
function fetchSrverResponse(rasa_api, message, sender_id) {
  $.ajax({
    url: rasa_api,
    type: 'POST',
    contentType: 'application/json',
    // headers:
    data: JSON.stringify({ message: message, sender: sender_id }),
    success(botResponses, status) {
      if (message != '/restart') {
        hideBotTyping()
      }
      parseResponse(botResponses)
      ChatbotLog('User message: ', message)
      ChatbotLog('Response from Rasa: ', botResponses)
    },
    error(xhr, textStatus) {
      // if there is no response from rasa server, set error bot response
      hideBotTyping()
      appendMessageText(fallback_message, 'received_error')
      ChatbotLog('Error from bot end: ', textStatus, xhr)
    },
  })
}

/**
 * send user message to bot
 * @param {String} message
 */
function sendMessage(message) {
  ChatbotLog('sending message to server...')
  appendMessageText(message, 'sent')
  message_input.value = ''
  if (message && sender_id) {
    showBotTyping()
    fetchSrverResponse(rasa_server_API, message, sender_id)
  }
}

// typing effect
//removes the bot typing indicator from the chat screen
function hideBotTyping() {
  bot_typing = false
  if (document.querySelector('.botTyping')) {
    document.querySelector('.botTyping').remove()
  }
  chatbot_send_button.removeAttribute('disabled')
  scrollToBottom()
}

//  adds the bot typing indicator from the chat screen
function showBotTyping() {
  bot_typing = true
  // const botTypin = `<div class="botTyping message message_received bot_icon"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>`
  const botTyping = document.createElement('div')
  botTyping.setAttribute(
    'class',
    'botTyping chat-message chat-message_received'
  )
  botTyping.setHTML(
    '<div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div>'
  )
  document.getElementById('chatbot-messages').appendChild(botTyping)
  document.querySelector('.botTyping').style.display = 'block'
  chatbot_send_button.setAttribute('disabled', true)
  scrollToBottom()
}

// toggle chat window
function chatbotWindow(actionType) {
  document.querySelector('#chatbot-popup').style.display = 'none'
  var chatbot_widget = document.getElementById('chatbot-widget')
  if (actionType === 'open') {
    chatbot_widget.style.display = 'block'
  } else if (actionType === 'close') {
    chatbot_widget.style.display = 'none'
  } else {
    if (chatbot_widget.style.display === 'block') {
      chatbot_widget.style.display = 'none'
    } else {
      chatbot_widget.style.display = 'block'
    }
  }
}

// toggle chatbot popup intro
function chatbotPopupIntro() {
  setTimeout(() => {
    document.querySelector('#chatbot-popup').style.display = 'none'
  }, 8000)
}

/**
 * restart conversation or restart session
 * @param {String} rasa_server_API
 * @param {String} sender_id
 */
function restartConversation(rasa_server_API) {
  ChatbotLog('restarting...')
  messages.setHTML('')
  // const sender_id = newSession()
  fetchSrverResponse(rasa_server_API, '/restart', sender_id)
  startConversation(rasa_server_API, sender_id)
}

/**
 * start conversation with greet/welcome messsage
 * @param {String} rasa_server_API
 * @param {String} sender_id
 */
function startConversation(rasa_server_API, sender_id) {
  showBotTyping()
  fetchSrverResponse(rasa_server_API, '/greet', sender_id)
}

window.addEventListener('DOMContentLoaded', () => {
  // initialization
  window.addEventListener('load', () => {
    // mount all HTML elements
    mountHTML()

    messages = document.getElementById('chatbot-messages')
    message_input = document.getElementById('chatbot-user-input')
    chatbot_send_button = document.querySelector('#chatbot-send-button')

    // session check and renew
    ChatbotLog('chatbot started..')

    var my_sender_id = sessionStorage.getItem("sender_id")
    if (!my_sender_id) {
      sender_id = newSession()
    } else {
      sender_id = my_sender_id
    }

    // chat popup intro start
    onload = (event) => {
      chatbotPopupIntro()
    }

    // submit query with send button
    chatbot_send_button.addEventListener('click', (e) => {
      e.preventDefault()
      const text = message_input.value
      if (text.trim() !== '' & !bot_typing) {
        sendMessage(text)
      }
    })

    // submit query with enter
    message_input.addEventListener('keyup', (e) => {
      e.preventDefault()

      const key = e.key || e.keyCode
      const text = message_input.value
      if (key === 'enter' || key === 'Enter') {
        if (text.trim() !== '' & !bot_typing) {
          sendMessage(text)
        }
      }
    })

    // click on bot profile icon
    document.querySelector('#chatbot-toggle').addEventListener('click', () => {
      if(chat_started == false){
        // start new conversation with greeting
        startConversation(rasa_server_API, sender_id)
        chat_started = true
      }
      chatbotWindow()
    })

    // click on user input area
    message_input.addEventListener('click', () => {
      chatbotWindow('open')
    })

    // close function to close the widget.
    document.querySelector('#chatbot-close').addEventListener('click', () => {
      chatbotWindow()
    })

    // triggers restartConversation function.
    document.querySelector('#chatbot-restart').addEventListener('click', () => {
      restartConversation(rasa_server_API)
    })
  })
})
