// data.js - load menu.json
async function loadMenu(){
  try{
    const r = await fetch('data/menu.json');
    return await r.json();
  }catch(e){ return [] }
}
function getItemById(id, menu){ return menu.find(m=>m.id===id) }
