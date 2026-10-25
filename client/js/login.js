

document.addEventListener('DOMContentLoaded', function () {

    document.querySelector("#log").addEventListener('click', () => {

        if (document.querySelector("#log").textContent == "הרשם עכשיו") {
            document.querySelector("body").id = 'sign'
            document.querySelectorAll('.logi').forEach(el => {
                el.style.display = 'block';
            });
            document.querySelector("#log").textContent = "להתחברות"
            document.querySelector("#sum").textContent = "הרשם"
            document.querySelector("#pass").style.display = 'none'
            document.querySelector("#sp").textContent = 'יש'


        }
        else {
            document.querySelectorAll('.logi').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelector("body").id = 'login'
            document.querySelector("#log").textContent = "הרשם עכשיו"
            document.querySelector("#sum").textContent = "התחבר"
            document.querySelector("#pass").style.display = 'block'
            document.querySelector("#sp").textContent = 'אין'
        }
    })
    function toggleMenu() {
        document.getElementById('nav').classList.toggle('active');
    }
    document.querySelector("#f").addEventListener("submit", function (event) {
        event.preventDefault()
        let userPassward = document.querySelector("#password").value
        let email = document.querySelector("#email").value
        debugger
        if (document.querySelector("body").id == 'login') {
            if (userPassward == '' || email == '')
                alert('חסר פרטים')
            else login(userPassward, email)
        }
        else {
            let userName = document.querySelector("#name").value
            let status = document.querySelector('#ck').checked
            if (userName == '' || userPassward == '' || email == '')
                alert("חסר פרטים")
            else
                sign(userName, userPassward, email, status)
        }
    })


});

function sign(name, password, email, status) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('status', status);
    submitForm("http://localhost:2555/User/createNewUser", 'POST', formData, (data) => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('נרשמת בהצלחה!');
            window.location.href = 'home.html';
        } else {
            alert('קרתה שגיאה: ' + (data.message || 'לא ידוע'));
        }
    })

}

async function login(password, email) {
    try {
        const response = await fetch('http://localhost:2555/User/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const errData = await response.json();
            alert(errData.message || "שגיאה לא מזוהה");
            return;
        }

        const { user, token } = await response.json();

        // שמירה של הטוקן 
        localStorage.setItem('token', token);
        

        // ניווט לפי תפקיד
        if (user.role === 'manager') {
            document.querySelector("#userGlobal").innerHTML='מחובר מנהל'
            alert('מנהל ברוך הבא');
            window.location.href = 'manager.html';
        } else {
            document.querySelector("#userGlobal").innerHTML='מחובר'
            alert(user.name + ' ברוך הבא');
            window.location.href = 'home.html';
        }

    } catch (err) {
        console.error('שגיאה כללית:', err);
        alert('שגיאה כללית');
    }
}
