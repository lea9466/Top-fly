window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response1 = await fetch('../html/footer.html');
        const html1 = await response1.text();
        document.querySelector("footer").innerHTML = html1;

    } catch (error) {
        console.error("שגיאה בטעינת הפותר או בקריאה ל-init:", error);
    }
});
window.addEventListener('load', function () {
    setTimeout(function () {
        document.querySelector('footer').style.display = 'block';
    }, 1000); // 3000 מילישניות = 3 שניות
});