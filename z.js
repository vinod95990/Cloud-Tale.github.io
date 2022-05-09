const key="GcP7Vme7Mr5xyrh83fSfteZD2hzzNtCY";


const input=document.querySelector('#ipf');
let search;
const main= document.querySelector('body');
input.focus();
// whole card container
const cloud=document.querySelector('.Cloud');
const card=document.querySelector('.card');
const place=document.querySelector('.place');
const icon=document.querySelector('.icon');
const temp=document.querySelector('.temp');

// getting location key for city
const getlocn=async function getlocn(city){
    
    const response=await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`);
    const data=await response.json();
    return data;
} 

// getting current condition using location key
const curcon=async function (cityKey){
    const lnk=`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${key}`;

    const response=await fetch(lnk);
    const data=response.json();

    return data;
}

// upadting ui
const ui=async function(data)
{   

    if(cloud.classList.contains('hidden'))
    {
        cloud.classList.remove('hidden');
    }
    console.log(data[0]);
    if(data[0].IsDayTime==true)
    {
        card.innerHTML=`<img src="weather_app/img/day.svg" alt="">`;
        if(main.classList.contains('night'))
        {
            main.classList.remove('night');
            main.classList.add('day');
        }
    }
    else
    {
        card.innerHTML=`<img src="weather_app/img/night.svg" alt="">`;
       if(main.classList.contains('day'))
        {
            main.classList.remove('day');
            main.classList.add('night');
        }


    }       
    icon.setAttribute('src',`weather_app/img/icons/${data[0].WeatherIcon}.svg`);
    
    place.innerHTML=search;
    temp.innerHTML=data[0].Temperature.Metric.Value +' °'+ data[0].Temperature.Metric.Unit;

    
   
}

// taking values from user on ENTER
input.addEventListener('keypress',function(e){

    if(e.key=='Enter')
    {
        e.preventDefault();
        const city=input.value.trim();
        search=city;
        input.value='';
        // fetching location

        getlocn(city).then(function(done){
            
            // current condition
            return curcon(done[0].Key);

        }).then(function(resolved){
            // curcon returned
            ui(resolved);
            localStorage.city=search;

        }).catch(function(err){
            
        });
    }
});


if(localStorage.getItem('city')!=null)
{
    getlocn(localStorage.city).then(function(done){
            
        // current condition
        search=localStorage.city;
        return curcon(done[0].Key);

    }).then(function(resolved){
        // curcon returned
        ui(resolved);
        localStorage.city=search;

    }).catch(function(err){
        
    });;
    console.log()
}
else{
    localStorage.setItem('city',`${input.value.trim()}`);
}