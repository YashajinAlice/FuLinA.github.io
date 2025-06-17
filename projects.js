// Projects 页面专用脚本
document.addEventListener("DOMContentLoaded", () => {
  // 项目筛选功能
  setupProjectFilters()

  // 项目卡片动画
  setupProjectAnimations()

  // 按钮交互效果
  setupButtonEffects()

  // 背景粒子效果
  createProjectParticles()

  // 项目统计动画
  animateProjectStats()

  // 开源卡片交互
  setupOpenSourceCards()
})

// 项目筛选功能
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.dataset.filter

      // 更新按钮状态
      filterBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      // 筛选项目
      filterProjects(filter, projectCards)

      // 触发筛选动画
      triggerFilterAnimation(this)
    })
  })
}

function filterProjects(filter, cards) {
  cards.forEach((card, index) => {
    const category = card.dataset.category
    const shouldShow = filter === "all" || category === filter

    if (shouldShow) {
      card.style.display = "block"
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, index * 100)
    } else {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
      setTimeout(() => {
        card.style.display = "none"
      }, 300)
    }
  })
}

function triggerFilterAnimation(button) {
  // 创建波纹效果
  const ripple = document.createElement("div")
  ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        animation: filterRipple 0.6s ease-out;
        pointer-events: none;
    `

  button.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)

  // 添加动画样式
  if (!document.querySelector("#filter-animations")) {
    const style = document.createElement("style")
    style.id = "filter-animations"
    style.textContent = `
            @keyframes filterRipple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(style)
  }
}

// 项目卡片动画
function setupProjectAnimations() {
  const cards = document.querySelectorAll(".project-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  cards.forEach((card) => {
    card.style.animationPlayState = "paused"
    observer.observe(card)
  })
}

// 按钮交互效果
function setupButtonEffects() {
  const actionBtns = document.querySelectorAll(".action-btn")

  actionBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // 创建点击波纹
      createButtonRipple(e, this)

      // 模拟按钮功能
      const action = this.textContent.trim()
      handleButtonAction(action)
    })
  })
}

function createButtonRipple(e, button) {
  const ripple = document.createElement("div")
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = e.clientX - rect.left - size / 2
  const y = e.clientY - rect.top - size / 2

  ripple.style.cssText = `
        position: absolute;
        top: ${y}px;
        left: ${x}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: buttonRipple 0.6s ease-out;
        pointer-events: none;
    `

  const rippleContainer = button.querySelector(".btn-ripple")
  rippleContainer.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)

  // 添加波纹动画
  if (!document.querySelector("#button-ripple-style")) {
    const style = document.createElement("style")
    style.id = "button-ripple-style"
    style.textContent = `
            @keyframes buttonRipple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(style)
  }
}

function handleButtonAction(action) {
  const messages = {
    演示: "🚀 尚未支援...",
    代碼: "💻 尚未支援...",
    訪問: "🌐 尚未支援...",
    文檔: "📚 尚未支援...",
    使用: "🔧 尚未支援...",
    瀏覽: "👀 尚未支援...",
    GitHub: "🐙 正在跳轉到GitHub...",
  }

  const message = messages[action] || "✨ 正在處理..."
  showNotification(message)
}

function showNotification(message) {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #00d4ff, #0099cc);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
        z-index: 9999;
        animation: notificationSlide 0.3s ease-out;
    `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "notificationSlide 0.3s ease-out reverse"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 2000)

  // 添加通知动画
  if (!document.querySelector("#notification-style")) {
    const style = document.createElement("style")
    style.id = "notification-style"
    style.textContent = `
            @keyframes notificationSlide {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `
    document.head.appendChild(style)
  }
}

// 背景粒子效果
function createProjectParticles() {
  const particleContainer = document.querySelector(".project-particles")

  function createParticle() {
    const particle = document.createElement("div")
    const symbols = ["<", ">", "{", "}", "(", ")", "[", "]", ";", "=", "+", "-"]
    const symbol = symbols[Math.floor(Math.random() * symbols.length)]

    particle.textContent = symbol
    particle.style.cssText = `
            position: absolute;
            color: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.1});
            font-size: ${Math.random() * 20 + 10}px;
            font-family: 'Courier New', monospace;
            left: ${Math.random() * 100}%;
            top: 100%;
            pointer-events: none;
            animation: codeFloat ${Math.random() * 10 + 5}s linear infinite;
        `

    particleContainer.appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, 15000)
  }

  // 定期创建粒子
  setInterval(createParticle, 500)

  // 添加代码浮动动画
  if (!document.querySelector("#code-float-style")) {
    const style = document.createElement("style")
    style.id = "code-float-style"
    style.textContent = `
            @keyframes codeFloat {
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
    document.head.appendChild(style)
  }
}

// 项目统计动画
function animateProjectStats() {
  const statValues = document.querySelectorAll(".stat-value")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStatValue(entry.target)
        observer.unobserve(entry.target)
      }
    })
  })

  statValues.forEach((stat) => observer.observe(stat))
}

function animateStatValue(element) {
  const text = element.textContent
  const hasPlus = text.includes("+")
  const hasPercent = text.includes("%")
  const hasUnit = text.includes("ms") || text.includes("K")

  const targetValue = Number.parseFloat(text.replace(/[^\d.]/g, ""))
  let currentValue = 0
  const increment = targetValue / 50
  const duration = 1500
  const stepTime = duration / 50

  const timer = setInterval(() => {
    currentValue += increment
    if (currentValue >= targetValue) {
      currentValue = targetValue
      clearInterval(timer)
    }

    let displayValue = Math.floor(currentValue)
    if (targetValue % 1 !== 0) {
      displayValue = currentValue.toFixed(1)
    }

    let suffix = ""
    if (hasPlus) suffix += "+"
    if (hasPercent) suffix += "%"
    if (hasUnit) {
      if (text.includes("K")) suffix += "K"
      if (text.includes("ms")) suffix += "ms"
    }

    element.textContent = displayValue + suffix
  }, stepTime)
}

// 开源卡片交互
function setupOpenSourceCards() {
  const cards = document.querySelectorAll(".opensource-card")

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      // 创建星星效果
      createStarEffect(this)

      // 模拟跳转到GitHub
      const repoName = this.querySelector("h3").textContent
      showNotification(`🌟 正在跳轉到 ${repoName} 倉庫...`)
    })

    // 鼠标悬停效果
    card.addEventListener("mouseenter", function () {
      createHoverGlow(this)
    })
  })
}

function createStarEffect(card) {
  const rect = card.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  for (let i = 0; i < 8; i++) {
    const star = document.createElement("div")
    star.textContent = "⭐"
    star.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: ${Math.random() * 10 + 15}px;
            pointer-events: none;
            z-index: 9999;
            animation: starBurst 1s ease-out forwards;
        `

    const angle = (Math.PI * 2 * i) / 8
    const distance = Math.random() * 100 + 50
    star.style.setProperty("--end-x", Math.cos(angle) * distance + "px")
    star.style.setProperty("--end-y", Math.sin(angle) * distance + "px")

    document.body.appendChild(star)

    setTimeout(() => {
      star.remove()
    }, 1000)
  }

  // 添加星星爆炸动画
  if (!document.querySelector("#star-burst-style")) {
    const style = document.createElement("style")
    style.id = "star-burst-style"
    style.textContent = `
            @keyframes starBurst {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(1) rotate(360deg);
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(style)
  }
}

function createHoverGlow(card) {
  const glow = document.createElement("div")
  glow.style.cssText = `
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #00d4ff, #0099cc, #00d4ff);
        border-radius: 17px;
        z-index: -1;
        opacity: 0;
        animation: hoverGlow 0.3s ease-out forwards;
    `

  card.style.position = "relative"
  card.appendChild(glow)

  card.addEventListener(
    "mouseleave",
    () => {
      glow.style.animation = "hoverGlow 0.3s ease-out reverse"
      setTimeout(() => {
        glow.remove()
      }, 300)
    },
    { once: true },
  )

  // 添加悬停发光动画
  if (!document.querySelector("#hover-glow-style")) {
    const style = document.createElement("style")
    style.id = "hover-glow-style"
    style.textContent = `
            @keyframes hoverGlow {
                to {
                    opacity: 0.3;
                }
            }
        `
    document.head.appendChild(style)
  }
}

// 页面滚动视差效果
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const backgroundEffects = document.querySelector(".background-effects")

  if (backgroundEffects) {
    backgroundEffects.style.transform = `translateY(${scrolled * 0.3}px)`
  }

  // 项目卡片视差
  const cards = document.querySelectorAll(".project-card")
  cards.forEach((card, index) => {
    const speed = 0.1 + (index % 3) * 0.05
    card.style.transform = `translateY(${scrolled * speed}px)`
  })
})

console.log("Projects page loaded with enhanced animations! 🚀")

