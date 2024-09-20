// https://api.weatherapi.com/v1/current.json?key=454d04cf34484737af813324242009&q=Newnan&aqi=no

const temperatureField = document.querySelector('.temp')
const locationField = document.querySelector('.time-location p')
const dateTimeField = document.querySelector('.time-location span')
const weatherField = document.querySelector('.condition p')
const searchField = document.querySelector('.search-area')
const form = document.querySelector('form')

const fetchResults = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=454d04cf34484737af813324242009&q=${targetLocation}&aqi=no`

    const res = await fetch(url);

    const data = await res.json();

    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_f;
    let condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
}

const updateDetails = (temp, locationName, time, condition) => {
    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];
    
    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.textContent = temp;
    locationField.textContent = locationName;
    dateTimeField.textContent = `${splitDate} ${currentDay} ${splitTime}`;
    weatherField.textContent = condition;
}

const searchForLocation = (e) => {
    e.preventDefault();

    let target = searchField.value;

    fetchResults(target);
}

const getDayName = (index) => {
    switch (index) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
}

form.addEventListener('submit', searchForLocation);