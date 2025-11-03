// chat_offline.js - offline chat with TTS and visitor name storage (Cirebon dialect) - TTS style: lembut santai
let NENG = null;
async function loadNengResponses(){
  try{
    const r = await fetch('data/neng_responses.json');
    NENG = await r.json();
  }catch(e){
    console.error('Gagal load neng_responses.json', e);
    NENG = {"sapaan":["Sugeng rawuh!"],"default":["Hehe..."]};
  }
}

function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// === Text to Speech (Suara Mbak Neng) - style: lembut santai ===
function nengSpeak(text){
  if(!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'id-ID';
  utter.rate = 0.98; // sedikit lebih lambat, lembut
  utter.pitch = 1.02;
  utter.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  let v = voices.find(v=>v.lang && v.lang.startsWith('id')) || voices.find(v=>/Google/i.test(v.name)) || voices[0];
  if(v) utter.voice = v;
  utter.onstart = ()=>{ const img = document.getElementById('nengImage'); if(img) img.classList.add('talking'); }
  utter.onend = ()=>{ const img = document.getElementById('nengImage'); if(img) img.classList.remove('talking'); }
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

// === Visitor name storage ===
function getVisitorName(){ return localStorage.getItem('visitorName'); }
function setVisitorName(name){ try{ localStorage.setItem('visitorName', name); }catch(e){} }
function resetVisitorName(){ try{ localStorage.removeItem('visitorName'); }catch(e){} }

// categorize keywords
function categorizeMessage(text){
  const t = text.toLowerCase();
  if(/kopi|ngopi|coffee|tubruk/.test(t)) return 'kopi';
  if(/makan|mangan|goreng|tempe|nasi|panganan|pisang/.test(t)) return 'makanan';
  if(/bye|dadah|pamit|sampun|sampun pamit|sampai/.test(t)) return 'pamit';
  if(/halo|hai|hei|halo neng|rawuh|selamat/.test(t)) return 'sapaan';
  return 'default';
}

async function sendOfflineMessage(userText){
  if(!NENG) await loadNengResponses();
  const cat = categorizeMessage(userText);
  appendNeng('Neng mikir sebentar, jeh...');
  await new Promise(r=>setTimeout(r, 700));
  const respArray = NENG[cat] || NENG['default'];
  appendNeng(rand(respArray));
}

// simple append functions
function appendUser(text){
  const body = document.getElementById('chatBody');
  if(!body) return;
  const d = document.createElement('div'); d.className='message msg-user'; d.textContent = text; body.appendChild(d); body.scrollTop = body.scrollHeight;
}

function appendNeng(text){
  const body = document.getElementById('chatBody');
  if(!body) return;
  const d = document.createElement('div'); d.className='message msg-neng'; d.textContent = text; body.appendChild(d); body.scrollTop = body.scrollHeight;
  nengSpeak(text);
}

// main sendMessage handler
async function sendMessage(){
  const v = document.getElementById('chatInput').value.trim();
  if(!v) return;
  appendUser(v); document.getElementById('chatInput').value='';
  // if name not set and input looks like a name, store it
  if(!getVisitorName() && /^[A-Za-z\s]{2,25}$/.test(v)){
    const nama = v.trim();
    setVisitorName(nama);
    appendNeng(`Wah, jenenge apik tenan, ${nama}! Seneng kenalan karo kowe.`);
    return;
  }
  await sendOfflineMessage(v);
}

// init and auto-greet logic
document.addEventListener('DOMContentLoaded', async ()=>{
  await loadNengResponses();
  const name = getVisitorName();
  setTimeout(()=>{
    if(document.getElementById('chatBody')){
      if(name){
        const greet = rand([`Sugeng rawuh maneh, ${name}!`,`Lho, ${name}, wis teko maneh toh?`,`Hehe halo ${name}, kangen Neng ora?`]);
        appendNeng(greet);
      } else {
        const initial = rand(NENG['sapaan'] || ['Eh halo, sapa jenengmu, Mas/Neng?']);
        appendNeng(initial);
      }
      try{ const visits = localStorage.getItem('we_visits')||0; localStorage.setItem('we_visits', Number(visits)+1);}catch(e){}
    }
  }, 600);

  // hook UI buttons if present
  const btnChat = document.getElementById('btnChat');
  if(btnChat) btnChat.addEventListener('click', ()=>{ document.getElementById('chat').classList.remove('hidden'); });
  const closeChat = document.getElementById('closeChat');
  if(closeChat) closeChat.addEventListener('click', ()=>{ document.getElementById('chat').classList.add('hidden'); });
  const sendBtn = document.getElementById('sendChat');
  if(sendBtn) sendBtn.addEventListener('click', ()=> sendMessage());
  const resetBtn = document.getElementById('resetName');
  if(resetBtn) resetBtn.addEventListener('click', ()=>{ resetVisitorName(); location.reload(); });
});
