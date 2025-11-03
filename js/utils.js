// utils.js
function formatRupiah(n){ return 'Rp ' + Number(n).toLocaleString('id-ID') }
function timeOfDay(){ const h=new Date().getHours(); if(h<11) return 'pagi'; if(h<15) return 'siang'; if(h<18) return 'sore'; return 'malam' }
