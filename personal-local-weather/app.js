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
        htmlHeight = document.getElementById("height").scrollHeight;
    var bodyStyle = document.body.style;

    if (height >= htmlHeight) {
        if (width / height > 1920 / 1111) {
            if (width <= 640) {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_640.jpg')";
                bodyStyle.backgroundSize = width + "px";
            } else if (width > 640 && width < 1280) {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_1280.jpg')";
                bodyStyle.backgroundSize = width + "px";
            } else {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_1920.jpg')";
                bodyStyle.backgroundSize = width + "px";
            }
        } else {
            if (height <= 370) {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_640.jpg')";
                bodyStyle.backgroundSize = "auto " + height + "px";
            } else if (height > 370 && height < 1111) {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_1280.jpg')";
                bodyStyle.backgroundSize = "auto " + height + "px";
            } else {
                bodyStyle.backgroundImage = "url('background images/" + icon + "_1920.jpg')";
                bodyStyle.backgroundSize = "auto " + height + "px";
            }
        }
    } else {
        if (htmlHeight <= 370) {
            bodyStyle.backgroundImage = "url('background images/" + icon + "_640.jpg')";
            bodyStyle.backgroundSize = "auto " + htmlHeight + "px";
        } else if (htmlHeight > 370 && htmlHeight < 1111) {
            bodyStyle.backgroundImage = "url('background images/" + icon + "_1280.jpg')";
            bodyStyle.backgroundSize = "auto " + htmlHeight + "px";
        } else {
            bodyStyle.backgroundImage = "url('background images/" + icon + "_1920.jpg')";
            bodyStyle.backgroundSize = "auto " + htmlHeight + "px";
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

    httpRequestWeather.onreadystatechange = weatherAlerts;
    httpRequestWeather.open('GET', 'https://crossorigin.me/https://api.darksky.net/forecast/b1cdd0cd5d6306f2f8fdbedbb543a699/' +
        lat +
        ',' +
        lon +
        '?exclude=minutely,hourly,daily,alerts');
    httpRequestWeather.send();

    function weatherAlerts() {
        if (httpRequestWeather.readyState === XMLHttpRequest.DONE) {
            if (httpRequestWeather.status === 200) {
                var weatherResponse = JSON.parse(httpRequestWeather.responseText);
                backgroundGenerator(weatherResponse['currently']['icon']);
                document.getElementById("temperature").innerHTML = weatherResponse['currently']['temperature'] + ' &#8457;'; //Celsius &#8451;
                document.getElementById("summary").innerHTML = weatherResponse['currently']['summary'];
                document.getElementById("windSpeed").innerHTML = weatherResponse['currently']['windSpeed'] + " mph";
                makeIcon(weatherResponse['currently']['icon']);
            } else {
                console.log("There was a problem with the request.\nStatus code: " + httpRequestWeather.status + ".\nError: 004.");
            }
        }
    }
}

//Coordinates and location
function getAddress() {
    var httpRequestIP;

    //The request
    httpRequestIP = new XMLHttpRequest();
    if (!httpRequestIP) {
        console.log("Cannot creat an XMLHTTP instance.\nError: 001.");
        return false;
    }
    httpRequestIP.onreadystatechange = IPAlerts;
    httpRequestIP.open('GET', 'https://crossorigin.me/http://ip-api.com/json');
    httpRequestIP.send();

    //Alerts
    function IPAlerts() {
        if (httpRequestIP.readyState === XMLHttpRequest.DONE) {
            if (httpRequestIP.status === 200) {
                var IPResponse = JSON.parse(httpRequestIP.responseText);
                document.getElementById("location").innerHTML = IPResponse['city'] + ", " + IPResponse['regionName'] + " - " + IPResponse['countryCode'];
                var lat = IPResponse['lat'].toString();
                var lon = IPResponse['lon'].toString();
                getWeather(lat,lon);
            }
        } else {
            console.log("There was a problem with the request.\nStatus code: " + httpRequestIP.status + '.\nError: 002.');
        }
    }

}

//Change temperature unit
function changeTempUnit() {
    var temp = document.getElementById("temperature").innerHTML.split(" ");
    var temperature = document.getElementById("temperature").innerHTML;
    if (temp[1] === "℉") {
        document.getElementById("temperature").innerHTML = ((temp[0] - 32) * 5 / 9).toFixed(2) + ' &#8451;';
        document.getElementById("changeUnit").innerHTML = "&#8457;";
    } else {
        document.getElementById("temperature").innerHTML = (temp[0] * 9 / 5 + 32).toFixed(2) + ' &#8457;';
        document.getElementById("changeUnit").innerHTML = "&#8451;";
    }
}

//Change Wind Speed Unit
function changeWSUnit() {
    var temp = document.getElementById("windSpeed").innerHTML.split(" ");
    if (temp[1] === "mph") {
        document.getElementById("windSpeed").innerHTML = (temp[0] * 1.609344).toFixed(2) + ' Km/h';
        document.getElementById("changeWS").innerHTML = "mph";
    } else {
        document.getElementById("windSpeed").innerHTML = (temp[0] / 1.609344).toFixed(2) + ' mph';
        document.getElementById("changeWS").innerHTML = "Km/h";
    }
}