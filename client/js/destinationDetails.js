





if (document.querySelector('body').id == 'home')
    getAlltripsByCat('68338218cbbb8679b5141d8b', 'דילים')

async function getAlltripsByCat(id, name) {
    try {
        const res = await fetch('http://localhost:2555/Trip/getAlltripsByCat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ parentCategory: id })
        });
        const trips = await res.json();
        debugger

        document.querySelector("#dils").classList.add('destSyleDiv')
        // let text = '';
        // for (let i = 1; i <= 100; i++) {
        //     text += `שורה מספר ${i}\n`;
        // }
        // document.querySelector('#infoCat').textContent = text
        trips.forEach(async trip => {
            // const cat = await getCatBtId(trip.parentCategory)
            const categoryName = name
            debugger
            const card = createDestinationCard({ id: trip._id, name: trip.name, category: categoryName, description: trip.description, imageUrl: trip.imageUrl })
            document.querySelector("#dils").append(card)
        });

    } catch (err) {
        console.error('שגיאה בטעינת הטיולים:', err);
        alert('אירעה שגיאה בטעינה');
    }
}


function createDestinationCard({ id, name, category, description, imageUrl }) {
    // אלמנט הכרטיס הראשי
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.id = id;

    // תמונה
    const img = document.createElement('img');
    img.className = 'destination-img';
    img.src = `http://localhost:2555${imageUrl}` || 'images/default.png';
    img.alt = name;
    card.appendChild(img);

    // קונטיינר למידע
    const info = document.createElement('div');
    info.className = 'destination-info';

    // שם היעד
    const title = document.createElement('h2');
    title.className = 'destination-name';
    title.textContent = name;
    info.appendChild(title);

    // קטגוריה
    const cat = document.createElement('p');
    cat.className = 'destination-category';
    debugger
    cat.textContent = `קטגוריה: ${category}`;
    info.appendChild(cat);

    // תיאור
    // const desc = document.createElement('p');
    // desc.className = 'destination-description';
    // desc.textContent = description;
    // info.appendChild(desc);

    // חיבור המידע לכרטיס
    card.appendChild(info);

    card.addEventListener('click', function () {

        window.location.href = `details.html?tripId=${this.id}`;
    })


    return card;
}


