// 载入动画
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = "0"
    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none"
      document.getElementById("main-content").style.display = "block"
      document.getElementById("main-content").style.opacity = "0"
      setTimeout(() => {
        document.getElementById("main-content").style.opacity = "1"
        document.getElementById("main-content").style.transition = "opacity 0.5s ease"
      }, 100)
    }, 500)
  }, 3000)
})

// 导航栏滚动效果
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  const backToTop = document.getElementById("backToTop")

  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 14, 26, 0.98)"
    backToTop.classList.add("show")
  } else {
    navbar.style.background = "rgba(10, 14, 26, 0.95)"
    backToTop.classList.remove("show")
  }
})

// 移动端导航菜单
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")

  // 防止背景滚动
  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
})

// 关闭菜单函数
function closeMenu() {
  navMenu.classList.remove("active")
  navToggle.classList.remove("active")
  document.body.style.overflow = "auto"
}

// 平滑滚动函数
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
  closeMenu()
}

// 返回顶部
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// 角色轮播
let currentSlideIndex = 0
const characterCards = document.querySelectorAll(".character-card")
const dots = document.querySelectorAll(".dot")

function currentSlide(n) {
  showSlide((currentSlideIndex = n - 1))
}

function showSlide(n) {
  if (n >= characterCards.length) currentSlideIndex = 0
  if (n < 0) currentSlideIndex = characterCards.length - 1

  characterCards.forEach((card) => card.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  if (characterCards[currentSlideIndex]) {
    characterCards[currentSlideIndex].classList.add("active")
  }
  if (dots[currentSlideIndex]) {
    dots[currentSlideIndex].classList.add("active")
  }
}

// 自动轮播
setInterval(() => {
  currentSlideIndex++
  showSlide(currentSlideIndex)
}, 5000)

// 教程导航
function showTutorial(tutorialId) {
  // 隐藏所有教程卡片
  document.querySelectorAll(".tutorial-card-mobile").forEach((card) => {
    card.classList.remove("active")
  })

  // 移除所有导航项的活跃状态
  document.querySelectorAll(".tutorial-nav-item").forEach((item) => {
    item.classList.remove("active")
  })

  // 显示选中的教程卡片
  const selectedTutorial = document.getElementById(`tutorial-${tutorialId}`)
  if (selectedTutorial) {
    selectedTutorial.classList.add("active")
  }

  // 激活对应的导航项
  const eventTarget = document.querySelector(`.tutorial-nav-item[data-tutorial-id="${tutorialId}"]`)
  if (eventTarget) {
    eventTarget.classList.add("active")
  }
}

// FAQ 展开/收起
function toggleFaq(element) {
  const faqAnswer = element.nextElementSibling
  const arrow = element.querySelector(".faq-arrow")

  element.classList.toggle("active")
  faqAnswer.classList.toggle("active")

  if (faqAnswer.classList.contains("active")) {
    arrow.style.transform = "rotate(180deg)"
  } else {
    arrow.style.transform = "rotate(0deg)"
  }
}

// 触摸滑动支持
let touchStartX = 0
let touchEndX = 0

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // 向左滑动 - 下一个
      currentSlideIndex++
      showSlide(currentSlideIndex)
    } else {
      // 向右滑动 - 上一个
      currentSlideIndex--
      showSlide(currentSlideIndex)
    }
  }
}

// 为角色轮播添加触摸事件
const carousel = document.getElementById("characters-carousel")
if (carousel) {
  carousel.addEventListener("touchstart", handleTouchStart, { passive: true })
  carousel.addEventListener("touchend", handleTouchEnd, { passive: true })
}

// 滚动动画
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// 为需要动画的元素添加观察
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".feature-card-mobile, .character-card, .tutorial-card-mobile, .about-content-mobile",
  )
  animatedElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// 按钮点击效果
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    // 创建波纹效果
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// 添加波纹效果样式
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// 粒子效果增强
function createParticle() {
  const particle = document.createElement("div")
  particle.style.position = "absolute"
  particle.style.width = Math.random() * 4 + "px"
  particle.style.height = particle.style.width
  particle.style.background = `rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2})`
  particle.style.borderRadius = "50%"
  particle.style.left = Math.random() * 100 + "%"
  particle.style.top = "100%"
  particle.style.pointerEvents = "none"
  particle.style.animation = `particleFloat ${Math.random() * 3 + 2}s linear infinite`

  const particleContainer = document.querySelector(".floating-particles")
  if (particleContainer) {
    particleContainer.appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, 5000)
  }
}

// 定期创建粒子
setInterval(createParticle, 300)

// 添加粒子动画样式
const particleStyle = document.createElement("style")
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(particleStyle)

// 移动端性能优化
if (window.innerWidth <= 768) {
  // 减少动画频率
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

  if (reducedMotionQuery.matches) {
    // 用户偏好减少动画
    document.documentElement.style.setProperty("--animation-duration", "0.1s")
  }

  // 优化滚动性能
  let ticking = false

  function updateScrollEffects() {
    // 更新导航栏和返回顶部按钮
    const navbar = document.querySelector(".navbar")
    const backToTop = document.getElementById("backToTop")

    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 14, 26, 0.98)"
      backToTop.classList.add("show")
    } else {
      navbar.style.background = "rgba(10, 14, 26, 0.95)"
      backToTop.classList.remove("show")
    }

    ticking = false
  }

  function requestScrollUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects)
      ticking = true
    }
  }

  // 替换原有的滚动监听
  window.removeEventListener("scroll", () => {})
  window.addEventListener("scroll", requestScrollUpdate, { passive: true })
}

// 预加载关键图片
function preloadImages() {
  const imageUrls = [
    "T_PixRoleQNvzhu960.png",
    "T_PixRoleQYangyang960.png",
    "T_PixRoleQJinxi960.png",
    "T_PixRoleQChangli960.png",
  ]

  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

// 页面加载完成后预加载图片
window.addEventListener("load", preloadImages)

// 防止iOS Safari的橡皮筋效果
document.addEventListener(
  "touchmove",
  (e) => {
    if (e.target.closest(".nav-menu.active")) {
      e.preventDefault()
    }
  },
  { passive: false },
)

console.log("移动端优化的共鳴基地网站已加载完成！")
