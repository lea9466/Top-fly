
async function loadCategories() {
  try {
    const res = await fetch('http://localhost:2555/Category/getAllcategories'); // נתיב לדוגמה
    const categories = await res.json();
    const container = document.getElementById("category_link");
    container.innerHTML = ''; // מנקה תוכן קודם

    categories.forEach(cat => {
      if (cat.name != 'דילים') {
        const a = document.createElement('a');
        // a.href = 'home.html'
        a.id = cat._id
        // a.addEventListener('click', loadPage);
        a.className = 'category-box';
        a.dataset.information = cat.information;

        const img = document.createElement('img');
        img.src = `http://localhost:2555${cat.imageUrl}`;
        img.alt = cat.name || 'קטגוריה';
        img.className = 'category-image';

        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        const desc = document.createElement('div');
        desc.className = 'description';
        // desc.textContent = cat.description || 'אין תיאור';
        desc.textContent = cat.name;
        overlay.appendChild(desc);
        a.appendChild(img);
        a.appendChild(overlay);
        a.addEventListener('click', function () {
          window.location.href = `catDetails.html?catId=${a.id}`;
        })
        container.appendChild(a);

      }

    });

  } catch (err) {
    console.error('שגיאה בטעינת הקטגוריות:', err);
    alert('אירעה שגיאה בטעינה');
  }
}
loadCategories()



// function loadPage() {
//   const destinationId = this.id;
//   document.querySelector("#category_link").innerHTML = "";
//   getAlltripsByCat(destinationId, this.dataset.information)
// }

function toggleSidebar() {
  debugger
  const sidebar = document.getElementById('right');
  const container = document.getElementById('containerT1');
  const isHidden = sidebar.classList.toggle('hidden');
  container.classList.toggle('full-width', isHidden);
  debugger
  if (document.querySelector('.out').style.display == 'none')
    document.querySelector(".out").style.display = 'block'
  else
    document.querySelector(".out").style.display = 'none'

}

// async function f1() {
//     const response = await fetch('http://localhost:2555/User/getAllUsers');
//     const objects = await response.json();
//     objects.forEach(obj => {
//         if (obj.role === 'manager') {
//             console.log(`Manager Name: ${obj.name}, Email: ${obj.password}`);
//         }
//     });
// }
