import {offset, range} from './app.js'

const info = [
    {
      "year": 1991,
      "title": "Croatian War of Independence",
      "summary": "This conflict took place in Croatia, which was then a republic of Yugoslavia. It was fought between Croatian forces and the Yugoslav People's Army (JNA), with the JNA supporting Croatian Serb separatists. The war lasted from 1991 to 1995, and resulted in the independence of Croatia."
    },
    {
      "year": 1992,
      "title": "Bosnian War",
      "summary": "This conflict took place in Bosnia and Herzegovina, which was also a republic of Yugoslavia. It was fought between Bosnian Serb, Bosniak (Bosnian Muslim), and Croatian forces, and resulted in the breakup of Yugoslavia and the independence of Bosnia and Herzegovina. The war lasted from 1992 to 1995 and was characterized by widespread atrocities, including ethnic cleansing and genocide."
    },
    {
      "year": 1999,
      "title": "Kosovo War",
      "summary": "This conflict took place in Kosovo, which was then a province of Serbia. It was fought between Serbian forces and the Kosovo Liberation Army (KLA), with the KLA seeking independence for Kosovo. The war lasted from 1999 to 2000, and resulted in the deployment of NATO forces in Kosovo and the establishment of a UN protectorate. Kosovo declared independence in 2008, but its status as an independent state is not recognized by Serbia and some other countries."
    }
  ] ;

export const loadInfo = () => {
    let timeline = document.querySelector('.timeline');
    timeline.replaceChildren();
    addYears();
    addMoments();
}

const addYears = () => {
    const firstYear = info[0].year + (offset * range);
    
    const momentsQuantity = (getScreenWidth() / 192) - 2; //192 es la cantidad de pixeles de ancho de cada moment. 1rem = 16px. 12rem = 12 * 16px
    
    let timeline = document.querySelector('.timeline');

    for (let i = firstYear; i < firstYear + (momentsQuantity * range); i += range) {
        let moment = document.createElement('div');
        moment.classList.add('moment');

        let year = document.createElement('p');
        year.innerText = i;
        year.classList.add('year');

        let mark = document.createElement('div');
        mark.classList.add('mark');

        moment.appendChild(year);
        moment.appendChild(mark);

        timeline.appendChild(moment);
    }

}

const addMoments = () => {
    let years = Array.from(document.querySelectorAll('.year'));

    for(var i in years){
        let year = years[i];
        let nextYear = parseInt(year.innerText) + range;
        
        const yearMoment = info.filter(x => x.year >= year.innerText && x.year < nextYear);

        if(yearMoment){
            for(var j in yearMoment){
                let moment = year.parentElement;
                let title = document.createElement('p');
                title.innerText = yearMoment[j].title;
                title.classList.add('moment-title');
                
                title.addEventListener('click', () => {
                  alert(yearMoment[j].summary);
                })

                moment.appendChild(title);
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