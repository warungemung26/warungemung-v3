// ui.js - basic UI helpers
document.addEventListener('DOMContentLoaded', ()=>{ if(['malam'].includes(timeOfDay())) document.documentElement.setAttribute('data-theme','dark'); document.getElementById('btnMenu')?.addEventListener('click', ()=> alert('Menu belum diisi. -> Implementasi lanjut.')); });
