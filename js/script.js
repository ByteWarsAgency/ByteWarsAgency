// LOADING SCREEN

const progressBar = document.getElementById('progress-bar');
const counter = document.getElementById('progress-counter');
const loadingScreen = document.getElementById('loading-screen');
const heroSection = document.querySelector('.hero');

function updateProgress(progress) {
  progressBar.style.width = `${progress}%`;
  counter.textContent = `${progress}%`;
}

updateProgress(0);
document.body.style.overflow = 'hidden';

document.addEventListener('DOMContentLoaded', () => {
  let progress = 0;
  const increment = 5;

  const updateLoop = setInterval(() => {
    if (progress >= 100) {
      clearInterval(updateLoop);
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.height = '0';
        heroSection.style.opacity = '1';
        setTimeout(() => {
          window.addEventListener('wheel', handleScroll);
          document.body.style.overflowY = 'scroll';
        }, 700);
      }, 0);
    }
    updateProgress(progress);
    progress += increment;
  }, 100);
});





// SITENAME ABSOLUTE POSITIONING TO RELATIVE POSITIONING

window.addEventListener('scroll', () => {
  const part1 = document.querySelector('.part1');
  const sitename = document.querySelector('.sitename');
  const spacer = document.querySelector('.spacer');

  const part1Top = part1.getBoundingClientRect().top;
  const sitenameHeight = sitename.offsetHeight;

  const scrollThreshold = part1.offsetTop - sitenameHeight;

  if (part1Top <= 0) {
    sitename.classList.add('relative');
    spacer.classList.add('absolute');
  } else {
    sitename.classList.remove('relative');
    spacer.classList.remove('absolute');
  }
});






// HUGE TEXTS TRANSITIONING UPWARDS

window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.fadein');
  elements.forEach((element) => {
    if (isElementInMiddleViewport(element)) {
      element.style.opacity = '1';
      element.classList.add('move-up');
    }
  });
});

function isElementInMiddleViewport(element) {
  const rect = element.getBoundingClientRect();
  const elementMiddle = rect.top + rect.height / 2;
  return elementMiddle >= 0 && elementMiddle <= window.innerHeight;
}






// GSAP SMOOTH SCROLLING


function handleScroll(event) {
  event.preventDefault();

  const deltaY = event.deltaY;
  const deltaX = event.deltaX;

  if (deltaY !== 0) {
    const scrollAmount = deltaY * 5;

    gsap.to(window, {
      scrollTo: {
        y: '+=' + scrollAmount,
        autoKill: false
      },
      duration: 1,
      ease: 'power2.out'
    });
  }
}



// GSAP HORIZONTAL SCROLL

window.addEventListener("load", function() {
  let container = document.querySelector(".horizontal-scroller");
  let containerWidth = container.scrollWidth - document.documentElement.clientWidth;


  gsap.to(container, {
    x: () => -containerWidth,
    scrollTrigger: {
      markers: false,
      trigger: '.horizontal-wrapper',
      start: 'top top',
      scrub: 0.5,
      pin: '.horizontal-container',
      end: () => "+=" + containerWidth,
      invalidateOnRefresh: true,
      
  }
  })
});





// ROAD SHRINKING WHILE SCROLLING
window.addEventListener("scroll", function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var road = document.querySelector(".road");
  var windowHeight = window.innerHeight;
  var roadHeight = windowHeight - (scrollTop / windowHeight) * windowHeight * 1;
  road.style.height = roadHeight + "px";
});






// FIXED CARDS

const cards = document.querySelector('.cards');
const cardTexts = document.querySelectorAll('.cards-text');
const images = document.querySelectorAll('.cards-image');
const cta = document.querySelector('.cards-cta');

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const cardsTop = cards.getBoundingClientRect().top;
  const cardsBottom = cards.getBoundingClientRect().bottom;

  if (cardsTop <= 0 && cardsBottom >= windowHeight) {
    images.forEach((image) => {
      image.classList.add('fixed');
    });
    cta.classList.add('fixed');
  } else {
    images.forEach((image) => {
      image.classList.remove('fixed');
    });
    cta.classList.remove('fixed');
  }

  cardTexts.forEach((cardText, index) => {
    const windowHeight = window.innerHeight;
    const cardTextTop = cardText.getBoundingClientRect().top;

    if (cardTextTop <= windowHeight / 2 || index === 0) {
      images[index].style.opacity = '1';
      images[index].style.display = 'flex';
    } else {
      images[index].style.opacity = '0';
      images[index].style.display = 'none';
    }
  });
});







// ZOOM IN

gsap.timeline({
  scrollTrigger: {
    trigger: ".zoom",
    scrub: true,
    start: "top top",
    end: "+=1000%",
    pin: true,
  }
})
.to(".zoom-circle", {
  scale: 12
}, "sameTime")
.to(".zoom-content", {
  scale: 1 
}, "sameTime");








// CUSTOM CURSOR

document.addEventListener('DOMContentLoaded', function() {
  var cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  var linkElements = document.querySelectorAll('.link, .cards-cta');
  linkElements.forEach(function(element) {
    element.addEventListener('mouseenter', function() {
      cursor.classList.add('scale-up');
    });

    element.addEventListener('mouseleave', function() {
      cursor.classList.remove('scale-up');
    });
  });
});