

document.querySelector('form').addEventListener('submit', sendMessageToAdmin);
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
            const data = { from: email, to: 'lea0556769466@gmail.com', html: html, subject: 'הודעת יצירת קשר חדשה' }
            const emailSent = await sendEmailWithOutToken(data);
            if (emailSent) {
                alert("ההודעה נשלחה בהצלחה");
                document.querySelector('#message').value = '';
            } else {
                alert("השליחה נכשלה");
            }
        } catch (err) {
            console.error("שגיאה בשליחה:", err);
            alert("קרתה שגיאה בשליחת ההודעה: " + err.message);
        }
    }
}


async function sendEmailWithOutToken(content) {
    try {
        const response = await fetch('http://localhost:2555/User/SendEmailToManagerNOToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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