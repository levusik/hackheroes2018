var position = null;
var sock = null;

// register map
mapboxgl.accessToken = 'pk.eyJ1IjoiYWNoZSIsImEiOiJjam5kYXhibW8xODRxM3JwOHhhamxodG92In0.BSenCD_4t1MyCOZw-fP7Ow';


function getLocation(_position) {
    position = _position;
    console.log(_position);
    sock.emit('handshake', {"pos": _position['']});
}
function respondToErrors(error)
{
    switch(error.code)
    {
        case error.PERMISSION_DENIED:
        break;
    case error.POSITION_UNAVAILABLE:
        break;
    case error.TIMEOUT:
        break;
    case error.UNKNOWN_ERROR:
        break;
    }
}

// register modal component
Vue.component('contact', {
    template: '#contact-template'
});

Vue.component('maps', {
    template: "#map-template",
    data: function () {
        return {
            active: false,
            header: "Panel Sterowania",
            map: null,
            settings: []
        }
    },
    methods: {

    },
    created: function () {
        console.log("created maps");
    },
    mounted: function () {
        /*this.map = new google.maps.Map(this.$refs['map_ref'], {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 8
        });*/
        this.map = new mapboxgl.Map({
            container:'map', 
            style: 'mapbox://styles/mapbox/streets-v10'
        });
        console.log(this.map);
        console.log(this.$refs['map_ref']);
        

        /*this.informAboutLocalisation('green', "Lokalizacja", "Czy twoja lokalizacja to x,y ( z ) ?", 
        () => {console.log('accepted');},
        () => {console.log('denied');});*/
        console.log("mounted maps");
        this.panel_name = header;
    }
});

new Vue({
    el: "#app",
    data: {
        showModal: false,
        showMaps: false,
        socket: null,
        sliders: [{
                title: "Turystyka",
                message: "Obcuj z kulturą na zupełnie nowym poziomie !",
                url: '../static/img/1920x1080/T02.jpg',
                id: 'button_id_1',
                openMap: "Testu 123"
            },
            {
                title: "Kultura",
                message: "lolz2",
                url: '../static/img/1920x1080/T01.jpg',
                id: "button_id_2",
                openMap: "utest 321"
            }
        ],
        big_title: "O Projekcie",
        filter_title: "Czego szukasz ?",
        filter_all: "Wszystko",
        filter_cinema: "Kino",
        filter_food: "Jedzenie",
        filter_festivals: "Festyny",
        filter_culture: "Kultura",
        gallery_items: [{
                style: "s-portfolio__item cbp-item Filter_Cinema",
                img_src: "../static/img/970x647/cinema.jpg",
                title: "kino",
                description: "Gdzie i co obejrzeć?"
            },
            {
                style: "s-portfolio__item cbp-item Filter_Food",
                img_src: "../static/img/970x647/food.jpg",
                title: "tytuł 2",
                description: "description 2"
            },
            {
                style: "s-portfolio__item cbp-item Filter_Festivals",
                img_src: "../static/img/970x647/concert.jpg",
                title: "tytuł 3",
                description: "description 3"
            },
            {
                style: "s-portfolio__item cbp-item Filter_Culture",
                img_src: "../static/img/970x647/tourists.jpg",
                title: "tytuł 4",
                description: "description 4"
            },
            {
                style: "s-portfolio__item cbp-item Filter_Culture",
                img_src: "../static/img/970x647/muzeum.jpg",
                title: "tytuł 5",
                description: "description 5"
            },
        ],
        explore_text: "Odkrywaj swoje miasto na nowo z nami",
        articles: [{
                src: "../static/img/1024x/food.jpg",
                title: "O Projekcie",
                subtitle: "Jedzenie",
                text: "propaganda1"
            },
            {
                src: "../static/img/1024x/city.jpg",
                title: "O Projekcie",
                subtitle: "Miasto",
                text: "propaganda2"
            },
            {
                src: "../static/img/1024x/movie.jpg",
                title: "O Projekcie",
                subtitle: "Kino",
                text: "propaganda3"
            }
        ],
        figures: [{
                id: "1",
                suffix: "k",
                text: "xd"
            },
            {
                id: "2",
                suffix: "k",
                text: "xdd"
            },
            {
                id: "3",
                suffix: "k",
                text: "xddd"
            },
            {
                id: "4",
                suffix: "k",
                text: "xdddd"
            }
        ]
    },
    delimiters: ['[%', '%]'],
    methods: {
        informAboutLocalisation: function(_color, _title, _text, _accept_callback, _cancel_callback)
        {
            this.$vs.dialog({
                type:   'confirm',
                color:  _color,
                title:  _title,
                text:   _text,
                accept: _accept_callback,
                cancel: _cancel_callback
            });
        },
        openMapWithFilter: function(filter)
        {
            console.log(filter);
            this.showMaps = true;
        }
        

    },
    created: function () {
        this.socket = io.connect('http://' + document.domain + ':' + location.port);
        // get geolocation
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(getLocation, respondToErrors, 
                                                    {enableHighAccuracy: true });
            this.socket.emit('handshake');
            sock = this.socket;
        } else {
        }

    }
});