/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        /*navigator.geolocation.getCurrentPosition(onSuccess, onError);*/
        $("#catalogo").on("pageshow",function(){
            //alert("ok");
            //$("#ifcatalogo").css("height",$('body').height());
            //loadPage("http://www.bersa.com.ar/pistolas.html");
        });

        $("#mapa").on("pageshow",function(){
            //window.location="maps.html";
            $.getJSON('http://appbersa.com.ar.brainloaded.com.ar/store.php?id=2', function(data){
                if(data){
                    var lat2 = data.latitude;
                    var lon2 = data.longitude;
                    var myLatlng = new google.maps.LatLng(lat2,lon2);
                    var mapOptions = {
                      center: myLatlng,
                      zoom: 15,
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById("mapagoogle"),
                        mapOptions);
                    
                    var image = 'img/bubble.png';  
                    var storeMarker = new google.maps.Marker({
                          position: myLatlng,
                          map: map,
                          icon: image
                    });
                    var image2 = 'img/mipos.png';  
                    var miposMarker = new google.maps.Marker({
                          position: new google.maps.LatLng(lat,lon),
                          map: map,
                          icon: image2
                    });
                }
            })
        })

        $("#stores").on('click','.mapas',function(ev){
            ID = $(this).attr('rel');
        })

        $("#geo").on("pageshow",function(){
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
            $('#stores').hide();
            alert("OK");
        })
        function onSuccess(position){
            $('.buscando').hide();
            alert(JSON.stringify(position));
            alert('no');
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            var distancia = 15;
            alert(lat+" & "+lon);
            $.getJSON('http://appbersa.com.ar.brainloaded.com.ar/cercanos.php?lat='+lat+'&lon='+lon+'&k='+distancia,function(data){
                if(data){
                    $('#stores').empty();
                    $('#stores').show();
                    var renglon = "";
                    $(data.stores).each(function(){
                        renglon  =  '<li><a href="#mapa" rel="' + this.id + '" class="mapas">';
                        renglon +=  '<h2 class="left">' + this.store + ' - <strong>' + this.km + 'Km</strong></h2>';
                        renglon +=  '<p class="left">' + this.address +' - ' + this.location + '</p>'
                        renglon +=  '<span class="pe-7s-map right"></span>'
                        renglon +=  '</a></li>';
                        $('#stores').append(renglon);
                    })
                    $('#stores').listview('refresh');
                }
            })

        }
        
        function onError(error){
            alert("ERROR");
            $('#resgeo').html("<strong>No hemos podido encontrar su ubicación</strong><br><p>Aseguresé de tener activo el GPS</p>");
        }
        //app.receivedEvent('deviceready');
    }/*/*,
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
   // }
};

