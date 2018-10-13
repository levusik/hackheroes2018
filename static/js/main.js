// register modal component
Vue.component('contact', {
    template: '#contact-template'
  });  

  Vue.component('maps', {
    template: "#map-template",
    data: function()
    {
        return {
            active: false
        }
    }
  });

new Vue({
    el: "#app",
    data: 
    {
        showModal: false,
        showMaps: false,
        socket: null,
        sliders: [
            { title: "Turystyka", message: "Obcuj z kulturą na zupełnie nowym poziomie !", url:'../static/img/1920x1080/T02.jpg', id:'button_id_1' },
            { title: "Kultura"  , message: "lolz2", url:'../static/img/1920x1080/T01.jpg', id:"button_id_2" }
        ],
        filter_title: "Czego szukasz ?",
        filter_all: "Wszystko",
        filter_cinema: "Kino",
        filter_food: "Jedzenie",
        filter_festivals: "Festyny",
        filter_culture: "Kultura",
        gallery_items: 
        [
            {style: "s-portfolio__item cbp-item Filter_Cinema", img_src: "../static/img/970x647/cinema.jpg", title:"kino", description:"Gdzie i co obejrzeć?"},
            {style: "s-portfolio__item cbp-item Filter_Food", img_src: "../static/img/970x647/food.jpg", title:"tytuł 2", description:"description 2"},
            {style: "s-portfolio__item cbp-item Filter_Festivals", img_src: "../static/img/970x647/concert.jpg", title:"tytuł 3", description:"description 3"},
            {style: "s-portfolio__item cbp-item Filter_Culture", img_src: "../static/img/970x647/tourists.jpg", title:"tytuł 4", description:"description 4"},
            {style: "s-portfolio__item cbp-item Filter_Culture", img_src: "../static/img/970x647/muzeum.jpg", title:"tytuł 5", description:"description 5"},
        ],
        explore_text: "Odkrywaj swoje miasto na nowo z nami",
        articles: [
            {src : "../static/img/1024x/food.jpg", title:"O Projekcie", subtitle:"Jedzenie", text:"propaganda1"},
            {src : "../static/img/1024x/city.jpg", title:"O Projekcie", subtitle:"Miasto", text:"propaganda2"},
            {src : "../static/img/1024x/movie.jpg", title:"O Projekcie", subtitle:"Kino", text:"propaganda3"}
        ],
        figures: [{id: "1", suffix: "k",text: "xd"},
                  {id: "2", suffix: "k",text: "xdd"},
                  {id: "3", suffix: "k",text: "xddd"},
                  {id: "4", suffix: "k", text: "xdddd"}]
    },
    delimiters: ['[%', '%]'],
    methods: {
        log: function()
        {
            console.log('xdd');
        }

    },
    created: function()
    {
        this.socket = io.connect('http://' + document.domain + ':' + location.port);
        this.socket.emit('test');
    }
})