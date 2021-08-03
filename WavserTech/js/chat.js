const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [

"Who is the president of Kenya?: Hon. Uhuru Mwigai Kenyatta",
"What is BBI?: BBI stands for Building Bridges Initiative",
 "I drink and drive? : No matter the circumstances, you should never drink and drive. It's not worth the risk of putting yourself and others in danger.",
"What is the function of an MCA?: The role of the County Assembly in Kenya is largely concerned with legislation",
"When was the first constitution made?: Constitution of Kenya (1963)",
"Who is in charge of the Kenya Police?:  Agency executive ",
"Can I have dual citizenship?: According to the Constitution of Kenya and the Kenya Citizenship and Immigration Act of 2011, the Dual Citizenship is permissible in Kenya",
"What is the age limit for passport application?: Passport applications must be done in person at the Embassy. However, parents may apply on behalf of their children aged below 16",
"Is an ID necessary for a driving license?: Yes",
"Is University education compulsory?: university education should not be compulsory to all students. Not every student is eager to go to university as some students lack the learning incentive",
];

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "SAVANNA";
const PERSON_NAME = "Mania";

msgerForm.addEventListener("submit", event => {
event.preventDefault();

const msgText = msgerInput.value;
if (!msgText) return;

/*const msgText = msgerInput.value;
for(var i=0;i<BOT_MSGS.length;i++){
  if(msgText in BOT_MSGS[i]) return msgText+""+BOT_MSGS[i];
}
*/
appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
msgerInput.value = "";

botResponse();
});

function appendMessage(name, img, side, text) {
//   Simple solution for small apps
const msgHTML = `
<div class="msg ${side}-msg">
  <div class="msg-img" style="background-image: url(${img})"></div>

  <div class="msg-bubble">
    <div class="msg-info">
      <div class="msg-info-name">${name}</div>
      <div class="msg-info-time">${formatDate(new Date())}</div>
    </div>

    <div class="msg-text">${text}</div>
  </div>
</div>
`;

msgerChat.insertAdjacentHTML("beforeend", msgHTML);
msgerChat.scrollTop += 500;
}



function botResponse() {
const r = random(0, BOT_MSGS.length - 1);
const msgText=BOT_MSGS[r]

const delay = msgText.split(" ").length * 100;

setTimeout(() => {
appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
}, delay);
}

// Utils
function get(selector, root = document) {
return root.querySelector(selector);
}

function formatDate(date) {
const h = "0" + date.getHours();
const m = "0" + date.getMinutes();

return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
return Math.floor(Math.random() * (max - min) + min);
}

 


// <!-- HTML5 Speech Recognition API -->

function startDictation() {

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(e) {
      document.getElementById('transcript').value
                               = e.results[0][0].transcript;
      recognition.stop();
      //document.getElementById('labnol').submit();
    };

    recognition.onerror = function(e) {
      recognition.stop();
    }

  }
}
