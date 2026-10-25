

async function getUserFromToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }
    const res = await fetch('http://localhost:2555/User/getUserFromToken', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
        return;
    }

    const user = await res.json();
    return user;
}
async function init() {
    const user = await getUserFromToken();
    if (!user) return; // נשלח ללוגין כבר בפונקציה עצמה

    debugger
    if (user.user.role === 'manager') {
        document.querySelector("#userGlobal").innerHTML = 'מחובר מנהל';
        document.querySelectorAll('.mang').forEach(el => {
            el.classList.remove('hidden');
        });
    } else {
        document.querySelector("#userGlobal").innerHTML = `מחובר ${user.user.name}`;
    }

}
