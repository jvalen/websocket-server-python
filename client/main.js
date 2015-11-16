var socket = null;
var isopen = false;

window.onload = function() {
  //Create webSocket
  socket = new WebSocket("ws://127.0.0.1:9000");

  //Connection methods
  socket.onopen = function() {
     isopen = true;
     prependToList('Connected!', 'connection');
  }
  socket.onmessage = function(e) {
     if (typeof e.data == "string") {
        prependToList('[Server]: ' + e.data, 'server');
     }
  }
  socket.onclose = function(e) {
     socket = null;
     isopen = false;
    prependToList('Connection closed!', 'connection');
  }
};
        
//Send message
function send() {
   event.preventDefault();
   if (isopen) {
      var inputText = document.querySelector('input[type="text"]'),  
          message = inputText.value;
      socket.send(message);
      prependToList('[Client]: ' + message, 'client');
     inputText.value = '';
   } else {
      prependToList('Connection not opened', 'connection');
   }
};

//Helper
function prependToList(text, className) {
 var ul = document.querySelector('ul'),
     li = document.createElement('li');

 if (ul.childNodes.length > 20) {
   //Remove last child
   ul.removeChild(ul.childNodes[ul.childNodes.length - 1]);
 } 

 li.appendChild(document.createTextNode(text));
 li.setAttribute('class', className);
 ul.insertBefore(li, ul.firstChild);
}