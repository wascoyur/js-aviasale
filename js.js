const formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
dropdownCitiesfrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
inputDateDepart = document.querySelector('input__date-depart');

let city =[];

const citiesApi = 'db/cities.json';

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
    const filterCity = city.filter((item, i, arr) => {
      if (item.name) {
        const it = item.name.toLowerCase();
        let r = it.includes(input.value.toLowerCase());
        return r;
      }

    });

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

const handlerCity = (event, input, list) => {
  const target = event.target;
  if (target.tagName.toLowerCase() === "li") {
    inputCitiesFrom.value = target.textContent;
    dropdownCitiesfrom.textContent = "";
  }
};

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

getData(citiesApi, (data) => {
  city = JSON.parse(data).filter((item) => {
      return item.name;
  });
});
