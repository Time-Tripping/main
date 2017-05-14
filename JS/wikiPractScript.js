/**
 * Created by melodytempleton on 5/14/17.
 */
/**
 * Created by melodytempleton on 5/10/17.
 */
$(document).ready(function () {


    var latitude =28;
    var longitude = 46;
    var title ="";
    var verbage = "";
    var link = "";
    var map ="";
    var searchterm;

    function makeAMakerandWindow (title, verbage, link, latitude, longitude, i) {
        var center = new google.maps.LatLng(latitude, longitude);
        latitude =  center.lat() + (0.001 * i);
        longitude = center.lng() + (0.001 * i);
        var contentstring = "<div><h1 id='firstHeading' class='firstHeading'>"+title+"</h1>"+
            "<div id='bodyContent'>"+
            "<p>"+verbage+"</p>" +
            "<p>Attribution: <a href='"+link+"'>"+link+"</a></p></div>";


        var infowindow = new google.maps.InfoWindow({
            content: contentstring
        });

        var marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map: map,
            title: "title"
        });

        // marker.addListener('click', function() {
        infowindow.open(map, marker);
        // });

    }
    function openSearch() {

        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchterm+"&prop=titlesnippet&format=json&callback=?";

        $.ajax({

            type:"GET",
            url:url,
            async:false,
            dataType:"json",
            success: function(data){
                console.log(data);

                for(var i = 0; i < data[3].length; i++)
                {
                    title = data[1][i];
                    verbage = data[2][i];
                    link = data[3][i];
                    makeAMakerandWindow(title, verbage, link, latitude, longitude, i);
                }

            },
            error: function (errorMessage) {
                alert("error");
            }
        });


    }


    initMap();
    $("#submit").click(function () {


        var location = $("#searchlocation").val();
        var details = $("#details").val();
        searchterm = location + " " + details;
        searchterm = searchterm.split(" ");
        searchterm = searchterm.join("+");


        var geocode = new google.maps.Geocoder();
        geocode.geocode({ "address": location }, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();

                var mapOptions = {
                    zoom: 15,
                    center: {lat: latitude, lng: longitude}
                }

                map = new google.maps.Map(document.getElementById('map'), mapOptions);



            } else {
                alert("Geocoding was not successful - STATUS: " + status);
            }
        });

        openSearch();

        url = " https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+searchterm+"&prop=info&inprop=url&format=json&callback=?";

        $.ajax({

            type:"GET",
            url:url,
            async:false,
            dataType:"json",
            success: function(data){
                console.log(data);
                for (var i = 0; i < Object.keys(data.query.pages).length; i++) {
                    searchterm = data.query.pages[Object.keys(data.query.pages)[i]].title;
                    openSearch();
                }
            },
            error: function (errorMessage) {
                alert("error");
            }
        });


    });

    function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center:  {lat: latitude, lng: longitude}
        });

        // var contentString = '<div id="content">'+
        //     '<div id="siteNotice">'+
        //     '</div>'+
        //     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        //     '<div id="bodyContent">'+
        //     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        //     'sandstone rock formation in the southern part of the '+
        //     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        //     'south west of the nearest large town, Alice Springs; 450&#160;km '+
        //     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        //     'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        //     'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        //     'Aboriginal people of the area. It has many springs, waterholes, '+
        //     'rock caves and ancient paintings. Uluru is listed as a World '+
        //     'Heritage Site.</p>'+
        //     '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        //     'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        //     '(last visited June 22, 2009).</p>'+
        //     '</div>'+
        //     '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: "hi"
        });

        var marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map: map,
            title: 'Uluru (Ayers Rock)'
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }


    initMap();



});

// var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch="+searchterm+"&gsrlimit=10&prop=titlesnippet&callback=";
// var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+searchterm+"&srwhat=text&srprop=snippet|titlesnippet|sectiontitle|sectionsnippet&format=json&callback=?";
// api.php?action=opensearch&search=Te
//api.php?action=query&list=search&srsearch=wikipedia&srwhat=text&srprop=timestamp&continue= [try in ApiSandbox]
//     var url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&format=json&exintro=&titles=Cairns%20Customs%20House&piprop=thumbnail&pithumbsize=380&callback=jsonp_1462667223891_5118"
// var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srwhat=text&srsearch="+searchterm+"&srprop=snippet|titlesnippet|sectiontitle|sectionsnippet&origin=*&format=json&callback=?";
//
// var url = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+searchterm+"&prop=info&inprop=url&format=json&callback=?";