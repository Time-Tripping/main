/**
 * Created by melodytempleton on 5/14/17.
 */
/**
 * Created by melodytempleton on 5/12/17.
 */
$(document).ready(function () {



    var map;
    var markers={};
    var database = [
        {
            item: 1,
            dateMonth: 9,
            dateYear: 1970,
            latitude: 42.8922259,
            longitude: -83.4137237,
            zoom: 5,
            title: "<h3>I was born in Flint, MI</h3>",
            displayDate: "May 15, 1970",
            verbage: "<p>I was supposed to be named Colleen, but when my mom saw me, she didn't think I looked like a Colleen.</p>",
            image: "<img src=''>",
            markerid: ""
        },
        {
            item: 2,
            dateMonth: 9,
            dateYear: 1976,
            latitude: 43.1545049,
            longitude: -83.6444737,
            zoom: 5,
            title: "<h3>I went to elementary school in a tiny town called Columbiaville.</h3>",
            displayDate: "1975-1981",
            verbage: "<p>Current population inside village limits is under 800 people</p>",
            image: "<img src=''>",
            markerid: ""
        },
        {
            item: 3,
            dateMonth: 9,
            dateYear: 1982,
            latitude: 43.0541748,
            longitude: -83.4500596,
            zoom: 5,
            title: "<h3>When I was 12 we moved to Lapeer</h3>",
            displayDate: "1982",
            verbage: "<p>I attended Zimmer Jr. High and then Lapeer West High School</p>",
            image: "<img src=''>",
            markerid: ""
        },
        {
            item: 4,
            dateMonth: 9,
            dateYear: 1988,
            latitude: 43.0498234,
            longitude: -83.3410808,
            zoom: 5,
            title: "<h3>I graduated from Highschool in 1988</h3>",
            displayDate: "1988",
            verbage: "<p>Not much to say here</p>",
            image: "<img src=''>",
            markerid: ""
        },
        {
            item: 5,
            dateMonth: 9,
            dateYear: 1989,
            latitude: 42.2742637,
            longitude: -85.6671884,
            zoom: 5,
            title: "<h3>I went to college at Western Michigan University</h3>",
            displayDate: "1988-1992",
            verbage: "<p>Good Times</p>",
            image: "<img src=''>",
            markerid: ""
        },
        {
            item: 6,
            dateMonth: 9,
            dateYear: 1993,
            latitude: 42.4798059,
            longitude: -83.2952279,
            zoom: 5,
            title: "<h3>I started working for UCS in 1993</h3>",
            displayDate: "1993-2005",
            verbage: "<p>For the first 2 years I lived with my parents and drove to Southfield when not travelling </p>",
            image: "<img src=''>",
            markerid: ""
        }
    ];



    var upperYearRange = 1975;
    var lowerYearRange = 1970;


    function addMarker(location, map, contentString, i) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        marker.gm_accessors_.id = i;
        database[i].markerid = marker;
        // marker.metadata = {type: "point", id: i};
        console.log(marker);
        // database[i].markerid = id;
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        infowindow.open(map, marker);
    }
    var delMarker = function (i) {
        marker = database[i].markerid;
        marker.setMap(null);
    }

// Sets the map on all markers in the array.
    function setMapOnAll(i, map) {
        database[i].markerid.setMap(map);
        console.log(markers[id]);
    }


// Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }
    function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: {lat: 42.7087864, lng: -84.629072},
            scrollwheel: false
        });
        for (var i =0; i< database.length; i++){
            if (database[i].dateYear>=lowerYearRange && database[i].dateYear<=upperYearRange) {
                contentString = database[i].title + "<br>" + database[i].verbage;
                addMarker({lat: database[i].latitude, lng: database[i].longitude}, map, contentString, i);
            }
        }


    }



    initMap();

    // if (target.addEventListener) {
    //     target.addEventListener(eventName, handlerName, false);
    // } else if (target.attachEvent) {
    //     target.attachEvent("on" + eventName, handlerName);
    // } else {
    //     target["on" + eventName] = handlerName;
    // }
    var myMap = document.getElementById("map");

    if (myMap.addEventListener) {
        // IE9, Chrome, Safari, Opera
        myMap.addEventListener("mousewheel", MouseWheelHandler, false);
        // Firefox
        myMap.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    }
// IE 6/7/8
    else {myMap.attachEvent("onmousewheel", MouseWheelHandler);}

    function MouseWheelHandler(e) {

        // cross-browser wheel delta
        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        upperYearRange = upperYearRange - (1 * delta);
        lowerYearRange = lowerYearRange - (1 * delta);
        console.log(upperYearRange);
        console.log(lowerYearRange);
        for (var i =0; i< database.length; i++) {

            if ((database[i].dateYear < lowerYearRange || database[i].dateYear > upperYearRange) && database[i].markerid!="") {
                delMarker(i);
                console.log(database[i].markerid);
                database[i].markerid = "";
            }
            else if (database[i].dateYear >= lowerYearRange && database[i].dateYear <= upperYearRange && database[i].markerid=="") {

                contentString = database[i].title + "<br>" + database[i].verbage;
                addMarker({lat: database[i].latitude, lng: database[i].longitude}, map, contentString, i);
            }
        }

        return false;
    }

});