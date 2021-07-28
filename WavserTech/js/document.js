

//Create Documents
//e-sign signature
(function() {
  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimaitonFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  var canvas = document.getElementById("sig-canvas");
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#222222";
  ctx.lineWidth = 4;

  var drawing = false;
  var mousePos = {
    x: 0,
    y: 0
  };
  var lastPos = mousePos;

  canvas.addEventListener("mousedown", function(e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
  }, false);

  canvas.addEventListener("mouseup", function(e) {
    drawing = false;
  }, false);

  canvas.addEventListener("mousemove", function(e) {
    mousePos = getMousePos(canvas, e);
  }, false);

  // Add touch event support for mobile
  canvas.addEventListener("touchstart", function(e) {

  }, false);

  canvas.addEventListener("touchmove", function(e) {
    var touch = e.touches[0];
    var me = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchstart", function(e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var me = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchend", function(e) {
    var me = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(me);
  }, false);

  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    }
  }

  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    }
  }

  function renderCanvas() {
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
      lastPos = mousePos;
    }
  }

  // Prevent scrolling when touching the canvas
  document.body.addEventListener("touchstart", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchend", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchmove", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

  (function drawLoop() {
    requestAnimFrame(drawLoop);
    renderCanvas();
  })();

  function clearCanvas() {
    canvas.width = canvas.width;
  }

  // Set up the UI
  var sigText = document.getElementById("sig-dataUrl");
  var sigImage = document.getElementById("sig-image");
  var clearBtn = document.getElementById("sig-clearBtn");
  var submitBtn = document.getElementById("sig-submitBtn");
  clearBtn.addEventListener("click", function(e) {
    console.log("mania")
    clearCanvas();
    sigText.innerHTML = "Data URL for your signature will go here!";
    sigImage.setAttribute("src", "");
  }, false);
  submitBtn.addEventListener("click", function(e) {
    console.log("its fine")
    var dataUrl = canvas.toDataURL();
    sigText.innerHTML = dataUrl;
    sigImage.setAttribute("src", dataUrl);
  }, false);

})();


//End of e-signs

//Word document to write something
// http://mark.koli.ch/use-javascript-and-jquery-to-get-user-selected-text
$(document).ready(function() {});
var txt = $(".box p");
var title = $(".box .header");

$(".bold").on("click", function() {
  txt.select().css("font-size", "24px");
  txt.css("text-decoration", "underline");
});

//function to save text to localStorage
function save() {
  var randNum = Math.floor(Math.random() * 1000 + 1);

  var title = $(".box h1").text();
  var txt = $(".box p").text();
  sessionStorage.setItem(title, txt);
  console.log("Text has been saved");
}

function retreive() {
  var stored = sessionStorage.getItem(2);
  txt.text(stored);
}

function cancel() {
  $(".clear").on("click", function() {
    txt.text(" ");
    sessionStorage.clear();
  });

  console.log("Text has been deleted");
}

//function to determine number of words and characters;
function stats() {
  var txt = $(".box p").text(),
    title = $(".box h1").text(),
    charCount = txt.length,
    wordCount = txt.split(" ").length;

  $(".words").text(wordCount + " Words");
  $(".chars").text(charCount + " Characters");

  console.log(charCount);
  console.log(wordCount);
}

document.addEventListener("copy", function(e) {
  var copied = window.getSelection().toString();
  e.clipboardData.setData("text", copied);

  console.log(copied);

  console.log("Copied");
});

document.addEventListener("cut", function(e) {
  var copied = window.getSelection().toString();
  e.clipboardData.setData("text", copied);

  console.log(copied);

  console.log("Copiado");
});
document.addEventListener("paste", function(e) {
  var clipboardData = e.clipboardData || window.clipboardData;
  var pastedData = clipboardData.getData("Text");

  console.log(pastedData);

  console.log("Pasted");
});

$(".copy").click(function(e) {
  console.log("about to copy");
  console.log(e);
});

//Implementing save, cancel and download buttons
var savebtn=document.getElementById("saving");
savebtn.addEventListener("click", save);

var cancelbtn=document.getElementById("cancelling");
cancelbtn.addEventListener("click", cancel);

var downloadbtn=document.getElementById("downloading");
downloadbtn.addEventListener("click", function(){
  alert("Downloading");
});

function windowclose() {
  if (sessionStorage.clear()) {
    window.onbeforeunload = function(e) {
      return "Have you saved your document?";
    };
  }
}

windowclose();
$(".box").on("keyup", stats);

setInterval(function() {
  var d = new Date().toUTCString();
  
  $(".date").text(d);
  
}, 1000);




///vhvh

//Create document button implementaion
    function openesign(){
       var esign=document.getElementById("e-sign");
       if(esign.style.display==="none"){
           esign.style.display="block"
       }
       else{
           esign.style.display="none"
       }
        }
    function wordwritting(){
     openesign();
         var write=document.getElementById("write");
       if(write.style.display==="none"){
           write.style.display="block"
       }
       else{
           write.style.display="none"
       }
        }
    

    var createdocs=document.getElementById("create");
    createdocs.addEventListener('click', openesign)
       
  var edit=document.getElementById("edit");
  edit.addEventListener('click', openesign)
    var writedocs=document.getElementById("writedoc");
    writedocs.addEventListener('click', wordwritting)
    var scanner=document.getElementById("scan"); 
    scanner.addEventListener('click', openesign)
 
 var profesional=document.getElementById("prof");
 profesional.addEventListener('click', function(){
     window.open("professional.html")
 })