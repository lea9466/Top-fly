

debugger
document.querySelector('form').addEventListener('submit', sendMessageToAdmin);
async function sendMessageToAdmin(e) {
    e.preventDefault();
    if (document.querySelector('#message').value != '') {
        try {
            debugger;
            const subject = document.querySelector('#subject').value;
            const message = document.querySelector('#message').value;
            const img = document.querySelector('#image').files[0]
            let imageBase64 = null;
            if (img) {
                imageBase64 = await toBase64(img);
            }
            const html = `
            <div dir="rtl" style="font-size: 18px; font-family: Arial, sans-serif;">
                <p><strong>${subject}:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                ${imageBase64 ? '<img src="cid:img1" style="max-width:400px;" />' : ''}
            </div>`
            const users = await getUsersToSend();
            users.forEach(async user => {
                const data = { from: 'lea0556769466@gmail.com', to: user.email, html: html, subject: subject ,imageBase64, imageName: img?.name || ''}
                const emailSent = await sendEmail(data);
                if (emailSent) {
                    alert("ההודעה נשלחה בהצלחה");
                    document.querySelector('#message').value = '';
                    document.querySelector('#image').files[0]=''
                } else {
                    alert("ההודעה נשמרה, אך שליחת המייל נכשלה");
                }

            });
        } catch (err) {
            console.error("שגיאה בשליחה:", err);
            alert("קרתה שגיאה בשליחת ההודעה: " + err.message);
        }
    }
}


async function getUsersToSend() {
    try {
        const response = await fetch('http://localhost:2555/User/getAllUsersByNewz');
        const users = await response.json();
        return users
    }
    catch (err) {
        console.error('שגיאה בטעינת המשתמשים:', err);
    }
}
async function sendEmail(data1) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:2555/User/SendEmailToManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data1)
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
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // רק Base64 נקי
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}