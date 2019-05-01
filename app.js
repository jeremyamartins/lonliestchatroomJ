const input   = document.querySelector('input')
const form    = document.querySelector('form')
const button  = document.querySelector('button')
const chatbox = document.querySelector('#chatbox')
let   id      = 0

form.addEventListener('submit', handleSubmit)
button.addEventListener('click', getChuckNorrisJoke)

function handleSubmit(event){
  event.preventDefault()
  const sender = ['Me', 'Myself', 'I'][Math.floor(Math.random() * 3)]
  createMessage(sender, input.value)
  form.reset()
}

function getChuckNorrisJoke(){
  fetch('https://api.icndb.com/jokes/random?limitTo=[nerdy]')
    .then(response => response.json())
    .then(json => createMessage('Fact', json.value.joke))
}

function createMessage(sender, messageText){
  if (!messageText.length) return
  id ++
  const timestamp   = (new Date()).toLocaleTimeString()
  const message     = `<div class='message' id='${id}'>
                        <span>${timestamp}</span>
                        <span class="sender">${sender}:</span>
                        <span>${messageText}</span>
                        <span class="delete" onclick='deleteMessage(${id})'>❌</span>
                      </div>`
  chatbox.innerHTML += message
  chatbox.scrollTop = chatbox.scrollHeight
}

function deleteMessage(id){
  if(confirm('Are you sure?')){
    const message = document.getElementById(id)
    message.remove()
  }
}
