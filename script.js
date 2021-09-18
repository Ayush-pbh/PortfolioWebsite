// tl = new TimelineMax({});

// tl
// .staggerFrom('.hidetextintro', 1.5, {opacity:0, ease:Power4.easeOut}, 0.25)
// .staggerFrom('.hidetextintro', 1.5, {y:100, ease:Power4.easeOut}, 0.25)
// .then(()=>initTyper());

gsap.from('.hidetextintro',{opacity:0,y:50,duration:0.5,stagger:0.2}).then(()=>initTyper());

//for Auto typing
var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
        //here during deletion of text.
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        //changing the colors...
        // console.log(i)
        // console.log(this.toRotate[i])

        if(i==0){
            document.querySelector('.auto-write').classList.remove('student');
            document.querySelector('.auto-write').classList.add('developer');
            document.querySelector('.abbr-autowrite').title = 'A person or thing that develops or innovates'
        }
        else if(i==1){
            document.querySelector('.auto-write').classList.remove('developer');
            document.querySelector('.auto-write').classList.add('bibil');
            document.querySelector('.abbr-autowrite').title = 'A love for books, especially for first or fine editions.'
        }
        else if(i==2){
            document.querySelector('.auto-write').classList.remove('bibil');
            document.querySelector('.auto-write').classList.add('student');
            // console.log('re')
            document.querySelector('.abbr-autowrite').title = 'A person formally engaged in learning, especially one enrolled in a school or college.'
        }
}
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
//   window.onload = function() {
  function initTyper() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };

// For MouseJS

m = new MJ();
m.lol();
document.addEventListener('mousemove',function(event){
    m.movementEngine(event)
});
m.drawClassic();



//variables
let overlayVisible = false;
//My funxciotns
function toggleOverlay() {
  gsap.from('.pagechange',{left:'100%',duration:1,ease:Power4.easeOut})
    if(overlayVisible){
        // hideit.
        document.querySelector('.overlaynav').classList.remove('visible')
        overlayVisible = false
    }
    else{
        //show it.
        overlayVisible = true;
        document.querySelector('.overlaynav').classList.add('visible')
        gsap.from('.anim1',{opacity:0,y:50,duration:0.4,stagger:0.2});
    }
}