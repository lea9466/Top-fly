let idU
let userG
let mes
// import { getUserFromToken } from './globalUser.js';

document.addEventListener('DOMContentLoaded', async () => {
    const user = await getUserFromToken();
    document.querySelector("#name").value = user.user.name
    document.querySelector("#email").value = user.user.email
    document.querySelector('#newsletter').checked = user.user.status
    idU = user.user._id
    userG = user.user
    mes = user.user.messages
    const container = document.getElementById("messagesContainer");

    debugger
    mes.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message-item";
        div.innerHTML = `
            <div class="date">תאריך: ${msg.date.split('T')[0]}</div>
            <div class="content">${msg.content.replace(/\n/g, '<br>')}</div>
        `;
        container.appendChild(div);
    });

});

document.querySelector('.contact-admin-form').addEventListener('submit', sendMessageToAdmin);
async function sendMessageToAdmin(e) {
    e.preventDefault();
    if (document.querySelector('#message').value != '') {
        try {
            debugger;
            const message = document.querySelector('#message').value;
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const html = `
            <div dir="rtl" style="font-size: 18px; font-family: Arial, sans-serif;">
                <p><strong>קיבלת הודעה מ-${name}:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            </div>`
            const id = idU;
            const token = localStorage.getItem("token");
            if (!token) {
                alert("אין טוקן, נא להתחבר שוב");
                return;
            }
            const messagePayload = {
                _id: id,
                content: message
            };
            const response = await fetch('http://localhost:2555/User/addNewMess', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(messagePayload)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "שגיאה כללית בשליחה");
            }
            const content = { from: email, to: 'lea0556769466@gmail.com', html: html, subject: 'הודעת יצירת קשר חדשה' }
            const emailSent = await sendEmail(content);
            if (emailSent) {
                alert("ההודעה נשלחה בהצלחה");
                document.querySelector('#message').value = '';
            } else {
                alert("ההודעה נשמרה, אך שליחת המייל נכשלה");
            }
        } catch (err) {
            console.error("שגיאה בשליחה:", err);
            alert("קרתה שגיאה בשליחת ההודעה: " + err.message);
        }
    }
}
async function sendEmail(content) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:2555/User/SendEmailToManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(content)
        });
        const data = await response.json();
        if (!response.ok) {
            console.error("שגיאה בשליחת המייל:", data);
            return false;
        }
        return true;
    } catch (error) {
        console.error("שגיאת רשת:", error);
        return false;
    }

}


document.querySelector(".toggle-password").addEventListener('click', togglePassword)
function togglePassword() {
    debugger
    const passwordInput = document.getElementById("lust_password");
    const toggleIcon = document.querySelector(".toggle-password");

    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";

    toggleIcon.textContent = isPassword ? "🙈" : "👁️";
}


document.getElementById('updateF').addEventListener('submit', async (e) => {
    e.preventDefault();
    debugger
    const formData = new FormData();
    formData.append('name', document.querySelector('#name').value);
    formData.append('email', document.querySelector('#email').value);
    if (document.querySelector('#lust_password').value != userG.password)
        alert('הסיסמא שגויה')
    else {

        if (document.querySelector('#passwordTrue').value != document.querySelector('#password').value)
            alert('הסיסמאות אינן תואמות')
        else {
            if (document.querySelector("#password").value != '')
                formData.append('password', document.querySelector('#password').value);
            else
                formData.append('password', document.querySelector('#lust_password').value);
            formData.append('status', document.querySelector('#newsletter').checked);
            formData.append('_id', idU);
            const token1 = localStorage.getItem("token");
            const onSuccess = () => {
                alert('המשתמש עודכן בהצלחה');
                location.reload();
            };
            try {
                const response = await fetch('http://localhost:2555/User/upDateUser', {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token1}`
                    },
                    body: formData
                });
                if (!response.ok) throw new Error('שגיאה בשרת');
                const { token } = await response.json();
                // שמירה של הטוקן 
                localStorage.setItem('token', token);
                onSuccess();
            } catch (err) {
                console.error('שגיאה בשליחה:', err);
                alert('שליחה נכשלה');
            }
        }
    }



});