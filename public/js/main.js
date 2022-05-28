const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const chatMessagess = document.querySelector(".chat-sidebar");

// get username qnd room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// join chat
socket.emit("join_room", { username, room }, outputRoom(room, username));

// message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message submit
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // takes the message by id
  const msg = event.target.elements.msg.value;

  // send the message
  socket.emit("chat_message", JSON.stringify({ username, msg }));

  // clear input
  event.target.elements.msg.value = "";
  event.target.elements.msg.focus();
});

// output message to dom
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.user} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
  chatMessages.appendChild(div);

  // testing
  const li = document.createElement("li");
  li.classList.add("message");
  li.innerHTML = "test";
  chatMessagess.appendChild(li);
}

function outputRoom(room, username) {
  document.getElementById("room-name").innerHTML = `${room}`;

  //   const li = document.createElement("li");
  //   li.classList.add("message");
  //   li.innerHTML = `${username}`;
  //   chatMessagess.appendChild(li);
}
