//keys
let api_key = 'a4d03999bed35279f6488dcf5b48ef3b';
let city_id = '4502103';

//first request – current weather data
let request1 = new XMLHttpRequest();
request1.open("GET", "https://api.openweathermap.org/data/2.5/weather?id=" + city_id + "&units=imperial&appid=" + api_key + "");
request1.send();
request1.onload = () => {
	//console.log(request1);
	if ( request1.status === 200 ){
		//console.log(JSON.parse(request.response));

		//main object
		let data = JSON.parse(request1.response);
		//console.log(data);

		//set town name
		let town = data.name;

		//current temp
		let temp = data.main.temp;
		let currentTemp = Math.round(temp);

		//current temp
		let desc = data.weather[0].description;

		//weather icon
		let icon = data.weather[0].icon;
		let iconImgLink = 'http://openweathermap.org/img/wn/'+ icon +'@2x.png';

		//display town name & current temp
		document.querySelector('.townName').innerHTML = town;			
		document.querySelector('.currentTemp').innerHTML = currentTemp + '&deg;F';
		document.querySelector('.description').innerHTML = desc;
		document.querySelector('.icon').innerHTML = '<img src="'+ iconImgLink +'" />';

	} else {
		console.log(`error ${request.status} ${request.statusText}`);
	}
}

//second request – upcoming weather data
let request2 = new XMLHttpRequest();
request2.open("GET", "https://api.openweathermap.org/data/2.5/onecall?lat=39.891499&lon=-75.037666&exclude=current,minutely&units=imperial&appid=" + api_key + "");
request2.send();
request2.onload = () => {

	if ( request2.status === 200 ){

		let dailyData = JSON.parse(request2.response);
		//console.log(dailyData);

		let hourly = dailyData.hourly;

		var j;
		for (j = 0; j < hourly.length; j++) {

			if( j < 24 ){

				let hourTemp = Math.round(hourly[j].temp);

				let hourIcon = hourly[j].weather[0].icon;
				let iconImgLink = 'http://openweathermap.org/img/wn/'+ hourIcon +'@2x.png';

				//create list items with daily temperatures
				let listItem = document.createElement("LI");
				listItem.innerHTML = "<span class='icon-hourly'><img src=" + iconImgLink + " /></span><span class='hourTemp'>" + hourTemp + "</span>";
				document.querySelector(".hourly").appendChild(listItem);				

			}

		}

		let weather = dailyData.daily;
		//console.log(weather);

		var i;
		for (i = 0; i < weather.length; i++) {

			let timestamp = weather[i].dt * 1000;
			let date = new Date(timestamp);
			let day = date.getDay();

			let dayofweek;

			switch (day) {
			  case 0:
			    dayofweek = "Sunday";
			    break;
			  case 1:
			    dayofweek = "Monday";
			    break;
			  case 2:
			     dayofweek = "Tuesday";
			    break;
			  case 3:
			    dayofweek = "Wednesday";
			    break;
			  case 4:
			    dayofweek = "Thursday";
			    break;
			  case 5:
			    dayofweek = "Friday";
			    break;
			  case 6:
			    dayofweek = "Saturday";
			}

			//daily temperatures
			let temps = weather[i].temp.day;
			let dailyTemp = Math.round(temps);

			//weather icon
			let icon = weather[i].weather[0].icon;
			let iconImgLink = 'http://openweathermap.org/img/wn/'+ icon +'@2x.png';

			//create list items with daily temperatures
			let listItem = document.createElement("LI");
			listItem.innerHTML = "<span class='day'>" + dayofweek + "</span><span class='icon-small'><img src=" + iconImgLink + " /></span><span>" + dailyTemp + "&deg;F</span>";
			document.querySelector(".dailyTemps").appendChild(listItem);

		}			

	} else {
		console.log(`error ${request2.status} ${request2.statusText}`);
	}
}