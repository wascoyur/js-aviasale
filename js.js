const formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
dropdownCitiesfrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
inputDateDepart = document.querySelector('input__date-depart');

const city = ['Москва', 'Санкт-Петербург', 'Минск', 'Караганда', 'Челябинск', 'новгород','Калининград',
'Волгоград', 'Самара', 'Керчь'];

const showCity = (input, list) => {
  list.textContent = "";

  if (input.value !== "") {
    const filterCity = city.filter((item, i, arr) => {
      const it = item.toLowerCase();
      let r = it.includes(input.value.toLowerCase());
      return r;
    });

    filterCity.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("dropdown__city");
      li.textContent = item;
      list.append(li);
      console.log(li);
    });
  }
};
const selectCity = (input, list) => {
  list.textContent = "";

  if (input.value !== "") {
    const filterCity = city.filter((item, i, arr) => {
      const it = item.toLowerCase();
      let r = it.includes(input.value.toLowerCase());
      return r;
    });

    filterCity.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("dropdown__city");
      li.textContent = item;
      list.append(li);
      console.log(li);
    });
  }
};


inputCitiesFrom.addEventListener('input', ()=>{
    showCity(inputCitiesFrom, dropdownCitiesfrom)
})

inputCitiesTo.addEventListener('input', ()=>{
    showCity(inputCitiesTo, dropdownCitiesTo)
})

dropdownCitiesfrom.addEventListener('click', (event)=>{
    const target = event.target;
    if(target.tagName.toLowerCase() ==='li'){
        inputCitiesFrom.value = target.textContent;
        dropdownCitiesfrom.textContent = '';
    }
})
dropdownCitiesTo.addEventListener('click', (event)=>{
    const target = event.target;
    if(target.tagName.toLowerCase() ==='li'){
        inputCitiesTo.value = target.textContent;
        dropdownCitiesTo.textContent = '';
    }
})
