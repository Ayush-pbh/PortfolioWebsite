
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

try{
    document.getElementsByClassName('go-back-drop')[0].addEventListener('mouseenter', ()=>{
    m.dmaj.classList.add('back-invert');
})
document.getElementsByClassName('go-back-drop')[0].addEventListener('mouseleave', ()=>{
    m.dmaj.classList.remove('back-invert');
})
}
catch{
    
}
// Need to setup timelines for gsap animations else the animations are dying, on repeatd clicks.

let tlShowNav = gsap.timeline(), finit = true, overlayVisible = false;
function toggleOverlay(){
    if(overlayVisible){
        //hide it
        overlayVisible = false
        tlShowNav.reverse()
        console.log("Reversed")
        
    }   
    else{
        overlayVisible = true
        if(finit){
            tlShowNav
            .to('.pagechange', {width:'100%', duration: .4, ease:'expo'})
            .to('.overlaynav', {top:0, duration: 0})
            .to('.pagechange', {width:'0', duration: 0.5, ease:'expo'})
            .from('.anim1',{opacity:0,y:50,duration:0.3,stagger:0.1}, '<')    
            finit = false
        }
        else{
            tlShowNav.play()
        }
        
        // tlShowNav.reversed(false)
    } 
}


let loadanim = gsap.timeline({ repeat:-1, yoyo:true })
    .to('.loadanim .back' , {height:100,width:160, left: 'calc(50% - 80px)',top: 'calc(50% - 50px)', duration: .8, ease:'cric'})
    .to('.loadanim .back' , {height:160,width:100, left: 'calc(50% - 50px)',top: 'calc(50% - 80px)', duration: .8, ease:'cric'})


let intoAmination = gsap.timeline()
    .from('.hero-head', {opacity:0, y:100, duration:0.5})

window.onload = () => {
    gsap.to('.loadanim', {top:'-120%', duration:1, ease: 'sine'})
    loadanim.kill()      
    b.reveal(2000)
}


gsap.registerPlugin(ScrollTrigger);


// // For skew effect on skew classes
// const content = document.getElementsByClassName("skew-me")[0];
// let currentPos = content.scrollTop;

// console.log(content)
// const callDistort = function() {
//   const newPos = content.scrollTop;
//   const diff = newPos - currentPos;
//   const speed = diff * 1.1;
// //   console.log(speed)

//   content.style.transform = "skewY("+speed+"deg)";
//   currentPos = newPos;
//   requestAnimationFrame(callDistort)
// };
// callDistort();




// Now adding the baffle effefct using baffle js. this effect will be added to the headings.


let b = baffle('.baffle-up').start();
let characters =["█","▓","▒","░","█","▓","▒","░","█","▓","▒","░","<",">","/"];
b.set({
    characters: characters,
    speed: 150
});