// chat.js - chat UI (dummy AI logic)
const chatEl = { box: null, body: null, input: null };
document.addEventListener('DOMContentLoaded', ()=>{
  chatEl.box = document.getElementById('chat');
  chatEl.body = document.getElementById('chatBody');
  chatEl.input = document.getElementById('chatInput');
  document.getElementById('btnChat')?.addEventListener('click', ()=> chatOpen());
  document.getElementById('closeChat')?.addEventListener('click', ()=> chatClose());
  document.getElementById('sendChat')?.addEventListener('click', ()=> sendMessage());
});

function chatOpen(){ chatEl.box.classList.remove('hidden'); appendNeng('Halo, selamat rawuh! Mau tak rekomendasi panganan apa?') }
function chatClose(){ chatEl.box.classList.add('hidden'); chatEl.body.innerHTML=''; }
function appendUser(text){ const d=document.createElement('div'); d.className='message msg-user'; d.textContent=text; chatEl.body.appendChild(d); chatEl.body.scrollTop = chatEl.body.scrollHeight; }
function appendNeng(text){ const d=document.createElement('div'); d.className='message msg-neng'; d.textContent=text; chatEl.body.appendChild(d); chatEl.body.scrollTop = chatEl.body.scrollHeight; }

async function sendMessage(){
  const v = chatEl.input.value.trim(); if(!v) return;
  appendUser(v); chatEl.input.value='';
  // dummy AI delay
  appendNeng('Mung nyupak mikir...'); await new Promise(r=>setTimeout(r,800));
  // simple canned response
  appendNeng('Wah enak itu. Nek kowe pingin sing gurih, cobak Tempe Mendoan. Nek manis, pisang goreng anget.');
}
