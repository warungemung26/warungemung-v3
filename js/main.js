// main.js
console.log('Warung Emung v3.1 loaded');

const clickSound = new Audio('assets/sounds/click.mp3');

function showToast(message){
  const toast = document.getElementById('toast');
  if(!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(()=>{ toast.classList.remove('show'); },3000);
}

function handleMenuClick(name){
  clickSound.currentTime=0;
  clickSound.play().catch(e=>{});
  showToast(`Neng lagi nyiapin pesenan ${name} ya...`);
  const msg = `Neng nyiapin ${name}, sabar sebentar 😊`;
  appendNeng(msg);   // fungsi menambahkan bubble chat
  nengSpeak(msg);    // fungsi TTS
}

document.querySelectorAll('.menu-item').forEach(item=>{
  item.addEventListener('click', e=>{
    const name = e.target.dataset.item;
    handleMenuClick(name);
  });
});
