
const texts=document.querySelector(".texts");
window.SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition=new window.SpeechRecognition();
recognition.interimResults=true;

let p=document.createElement('p');
recognition.addEventListener('result', (e)=>{
    
    const text=Array.from(e.results)
    .map(result=>result[0])
    .map(result=>result.transcript)
    .join('')
    
    p.innerText=text;
    texts.appendChild(p);
    if(e.results[0].isFinal){
        if(text.includes('hello')){
            p.classList.add('reply');
            p.innerText="Hi"
            texts.appendChild(p);
        }
        p=document.createElement('p');
    }

        if(e.results[0].isFinal){
        if(text.includes('do you know ku')){
            p.classList.add('reply');
            p.innerText="Yes, that Univrsity is a hoe, mostly Nyayo hostel 2"
            texts.appendChild(p);
           
        }
        p=document.createElement('p');
    }
        if(e.results[0].isFinal){
        if(text.includes('what do you mean')){
            p.classList.add('reply');
            p.innerText="That hostel is fucking lodging lol!"
            texts.appendChild(p);
         
        }
        p=document.createElement('p');
    }
        if(e.results[0].isFinal){
        if(text.includes('right')){
            p.classList.add('reply');
            p.innerText="You motherfucker! if you have been there you will go to hell"
            texts.appendChild(p);
          
        }
        p=document.createElement('p');
    }
})
recognition.addEventListener('end', ()=>{
    recognition.start();
})
recognition.start();