class Slider{
    constructor({slider, direction, time, autoplay, interval}){
        this.slider = document.querySelector(slider);
        this.sliderLine = this.slider.querySelector('.main__reviews-sliderLine');
        this.slides = [...this.sliderLine.children];
        this.prev = document.querySelector('.slider__prev');
        this.next = document.querySelector('.slider__next');

        this.circles = document.querySelectorAll('.circle')

        this.dir = direction.toUpperCase() == 'X' ? 'X' : 'Y';
        this.timeMove = time != undefined ? time : 1000;

        this.width = this.sliderLine.clientWidth;
        this.height = this.sliderLine.clientHeight / 3;

        this.moveSize = this.dir == 'X' ? this.width : this.height;

        this.interval = interval != undefined ? interval : this.timeMove;
        this.activeSlide = 0;
        this.autoplay = autoplay;
        this.autoplaying();
        this.sliderLine.style = `   position:relative;
                                    height: ${this.height}px;
                                    overflow:hidden;`;

        this.circles[this.activeSlide].style = `color: white;
                                                font-size: 15px;`

        this.slides.forEach((slide, i) => {
            slide.style = ` position:absolute;`;
            if( i != this.activeSlide ){
                slide.style.transform = `translate${this.dir}(${this.moveSize}px)`
            }
            if( i == this.slides.length - 1 ){
                slide.style.transform = `translate${this.dir}(${-this.moveSize}px)`
            }

        })

        this.prev.addEventListener('click', () => this.move(this.prev))
        this.next.addEventListener('click', () => this.move(this.next))




    }
    move(btn){
        this.diesabledBtn();
        
        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize;
        this.slides.forEach((slide, i) => {
            slide.style.transition = '0ms';
            if(i != this.activeSlide){
                slide.style.transform = `translate${this.dir}(${btnLeftOrRight * (-1)}px)`
            }
        })
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`
        this.slides[this.activeSlide].style.transition = this.timeMove + 'ms';

        if(btn == this.next){
            this.activeSlide++
            if(this.activeSlide == this.slides.length){
                this.activeSlide = 0
            }
            this.circles.forEach((i) => {
                i.style = `color: #b0e8e6;
                font-size: 10px;
                margin-right: 9px;`
            })
            this.circles[this.activeSlide].style = `color: white;
                                                    font-size: 15px;`
        }
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`
        this.slides[this.activeSlide].style.transition =  this.timeMove + 'ms'
    }
    diesabledBtn(){
        this.prev.disabled = true;
        this.next.disabled = true;
        setTimeout(() => {
            this.prev.disabled = false;
            this.next.disabled = false;
        }, this.timeMove);
    }
    autoplaying(){
        if(this.autoplay == true){
            setInterval(() => {
               this.move(this.next) 
            }, this.interval);
        }
    }
}

let slider = new Slider({
    slider: '.main__reviews-slider',
    direction: 'x',
    time: 1000,
    autoplay: true,
    interval: 5000,
})