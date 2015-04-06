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
        var swiper;
        var swiper2;
        var lat;
        var lon;

        //PREVENT SWIPE PANEL IN SLIDER
       // var menu_available = true;

       // $(document).on("swiperight", function(event, ui) {
        //    if (menu_available) $("#mygeo").panel("open");
        //});

       // $("#slider-2").on("slidestop", function( event, ui ) { 
            //menu_available = false;
            //window.setTimeout(function() {menu_available= true;},250);
        //}); 

        //INICIO
        $('#ifcatalogo').css('height',$('body').height()+100);
            swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true
            });
        $('.ui-content').delay(1000).removeClass('hide');
        //

        $("body").on('click','.logo-wh',function(event){
            event.preventDefault();
            $.mobile.navigate("#pagemenuppal");
            console.log('ir al home');
        });
        //$("#mypanel").panel();
        $("#pagemenuppal").on("pageshow",function(){
                
        })
        $("#catalogo").on("pageshow",function(){

        });

        $("#detail").on("pageshow",function(){
            swiper2 = null;
            //if(swiper2==null){
                swiper2 = new Swiper('.swiper-container-detail', {
                    pagination: '.swiper-pagination-detail',
                    paginationClickable: true,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev'
                });
            //}
        })

        $("#mapa").on("pageshow",function(){
            //window.location="maps.html";
            $.getJSON('http://appbersa.com.ar.brainloaded.com.ar/store.php?id='+ID, function(data){
                if(data){
                    var lat2 = data.latitude;
                    var lon2 = data.longitude;
                    var myLatlng = new google.maps.LatLng(lat2,lon2);
                    var mapOptions = {
                      center: myLatlng,
                      zoom: 12,
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
                    $("#namestore").empty().html(data.store);
                    $("#locationstore").empty().html(data.location);
                    $("#addressstore").empty().html(data.address);
                }
            })
        })

        $('#catalogo').on('click','.pistola',function(ev){
            var url = "";
            url += $(this).attr('rel');
            url +=".html";
            $("#contenido").empty();
            $.get(url,{},function(exito){
                if(exito){
                    $('#contenido').html(exito);
                    $.mobile.navigate('#detail');
                }
            }).fail(function(error){
                //alert(JSON.stringify(error));
                alert("No se pudo cargar la página");
            })
        })

        $("#stores").on('click','.mapas',function(ev){
            ID = $(this).attr('rel');
        })

        $("#geo").on("pageshow",function(){
            $('#stores').hide();
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
            $('#resgeo').hide();
            $( "#slider-2" ).on( 'slidestop', function( event ) {
                tiendasCercanas();
                $("#mygeo").panel('close');
            });
        })
        function onSuccess(position){
            $('.buscando').hide();
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            tiendasCercanas();
        }
        function onError(error){
            alert("<strong>No hemos podido encontrar su ubicación</strong><br><p>Aseguresé de tener activo el GPS</p>");
        }
        function tiendasCercanas(){
            var distancia = $('#slider-2').val();
            console.log(lat+" & "+lon);
            $.getJSON('http://appbersa.com.ar.brainloaded.com.ar/cercanos.php?lat='+lat+'&lon='+lon+'&k='+distancia,function(data){
                if(data){
                    $('#stores').empty();
                    $('#stores').show();
                    $('#resgeo').show();
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
            }).fail(function(error){
                $.getJSON('http://appbersa.com.ar.brainloaded.com.ar/cercanos.php?lat='+lat+'&lon='+lon+'&k='+distancia,function(data){
                if(data){
                    $('#stores').empty();
                    $('#stores').show();
                    var renglon = "";
                    $(data.stores).each(function(){
                        renglon  =  '<li><a href="#mapa" rel="' + this.id + '" class="mapas">';
                        renglon +=  '<h2 class="left">' + this.store + ' - <strong>' + this.km + 'Km</strong></h2><br>';
                        renglon +=  '<p class="left">' + this.address +' - ' + this.location + '</p>'
                        renglon +=  '<span class="pe-7s-map right"></span>'
                        renglon +=  '</a></li>';
                        $('#stores').append(renglon);
                    })
                    $('#stores').listview('refresh');
                }
                }).fail(function(error){
                    alert("Error de conexión con el servidor.");
                })
            })
        }
    }
};

