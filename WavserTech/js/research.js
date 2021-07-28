console.clear()
function readFile(object, callback) {
  var file = object.files[0]
  console.log(file)
  var reader = new FileReader()
  reader.onload = function() {
  callback(reader.result)
    console.log(reader)
  }
  reader.readAsText(file)
}
function saveFile(data, name){
  var a=document.createElement("a")
  a.setAttribute("download", name||"file.txt")
  a.setAttribute("href", "data:application/octet-stream;base64,"+btoa(data||"undefined"))
  a.click()
}
function read(){
  var file = document.getElementById("file").files[0]
  console.log("Loading \""+file.name+"\"... ("+Math.round(file.size/1024)+"kB)")
  if(file.size>=256*1024){
    if(!confirm("File size is "+Math.round(file.size/1024)+"kBytes! Really want to read it?")){
      console.log("Aborting loading file...")
      return
    }
  }
  var reader = new FileReader()
  reader.onload = function() {
    console.log("File readed!")
    document.getElementById("out").innerHTML=reader.result
  }
  console.log("Starting reading file...")
  reader.readAsText(file)
}

/*Research priogram button*/
var button=document.getElementById("research-program-button");
button.addEventListener('click', function(){
  window.open("researchprograms.html")}
  )