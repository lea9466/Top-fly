let isToch = false
let idO = 0;
const headers = [
  "שם טיול",
  "תיאור",
  "מקום",
  "תמונה",
  "התחלה",
  "סיום",
  "קטגוריה",
  "עריכה/מחיקה"
];


document.addEventListener('DOMContentLoaded', async () => {
    //בחירת קטגוריה מתוך אופציות מוגבלות
    try {
        const response = await fetch('http://localhost:2555/Category/getAllcategories');
        const categories = await response.json();
        const select = document.getElementById('category');

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat._id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    } catch (err) {
        console.error('שגיאה בטעינת הקטגוריות:', err);
    }
    //שליפה
    createTbl('http://localhost:2555/Trip/getAlltrips',headers);



});

//יצירה או עדכון
document.getElementById('FotmOb').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    debugger
    formData.append('name', document.querySelector('#name').value);
    formData.append('description', document.querySelector('#description').value);
    formData.append('start', document.querySelector('#start').value);
    formData.append('end', document.querySelector('#end').value);
    formData.append('hotel', document.querySelector('#hotel').value);
    formData.append('image', document.querySelector('#image').files[0]);
    if (document.querySelector('#category').value != "")
        formData.append('parentCategory', document.querySelector('#category').value);
    if (!isToch) {
        submitForm('http://localhost:2555/Trip/createNewTrip', 'POST', formData, () => {
            alert('נשמר בהצלחה!');
            location.reload();
        })
    }
    else {
        formData.append('_id', idO);
        submitForm('http://localhost:2555/Trip/upDateTrip', 'PUT', formData, () => {
            alert('עודכן בהצלחה!');
            location.reload();
        })
    }
});

function upDate() {
    isToch = true
    const id = this.parentNode.parentNode.id
    upDateObject('http://localhost:2555/Trip/getTripById', id, true)

}
function deleteO() {
    const id = this.parentNode.parentNode.id
    deletObgjet('http://localhost:2555/Trip/dropeTrip', id)
}