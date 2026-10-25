let isToch = false
let idO = 0;

const headers = [
  "שם הקטגוריה",
  "תיאור",
  "אינפורמציה",
  "תמונה",
  "עריכה/מחיקה"
];

//שליפה
document.addEventListener('DOMContentLoaded', async () => {
    createTbl('http://localhost:2555/Category/getAllcategories',headers)
});

//יצירה או עדכון
document.getElementById('FotmOb').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', document.querySelector('#name').value);
    formData.append('description', document.querySelector('#description').value);
    formData.append('image', document.querySelector('#image').files[0]);
     formData.append('information', document.querySelector('#information').value);
    if (!isToch) {
        submitForm('http://localhost:2555/Category/createNewCategory', 'POST', formData, () => {
            alert(isToch ? 'עודכן בהצלחה!' : 'נשמר בהצלחה!');
            location.reload();
        })
    }
    else {
        formData.append('_id', idO);
        submitForm('http://localhost:2555/Category/upDateCategory', 'PUT', formData, () => {
            alert(isToch ? 'עודכן בהצלחה!' : 'נשמר בהצלחה!');
            location.reload();
        })
    }
});


async function upDate() {
    const id = this.parentNode.parentNode.id
    isToch = true
    upDateObject('http://localhost:2555/Category/getCategoryById', id)

}

async function deleteO() {
    const id = this.parentNode.parentNode.id
    deletObgjet('http://localhost:2555/Category/dropeCategory', id)
}


