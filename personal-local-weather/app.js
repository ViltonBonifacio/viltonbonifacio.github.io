/**
 * Created by Vilton Bonifácio.
 * https://viltonbonifacio.github.io
 */
//Skycons
function makeIcon(icon) {
    function stringChange(string) {
        var arr = string.split("-");
        var joiner = arr.join("_");
        return Skycons[joiner.toUpperCase()];
    }
    var skycons = new Skycons({"color": "#337ab7"});
    skycons.add("icon", stringChange(icon));
    skycons.play();
}

//Background image generator
function backgroundGenerator(icon) {
    var width = document.body.clientWidth,
        height = window.innerHeight,
        body = document.body,
        html = document.documentElement,
        htmlHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    var bodyStyle = document.body.style;

    if (height >= htmlHeight) {
        if (width / height > 1920 / 1111) {
            if (width <= 640) {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_640.jpg')";
                bodyStyle.backgroundSize = width + "px";
                bodyStyle.backgroundRepeat = "no-repeat";
            } else if (width > 640 && width < 1280) {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_1280.jpg')";
                bodyStyle.backgroundSize = width + "px";
                bodyStyle.backgroundRepeat = "no-repeat";
            } else {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_1920.jpg')";
                bodyStyle.backgroundSize = width + "px";
                bodyStyle.backgroundRepeat = "no-repeat";
            }
        } else {
            if (height <= 370) {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_640.jpg')";
                bodyStyle.backgroundSize = "auto " + height + "px";
                bodyStyle.backgroundRepeat = "no-repeat";
            } else if (height > 370 && height < 1111) {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_1280.jpg')";
                bodyStyle.backgroundSize = "auto " + height + "px";
                bodyStyle.backgroundRepeat = "no-repeat";
            } else {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_1920.jpg')";
                bodyStyle.backgroundSize = "auto " + height + "px";
                bodyStyle.backgroundRepeat = "no-repeat";
            }
        }
    } else {
        if (htmlHeight <= 370) {
            bodyStyle.backgroundImage = "url('background images/" + icon + "_640.jpg')";
            bodyStyle.backgroundSize = "auto " + htmlHeight + "px";
            bodyStyle.backgroundRepeat = "no-repeat";
        } else if (htmlHeight > 370 && htmlHeight < 1111) {
            bodyStyle.backgroundImage = "url('background images/" + icon + "_1280.jpg')";
            bodyStyle.backgroundSize = "auto " + htmlHeight + "px";
            bodyStyle.backgroundRepeat = "no-repeat";
        } else {
            bodyStyle.backgroundImage = "url('background images/" + icon + "_1920.jpg')";
            bodyStyle.backgroundSize = "auto " + htmlHeight + "px";
            bodyStyle.backgroundRepeat = "no-repeat";
        }
    }
}

//Weather forecast.
function getWeather(lat, lon) {
    var httpRequestWeather;
    //The request
    httpRequestWeather = new XMLHttpRequest();
    if (!httpRequestWeather) {
        console.log("Cannot creat an XMLHTTP instance.\nError: 003.");
        return false;
    }
    var c = "1cc5afb88c5a65fed0625c8f28671c52/";
    httpRequestWeather.onreadystatechange = weatherAlerts;
    httpRequestWeather.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + c + lat + ',' + lon +
        '?exclude=minutely,hourly,daily,alerts');
    httpRequestWeather.send();

    function weatherAlerts() {
        if (httpRequestWeather.readyState === XMLHttpRequest.DONE) {
            if (httpRequestWeather.status === 200) {
                var weatherResponse = JSON.parse(httpRequestWeather.responseText);
                document.getElementById("temperature").innerHTML = weatherResponse['currently']['temperature'] + ' &#8457;'; //Celsius &#8451;
                document.getElementById("summary").innerHTML = weatherResponse['currently']['summary'];
                document.getElementById("windSpeed").innerHTML = weatherResponse['currently']['windSpeed'] + " mph";
                makeIcon(weatherResponse['currently']['icon']);
                backgroundGenerator(weatherResponse['currently']['icon']);
            } else {
                console.log("There was a problem with the request.\nStatus code: " + httpRequestWeather.status + ".\nError: 004.");
            }
        }
    }
}

function getAddress(lat, lon) {
    var httpRequestAddress = new XMLHttpRequest();

    if(!httpRequestAddress) {
        console.log("Cannot creat an XMLHTTP instance.\nError: 005.");
        return false;
    }

    httpRequestAddress.onreadystatechange = addressAlerts;
    httpRequestAddress.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=AIzaSyDm2TIGA1DNt9Yft_b49CiumRgaq-8GYQ8');
    httpRequestAddress.send();

    function addressAlerts() {
        if (httpRequestAddress.readyState === XMLHttpRequest.DONE) {
            if(httpRequestAddress.status === 200) {
                var addressResponse = JSON.parse(httpRequestAddress.responseText);
                document.getElementById("location").innerHTML = addressResponse['results'][2]['formatted_address'];
            }
        } else {
            console.log("There was a problem with the request.\nStatus code: " + httpRequestAddress.status + ".\nError: 006.");
        }
    }
}
//Coordinates and location
function getCoordinates() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function showPosition(position) {
        var lat;
        var lon;
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        if (lat && lon) {
            getWeather(lat, lon);
            getAddress(lat, lon);
        } else {
            console.log("Error: 05");
        }
    }

    function showErrors(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case  error.UNKNOWN_ERR:
                alert("An unknown error occurrred.");
                break;
        }
    }
    function getCoordinates(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition,showErrors, options);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    getCoordinates();
}

//Change temperature unit
function changeTempUnit() {
    var temp = document.getElementById("temperature").innerHTML.split(" ");
    var wind = document.getElementById("windSpeed").innerHTML.split(" ");

    if (temp[1] === "℉") {
        document.getElementById("temperature").innerHTML = ((temp[0] - 32) * 5 / 9).toFixed(2) + ' &#8451;';
        document.getElementById("changeUnit").innerHTML = "Imperial system";
        document.getElementById("windSpeed").innerHTML = (wind[0] * 1.609344).toFixed(2) + ' Km/h';
    } else {
        document.getElementById("temperature").innerHTML = (temp[0] * 9 / 5 + 32).toFixed(2) + ' &#8457;';
        document.getElementById("changeUnit").innerHTML = "Metric system";
        document.getElementById("windSpeed").innerHTML = (wind[0] / 1.609344).toFixed(2) + ' mph';
    }
}