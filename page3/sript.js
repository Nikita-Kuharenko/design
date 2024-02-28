class Slider{
    constructor({slider, direction, time, autoplay, interval}){
        this.slider = document.querySelector(slider);
        this.sliderLine = this.slider.querySelector('.main__slider-line');
        this.slides = [...this.sliderLine.children];
        this.prev = document.querySelector('.slider__prev');
        this.next = document.querySelector('.slider__next');

        this.dir = direction.toUpperCase() == 'X' ? 'X' : 'Y';
        this.timeMove = time != undefined ? time : 1000;

        this.width = this.sliderLine.clientWidth;
        this.height = this.sliderLine.clientHeight;

        this.moveSize = this.dir == 'X' ? this.width : this.height;

        this.interval = interval != undefined ? interval : this.timeMove;
        this.activeSlide = 0;
        this.autoplay = autoplay;
        this.autoplaying();
        this.sliderLine.style = `   position:relative;
                                    height: ${this.height}px;
                                    overflow:hidden;`;

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
        }else if(btn == this.prev){
            this.activeSlide--
            if(this.activeSlide < 0){
                this.activeSlide = this.slides.length -1 
            }
        }
        this.slides.forEach((i)=>{
            if(i == this.activeSlide){
                i.style.opacity = '0' 
            }
        })
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
            }, this.interval + 3000 );
        }
    }
}

let slider = new Slider({
    slider: '.main__slider',
    direction: 'x',
    time: 1000,
    autoplay: false,
    interval: 2000,
})