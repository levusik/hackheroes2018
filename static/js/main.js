var position = null;
var sock = null;

// register map
mapboxgl.accessToken = 'pk.eyJ1IjoiYWNoZSIsImEiOiJjam5kYXhibW8xODRxM3JwOHhhamxodG92In0.BSenCD_4t1MyCOZw-fP7Ow';


function getLocation(_position) {
    position = _position;
    console.log(_position);
    sock.emit('handshake', {
        "pos": _position['']
    });
}

function respondToErrors(error) {
    switch (error.code) {
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
            settings: [],
            street_view: 'streets'
        }
    },
    methods: {
        log: function (txt) {
            console.log(txt);
        }
    },
    created: function () {
        console.log("created maps");
    },
    mounted: function () {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9'
        });


        /*this.informAboutLocalisation('green', "Lokalizacja", "Czy twoja lokalizacja to x,y ( z ) ?", 
        () => {console.log('accepted');},
        () => {console.log('denied');});*/
        this.panel_name = header;
    }
});

new Vue({
    el: "#app",
    data: {
        activeGeoPrompt: false,
        location: "Torun",
        showModal: false,
        showMaps: false,
        socket: null,
        sliders: [{
                title: "", // "Kultura",
                message: "Obcuj z kulturą na zupełnie nowym poziomie...",
                url: '../static/img/1920x1080/T04.jpg',
                id: "button_id_2",
                openMap: "utest 321"
            }, {
                title: "", // : "Turystyka",
                message: "Poznaj swoje miasto na nowo...",
                url: '../static/img/1920x1080/T02.jpg',
                id: 'button_id_1',
                openMap: "Testu 123"
            },
            {
                title: "", // "Restauracje",
                message: "Szukaj nowych miejsc...",
                url: '../static/img/1920x1080/T03.jpg',
                id: "button_id_3",
                openMap: "utest 321"
            },
            {
                title: "", // "Kino" ,
                message: "Bądź na bieżąco...",
                url: '../static/img/1920x1080/T01.jpg',
                id: "button_id_4",
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
                title: "Kino",
                description: "Bądź z nami na bieżąco w repertuarze kina ! Na podstawie twojej lokalizacji, znajdziemy kina w twojej okolicy i przedstawimy Ci oceny z topowych baz danych związanych z ocenaniem filmów ! Kliknij poniżej aby zacząć."
            },
            {
                style: "s-portfolio__item cbp-item Filter_Food",
                img_src: "../static/img/970x647/food.jpg",
                title: "Restauracje",
                description: " Na podstawie recenzji użytkowników i twojej lokalizacji podpowiemy do której restauracji możecie się udać by mieć świetny czas. Klikij by zacząć."
            },
            {
                style: "s-portfolio__item cbp-item Filter_Festivals",
                img_src: "../static/img/970x647/concert.jpg",
                title: "Festyny",
                description: "Wyrwij się z życiowej rutyny, nie siedź w domu i baw się ze znajomymi na festynach w całej polsce ! Na podstawie twojej lokalizacji i danych publicznych ze stron miasta podpowiemy kiedy i gdzie odbędzie się festyny i wydarzenia kulturalne. Klikij by zacząć."
            },
            {
                style: "s-portfolio__item cbp-item Filter_Culture",
                img_src: "../static/img/970x647/tourists.jpg",
                title: "Turystyka",
                description: "Poznaj swoje miasto na nowo ! Na podstawie danych publicznych o zabytkach, podpowiemy co można ciekawego jeszcze zobaczyć w twoim mieście. Klikij by zacząć."
            },
            {
                style: "s-portfolio__item cbp-item Filter_Culture",
                img_src: "../static/img/970x647/muzeum.jpg",
                title: "Sztuka",
                description: "Zachwyć się sztuką i kulturą ! dzięki danym publicznym podpowiemy gdzie znajdują się muzea i wystawy w twojej okolicy. Klikij by zacząć."
            },
            {
                style: "s-portfolio__item cbp-item Filter_Culture",
                img_src: "../static/img/970x647/explore.jpg",
                title: "Zwiedzaj z UE",
                description: "Zobacz jak dofinansowania z Unii Europejskiej kształtują naszą rzeczywistość! Poprzez dane dotyczące dofinansowań, pokażemy Ci na mapie, co UE wprowadziła nowego do twojego życia. Klikij by zacząć."
            }
        ],
        explore_text: "Odkrywaj swoje miasto na nowo z nami",
        articles: [{
                src: "../static/img/1024x/food.jpg",
                title: "O Projekcie",
                subtitle: "Jedzenie",
                text: "Znajdź z nami swoje nowe, ulubione miejsce w którym spędzisz niezapomniany czas z przyjaciółmi ! Na podstawie recenzji użytkowników i danych publicznych, podpowiemy gdzie świetnie zjeść, spotkać się z przyjaciółmi oraz spędzić czas w fenomenalnej atomsferze !"
            },
            {
                src: "../static/img/1024x/city.jpg",
                title: "O Projekcie",
                subtitle: "Miasto",
                text: "Odkryj życie kulturalne w swoim mieście ! Cały świat pełen sztuki, festynów i koncertów czeka żebyś go odkrył. Dzięki danym publicznym przedstawimy wam listę muzeów, galerii sztuki, festynów i koncertów w twojej okolicy !"
            },
            {
                src: "../static/img/1024x/movie.jpg",
                title: "O Projekcie",
                subtitle: "Kino",
                text: "Sprawdź gdzie i co możesz objerzeć w kinie ! Korzystając z danych publicznych zarekomendujemy Ci najciekawsze i najlepiej oceniane filmy, które aktualnie są wyświetlane w kinie w twojej okolicy."
            }
        ],
        figures: [{
                id: "941",
                suffix: " miast",
                text: "w naszej bazie danych"
            },
            {
                id: "0",
                suffix: "kin",
                text: "w naszej bazie danych"
            },
            {
                id: "0",
                suffix: "zabytków",
                text: "w naszej bazie danych"
            },
            {
                id: "0",
                suffix: "festynów",
                text: "w naszej bazie danych"
            }
        ]
    },
    delimiters: ['[%', '%]'],
    methods: {
        informAboutLocalisation: function (_color, _title, _text, _accept_callback, _cancel_callback) {
            this.$vs.dialog({
                type: 'confirm',
                color: _color,
                title: _title,
                text: _text,
                accept: _accept_callback,
                cancel: _cancel_callback
            });
        },
        openMapWithFilter: function (filter) {
            console.log(filter);
            this.showMaps = true;
        },
        localisationSetted: function (str) {
            this.$vs.notify({
                title: 'Lokalizacja Ustawiona !',
                text: 'Ustawilismy twoją lokalizację na : ',
                color: 'success',
                icon: 'check'
            });
        }
    },
    created: function () {
        this.activeGeoPrompt = false;
        this.socket = io.connect('http://' + document.domain + ':' + location.port);
    },
    mounted: function () {
        // get geolocation
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(getLocation, respondToErrors, {
                enableHighAccuracy: true
            });
            this.socket.emit('handshake');
            sock = this.socket;

        } else {}
    }
});