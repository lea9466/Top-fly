
//יצירה או עדכון
async function submitForm(url, method, formElement, onSuccess) {
  try {
    const response = await fetch(url, {
      method,
      body: formElement
    });
    const data = await response.json();
    if (!response.ok) {
      // אם יש שדה error בתגובה - נדפיס אותו
      const errorMessage = data.error || data.message || 'שגיאה לא ידועה';
      throw new Error(errorMessage);
    }
    if (onSuccess) onSuccess(data);
  } catch (err) {
    console.error('שגיאה בשליחה:', err.message);
    alert('שליחה נכשלה: ' + err.message);
  }
}

//עדכון
async function upDateObject(url, id, isTrip = false) {
  try {
    const response = await fetch(`${url}/${id}`);
    const obj = await response.json();
    document.querySelector('#name').value = obj.name;
    document.querySelector('#description').value = obj.description
    if (obj.imageUrl) {
      const preview = document.getElementById('preview');
      preview.src = `http://localhost:2555${obj.imageUrl}`;
      preview.style.display = 'block';
    }
    if (isTrip) {
      document.querySelector('#start').value = obj.start;
      document.querySelector('#end').value = obj.end
      document.querySelector('#hotel').value = obj.hotel
      document.querySelector('#category').value = obj.parentCategory
    }
    else
      document.querySelector("#information").value = obj.information
    idO = obj._id
  }
  catch (err) {
    console.error('שגיאה בטעינת האובייקט:', err);
  }
}

//טעינה
async function createTbl(url, header) {
  const tableBody = document.querySelector('#tbl');
  try {

    const response = await fetch(url);
    const objects = await response.json();
    objects.forEach(async (obj) => {
      let index = 0;
      const row = document.createElement('tr');
      row.id = obj._id
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && key != '_id' && (key != 'status' || document.querySelector("body").id == "userC") && key != 'subCategories' && key != '__v' && key != 'messages') {
          const objkey = document.createElement('td');
          objkey.setAttribute("data-label", headers[index++]);
          if (key == 'imageUrl') {
            const img = document.createElement('img');
            img.src = `http://localhost:2555${obj[key]}` || 'images/default.png'; // ברירת מחדל
            img.classList.add("imgTbl")
            objkey.append(img)
          }
          else {
            if (key == 'parentCategory') {
              if (obj[key] !== null) {
                const cat = await getCatBtId(obj[key])
                objkey.textContent = cat.name
              }
              else objkey.textContent = 'הקטגוריה נמחקה-לא מוצג'
            }
            else
              objkey.textContent = obj[key];
          }
          row.append(objkey)
        }
      }
      if (document.querySelector("body").id !== "userC") {
        const upOde = document.createElement('td')
        const btn1 = document.createElement('button')
        const btn2 = document.createElement('button')
        btn1.classList.add('dOu')
        btn2.classList.add('dOu')
        btn2.textContent = 'מחיקה'
        btn1.textContent = 'עריכה'
        btn1.addEventListener(('click'), upDate)
        btn2.addEventListener(('click'), deleteO)
        upOde.appendChild(btn1)
        upOde.appendChild(btn2)
        row.appendChild(upOde)

      }
      tableBody.append(row);
    })


  }
  catch (err) {
    console.error('שגיאה בטעינת הקטגוריות:', err);
  }
}

//מחיקה
async function deletObgjet(url, id) {

  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('שגיאה בשרת');
    const data = await response.json();
    alert(' נמחק בהצלחה!');
    location.reload()

  } catch (err) {
    console.error('שגיאה במחיקה:', err);
    alert('מחיקה נכשלה');
  }
}



async function getCatBtId(id) {
  try {
    debugger
    const response = await fetch(`http://localhost:2555/Category/getCategoryById/${id}`);
    if (!response.ok) throw new Error('שגיאה בשרת');
    const cat = await response.json();
    // console.log(cat.name);
    return cat
  }
  catch (err) {
    console.error('שגיאה בשליפה:', err);
    // alert('השליפה נכשלה');
  }
}
document.getElementById('FotmOb').addEventListener('reset', function () {
  preview.src = '';
  preview.style.display = 'none';
  isToch = false
  idO = 0;
});
document.querySelector('#image').addEventListener('change', function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById('preview');


  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      preview.src = event.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);

  } else {
    preview.src = '';
    preview.style.display = 'none';
  }
});