const formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
dropdownCitiesfrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
inputDateDepart = document.querySelector('.input__date-depart'),
cheapestTicket = document.getElementById('cheapest-ticket'),
otherCheapTickets = document.getElementById('other-cheap-tickets')
;

let city =[];

const citiesApi = "http://api.travelpayouts.com/data/ru/cities.json",
  API_KEY = "0fb72a23216d66abb8952e3dd7cc3364",
  CALENDAR = "http://min-prices.aviasales.ru/calendar_preload",
      proxy = "https://cors-anywhere.herokuapp.com/";

const getData = (url, callback) => {
  const request = new XMLHttpRequest();

  request.open('GET', url);

  request.addEventListener('readystatechange', () => {
    if(request.readyState !==4) return;

    if(request.status ===200){
      callback(request.response);
    } else{
      console.error(request.status)
    }
  });

  request.send();
};

const showCity = (input, list) => {
  list.textContent = "";

  if (input.value !== "") {
    const filterCity = city.filter((item) => {
        const fixItem = item.name.toLowerCase();
        return fixItem.startsWith(input.value.toLowerCase());
      }
    );

    filterCity.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("dropdown__city");
      li.textContent = item.name;
      list.append(li);
    });
  }
};

const selectCity = (event, input, list) => {
  const target = event.target;
  if(target.tagName.toLowerCase()){
    input.value = target.textContent;
    list.textContent = '';
  }
}

const renderCheapDay = (cheapTicket) =>{
  console.log(cheapTicket)
};

const renderCheapYear = (cheapTickets) =>{

  cheapTickets.sort((a, b) => {

      if (a.value > b.value) {
        return 1;
      }
      if (a.value < b.value) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });
    console.log(cheapTickets);
};


const renderCheap = (data, date) =>{
  const cheapTicket = JSON.parse(data).best_prices;


  cheapTicketDay = cheapTicket.filter((item) =>{
    return item.depart_date === date;
  })

  renderCheapDay(cheapTicketDay);
  renderCheapYear(cheapTicket);

  console.log(cheapTicket);
}

const handlerCity = (event, input, list) => {
  const target = event.target;
  if (target.tagName.toLowerCase() === "li") {
    inputCitiesFrom.value = target.textContent;
    dropdownCitiesfrom.textContent = "";
  }
};

formSearch.addEventListener("submit", event => {
  event.preventDefault();
    const from = city.find((item) => inputCitiesFrom.value === item.name);
    const to = city.find((item) =>  inputCitiesTo.value === item.name);
  const formData = {
    from:from ,
    to: to,
    when: inputDateDepart.value
  };

  if(formData.from && formData.to){
    const requestData = `?depart_date=${formData.when}&origin=${formData.from.code}` + `&destination=${formData.to.code}&one_way=true`;
    getData(CALENDAR + requestData, (response) =>{
    renderCheap(response, formData.when);
    });
  } else{
    alert('Enter city');
  }
});

//обработчики событий

inputCitiesFrom.addEventListener('input', ()=>{
    showCity(inputCitiesFrom, dropdownCitiesfrom)
})

inputCitiesTo.addEventListener('input', ()=>{
    showCity(inputCitiesTo, dropdownCitiesTo)
})

dropdownCitiesfrom.addEventListener('click',(event)=>{
  selectCity(event, inputCitiesFrom, dropdownCitiesfrom)
})

dropdownCitiesTo.addEventListener('click', (event)=>{
    selectCity(event, inputCitiesTo, dropdownCitiesTo);
})

// call functions

getData(proxy + citiesApi, (data) => { /* фильтруем пустые значения */
  city = JSON.parse(data).filter((item) => {
      return item.name;
  });
  city.sort(function(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });
});
