// header.js

// import { init } from './globalUser.js';
// import { search } from './search.js';
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../html/navbar.html');
        const html = await response.text();
        document.querySelector("header").innerHTML = html;

        // רק אחרי שה־HTML נטען לדף, נחבר את האירועים
        document.querySelector("#log-in").addEventListener('click', () => {
            window.location.href = 'login.html';
        });

        document.querySelector("#status").addEventListener('click', () => {
            const token = localStorage.getItem('token');
            if (!token)
                window.location.href = 'login.html'
            else
                window.location.href = 'userArea.html';
        });

        document.querySelector('#log-out').addEventListener('click', () => {

            localStorage.removeItem('token');
            window.location.href = 'home.html'

        })

        loadNavBar()
        debugger

        document.querySelector('.hamburger').addEventListener('click', toggleMenu)

        const openBtn = document.querySelector('#openSearchBtn');
        const openBtn1 = document.querySelector('#openSearchBtn1');
        const closeBtn = document.querySelector('#closeSearchBtn');
        const modal = document.querySelector('#searchModal');

        openBtn.addEventListener('click', () => {
            debugger
            modal.classList.remove('hidden');
        });
        openBtn1.addEventListener('click', () => {
            debugger
            modal.classList.remove('hidden');
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // אופציונלי: סגירה בלחיצה מחוץ לחלון
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });

        document.querySelector('#search').addEventListener('click', () => {
            const str = document.querySelector('#searchInput').value
            if (str != '')
                window.location.href = `search.html?str=${str}`;
        })


        await init();

    } catch (error) {
        console.error("שגיאה בטעינת ההדר או בקריאה ל-init:", error);
    }
});
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
}

async function loadNavBar() {
    try {
        const res = await fetch('http://localhost:2555/Category/getAllcategories'); // נתיב לדוגמה
        const categories = await res.json();
        const nav = document.querySelector('#nav')
        const mobileMenu = document.querySelector('#mobileMenu')
        categories.forEach(cat => {
            const a1 = document.createElement('a');
            a1.textContent = cat.name
            a1.href = `catDetails.html?catId=${cat._id}`
            mobileMenu.appendChild(a1)
            const a = document.createElement('a');
            a.textContent = cat.name
            a.href = `catDetails.html?catId=${cat._id}`
            nav.appendChild(a);

        });

    } catch (err) {
        console.error('שגיאה בטעינת הקטגוריות:', err);
        alert('אירעה שגיאה בטעינה');
    }
}

