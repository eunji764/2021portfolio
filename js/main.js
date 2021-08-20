import { async } from 'q';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import 'regenerator-runtime/runtime'
import { trigger } from 'dom7';

// INTRO 
window.onload = function(){
  gsap.to(window, .6,{
    scrollTo : 0
  })
  init()
}

const about = document.querySelector('.about')
getPosY(about) //821

function getPosY(el){
  let posY = el.offsetTop
  if (el.offsetParent){
    posY += el.offsetParent.offsetTop
  }
  return posY
}


let beforeOffset = window.scrollY
function scrollDown(){
  let afterOffset = window.scrollY
  if (afterOffset-beforeOffset>0){
    beforeOffset = afterOffset
    return true
  } else {
    beforeOffset = afterOffset
    return false
  }
}

window.addEventListener('scroll',  _.throttle(function(){
  if( beforeOffset < getPosY(about) && scrollDown()){
    gsap.to(window, .3 , {
      scrollTo : getPosY(about)
    })
  } else {
    beforeOffset = window.scrollY
  }
}, 300))


function star(){
  const stars = document.querySelectorAll('.star_box .star'),
        starBack = document.querySelector('.star_box .back'),
        starFront = document.querySelector('.star_box .front'),
        arrow = document.querySelector('.arrow_box .down')

  stars.forEach(star => {
    star.classList.add('show')
  })
  arrow.style.opacity = '1'
  gsap.to(arrow, 1, {
    y:-10,
    repeat : -1, // 무한반복
    yoyo : true,
    ease: Power1.easeOut,
    delay : random(0, 2)
  } )
  setInterval(()=>{
    starFront.classList.toggle('active')
    starBack.classList.toggle('active')
  },800)
}


const title= document.querySelector('.title_box h1'),
      introTitle = '하늘 아래 같은 코드는 없지만 좋은 코드는 있다....'

let typingIndex = 0
function typing(el, p){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      let typingTxt = p.split("")
      let typingGo = setInterval(()=>{
        if(typingIndex<typingTxt.length){
          el.innerHTML += typingTxt[typingIndex]
          typingIndex+=1
        } else {
          clearInterval(typingGo)
          title.classList.add('stop')
          return resolve(true)
        }
      },200)
    }, 200)
  })
}

async function init(){
  const respose = await typing(title, introTitle)
  if(respose){star()}
}




// NAV TAB

const nav = document.querySelector('nav'),
      navBtn = nav.querySelector('.nav_btn'),
      navContents = nav.querySelector('.nav_contents')

window.addEventListener('scroll', _.throttle(function(){
  if(window.scrollY >= getPosY(about)){
    gsap.to(navBtn, 0, {
      opacity : 1,
      display : 'flex'
    })
    gsap.to(navContents, 0 ,{
      display: 'block'
    })
  } else {
    gsap.to(navBtn, .2, {
      opacity : 0,
      display : 'none'
    })
    gsap.to(navContents, 0 ,{
      display: 'none'
    })
  }
}, 300))


navBtn.addEventListener('click',()=>{
  let text = navBtn.innerText
  if (text === 'menu'){
    navBtn.innerHTML = 'menu_open'
    navBtn.classList.add('open')
    navContents.classList.add('open')
  } else {
    navBtn.innerHTML = 'menu'
    navBtn.classList.remove('open')
    navContents.classList.remove('open')
  }
})


// ABOUT 
new ScrollMagic.Scene({
  triggerElement : about,
  triggerHook: .4
})
.setClassToggle(about, 'show')
.addTo(new ScrollMagic.Controller())



// PROGRASS

prograss('html', 85)
prograss('css', 90)
prograss('javascript', 70)


function prograss(type, percent){
  const circleBoxs = Array.from(document.querySelectorAll('.circle_prograss_box')),
        circles = circleBoxs.map(circleBox => circleBox.querySelector('.prograss_circle')),
        spans = circleBoxs.map(circleBox => circleBox.querySelector('strong')),
        circumference = circles[0].getTotalLength() // 722
  
  // console.log(circumference)

  const types = {
     html : 0,
     css : 1,
     javascript : 2
   }
   
  const circle = circles[types[type]],
        strong = spans[types[type]]
   
  circle.style.strokeDashoffset = circumference*(1-percent/100)
  strong.innerHTML = percent
}


// FLOATING

function random(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size){
  gsap.to(selector, random(1.5, 2.5), 
  {
    y: size,
    repeat : -1, // 무한반복
    yoyo : true,
    ease: Power1.easeInOut,
    delay : random(0, delay)
  });
}

floatingObject('.floating1', 1, 5);
floatingObject('.floating2', .5, 6);
floatingObject('.floating3', 1, 8);
floatingObject('.floating4', 1.3, 3);
floatingObject('.floating5', .8, 4);
floatingObject('.floating6', 1, 4);
floatingObject('.floating7', .9, 6);
floatingObject('.floating8', 1.2, 6);
floatingObject('.floating9', 1.1, 5);
floatingObject('.cloud1', 1.5, 10)
floatingObject('.cloud2', 1.2, 10)
floatingObject('.cloud3', 1, 10)
floatingObject('.cloud4', 1.3, 10)
floatingObject('.cloud5', 1, 10)
floatingObject('.cloud6',1.3, 10)


// back-to-position

const spyEls = document.querySelectorAll('article.scroll-spy')
spyEls.forEach(function(spyEl){
  new ScrollMagic
  .Scene({
    triggerElement: spyEl,
    triggerHook: .9
  })
  .setClassToggle(spyEl, 'show')
  .addTo(new ScrollMagic.Controller())
})


// SWIPER

new Swiper('.design .swiper-container',{
  direction: 'horizontal',
  slidesPerView : 3,
  spaceBetween : 20,
  centeredSlides : true,
  loop : true,
  navigation : {
    prevEl : '.design .swiper-prev',
    nextEl : '.design .swiper-next'
  }
});


// FOOTRER 

const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()
