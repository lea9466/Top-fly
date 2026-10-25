
const urlParams = new URLSearchParams(window.location.search);
const tripId = urlParams.get('tripId');
TripDetails()
async function TripDetails() {
    try {
        const response = await fetch(`http://localhost:2555/Trip/getTripById/${tripId}`);
        const trip = await response.json();
        const container=await createTripDetails(trip)
        debugger
        document.querySelector('#dt').append(container)
    }
    catch (err) {
        console.error('שגיאה בטעינת האובייקט:', err);
    }
}


async function createTripDetails(trip) {
    const container = document.createElement('div');
    container.className = 'trip-detail-container';

    const img = document.createElement('img');
    img.className = 'trip-detail-image';
    img.src = `http://localhost:2555${trip.imageUrl}`;
    img.alt = 'trip image';

    const content = document.createElement('div');
    content.className = 'trip-detail-content';

    const titleEl = document.createElement('h2');
    titleEl.className = 'trip-title';
    titleEl.textContent = trip.name;

    content.appendChild(titleEl);
    const cat=await getCatBtId(trip.parentCategory) 
    const infoItems = [
        { label: 'תיאור', text: trip.description.replace(/\n/g, '<br>') },
        { label: 'מלון', text: trip.hotel },
        { label: 'יציאה', text: trip.start },
        { label: 'חזרה', text: trip.end },
        { label: 'קטגוריה', text:cat.name },
    ];

    infoItems.forEach(item => {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'trip-info-item';

        const label = document.createElement('span');
        label.className = 'trip-info-label';
        label.textContent = item.label;

        const text = document.createElement('span');
        text.className = 'trip-info-text';
        text.innerHTML = item.text;

        infoDiv.appendChild(label);
        infoDiv.appendChild(text);
        content.appendChild(infoDiv);
    });

    container.appendChild(img);
    container.appendChild(content);
    // const btn=document.createElement('button')
    // btn.textContent='לעוד מידע'
    // btn.className='trip-detail-button'
    // container.appendChild(btn);
        

    return container;
}


async function getCatBtId(id) {
  try {
    debugger
    const response = await fetch(`http://localhost:2555/Category/getCategoryById/${id}`);
    if (!response.ok) throw new Error('שגיאה בשרת');
    const cat = await response.json();
    // console.log(cat.name);
    return cat
  }
  catch (err) {
    console.error('שגיאה בשליפה:', err);
    // alert('השליפה נכשלה');
  }
}


// function createTripDetails(trip) {

//     const container = document.getElementById('category_link');
   
//     container.classList.remove('destSyleDiv')
//     container.innerHTML = ''


//     const content = `
       

//         <div class="trip-image">
//             <img src="http://localhost:2555${trip.imageUrl}" alt="תמונה של הטיול">
//         </div>

//         <div class="trip-info">
//             <p><strong>שם:</strong> ${trip.name || 'אין תיאור זמין'}</p>
//             <p><strong>תיאור:</strong> ${trip.description || 'אין תיאור זמין'}</p>
//             <p><strong>מלון:</strong> ${trip.hotel || 'לא צויין'}</p>
//             <p><strong>תאריך התחלה:</strong> ${trip.start || '---'}</p>
//             <p><strong>תאריך סיום:</strong> ${trip.end || '---'}</p>
//             <p><strong>קטגוריה:</strong> ${trip.parentCategory?.name || 'לא מוגדרת'}</p>
//             <button id='btn'>לפרטים נוספים</button>
//         </div>
        
//     `;
    
//     container.insertAdjacentHTML('beforeend', content);
// }
