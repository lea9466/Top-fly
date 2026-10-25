
const headers = [
  "שם משתמש",
  "אימייל",
  "סיסמא",
  "סטטוס אימייל",
  "סטטוס בקרה"
];
//שליפה
document.addEventListener('DOMContentLoaded', async () => {
    createTbl('http://localhost:2555/User/getAllUsers',headers)
});


async function f1() {
    const response = await fetch('http://localhost:2555/User/getAllUsers');
    const objects = await response.json();
    objects.forEach(obj => {
        if (obj.role === 'manager') {
            console.log(`Manager Name: ${obj.name}, Email: ${obj.password}`);
        }
    });
}
f1()
