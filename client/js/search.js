
// const urlParams = new URLSearchParams(window.location.search);
// const trips = urlParams.get('trips');
// debugger
// console.log('hj');
// import { createDestinationCard } from './destinationDetails'
// import {getCatBtId} from './utils'
const urlParams = new URLSearchParams(window.location.search);
const str = urlParams.get('str');// דוגמת מידע
search(str);
async function search(str) {
    try {
        const res = await fetch('http://localhost:2555/Trip/searchTrips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchText: str })
        })
        const trips = await res.json();
        if (trips.length == 0)
            document.querySelector('#str').innerHTML = `לא נמצאו תוצאות עבור <span>${str}</span>`;
        else
            document.querySelector('#str').innerHTML = `תוצאות חיפוש עבור <span>${str}</span>`;
        trips.forEach(async trip => {
            const cat = await getCatBtId(trip.parentCategory)
            debugger
            const card = createDestinationCard({ id: trip._id, name: trip.name, category: cat.name, description: trip.description, imageUrl: trip.imageUrl })
            document.querySelector("#dils").append(card)
        });
    }
    catch (err) {
        console.error('שגיאה בטעינת הטיולים:', err);
        alert('אירעה שגיאה בטעינה');

    }
}