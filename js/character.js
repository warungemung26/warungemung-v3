// js/character.js
document.addEventListener('DOMContentLoaded', ()=>{
  const fileInput = document.getElementById('fileInput');
  const portrait = document.getElementById('nengPortrait');
  const openPreview = document.getElementById('openPreview');
  const modal = document.getElementById('imgModal');
  const imgLarge = document.getElementById('imgLarge');
  const closeModal = document.getElementById('closeModal');

  // open modal with current image
  openPreview?.addEventListener('click', ()=>{
    const src = portrait?.src || '';
    if(!src) return;
    imgLarge.src = src;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden','false');
  });

  closeModal?.addEventListener('click', ()=>{
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
    imgLarge.src = '';
  });

  // preview user-selected local image (client-side only)
  fileInput?.addEventListener('change', (e)=>{
    const f = e.target.files && e.target.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = (ev)=>{
      portrait.src = ev.target.result; // preview on page
      imgLarge.src = ev.target.result;  // also for modal
      // open modal automatically to show preview
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden','false');
    };
    reader.readAsDataURL(f);
  });
});
