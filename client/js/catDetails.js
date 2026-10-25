


const urlParams = new URLSearchParams(window.location.search);
const catId = urlParams.get('catId');// דוגמת מידע
CatDetails()
async function CatDetails() {
  try {
    const response = await fetch(`http://localhost:2555/Category/getCategoryById/${catId}`);
    const cat = await response.json();
    console.log(cat.name);
    insettHTML(cat)
    getAlltripsByCat(cat._id,cat.name)
  }
  catch (err) {
    console.error('שגיאה בטעינת האובייקט:', err);
  }
}

function insettHTML(cat) {
  debugger
  document.querySelector('#name').innerHTML = cat.name
  document.querySelector('#des').innerHTML = cat.information.replace(/\n/g, '<br>')
  document.querySelector('#cat-img').src = `http://localhost:2555${cat.imageUrl}` || 'images/default.png'


}

