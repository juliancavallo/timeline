import {offset, range} from './app.js'

let info = [];

async function fetchData() {
  try {
    const response = await fetch('https://timeline-api-juliancavallo.vercel.app/events/1');
    info = await response.json();
  } catch (error) {
    console.log('Error making API call:', error);
  }
}

export const loadInfo = async () => {
  await fetchData();

  let timeline = document.querySelector('.timeline');
  timeline.replaceChildren();
  addYears();
  addEvents();
}

const addYears = () => {
    const firstYear = new Date(info[0].date).getFullYear()  + (offset * range);
    
    const eventsQty = (getScreenWidth() / 192) - 2; //192 es la cantidad de pixeles de ancho de cada event. 1rem = 16px. 12rem = 12 * 16px
    
    let timeline = document.querySelector('.timeline');

    for (let i = firstYear; i < firstYear + (eventsQty * range); i += range) {
        let event = document.createElement('div');
        event.classList.add('event-container');

        let year = document.createElement('p');
        year.innerText = i;
        year.classList.add('year');

        let mark = document.createElement('div');
        mark.classList.add('mark');

        event.appendChild(year);
        event.appendChild(mark);

        timeline.appendChild(event);
    }

}

const addEvents = () => {
    let years = Array.from(document.querySelectorAll('.year'));

    for(var i in years){
        let year = years[i];
        let nextYear = parseInt(year.innerText) + range;
        
        const eventsInRange = info.filter(x => new Date(x.date).getFullYear() >= year.innerText && new Date(x.date).getFullYear() < nextYear);

        if(eventsInRange){
            for(var j in eventsInRange){
                let event = year.parentElement;
                let title = document.createElement('p');
                title.innerText = eventsInRange[j].title;
                title.classList.add('event-title');
                
                title.addEventListener('click', () => {
                  alert(eventsInRange[j].summary);
                })

                event.appendChild(title);
            }
        }

    }
}

function getScreenWidth() {
    if (self.innerWidth) {
      return self.innerWidth;
    }
  
    if (document.documentElement && document.documentElement.clientWidth) {
      return document.documentElement.clientWidth;
    }
  
    if (document.body) {
      return document.body.clientWidth;
    }
}