// Links 页面专用脚本
document.addEventListener("DOMContentLoaded", () => {
  // 初始化所有功能
  initializeLinks()
  setupCategoryNavigation()
  setupLinkCards()
  setupModal()
  setupApplyButtons()
  createNetworkEffects()
})

// 初始化友链页面
function initializeLinks() {
  console.log("🔗 Links page initialized with Wuthering Waves network theme!")

  // 创建页面加载动画
  createPageLoadAnimation()

  // 显示所有链接
  showAllLinks()
}

// 页面加载动画
function createPageLoadAnimation() {
  const cards = document.querySelectorAll(".link-card, .requirement-item, .contact-item")

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

// 分类导航设置
function setupCategoryNavigation() {
  const navBtns = document.querySelectorAll(".nav-btn")

  navBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      navBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const category = this.dataset.category
      filterLinksByCategory(category)

      // 创建导航切换效果
      createNavSwitchEffect(this)
    })
  })
}

function filterLinksByCategory(category) {
  const sections = document.querySelectorAll(".links-section")

  sections.forEach((section) => {
    const sectionCategory = section.dataset.category

    if (category === "all" || sectionCategory === category) {
      section.classList.remove("hidden")
      // 添加显示动画
      setTimeout(() => {
        section.style.transform = "translateY(0)"
        section.style.opacity = "1"
      }, 100)
    } else {
      section.classList.add("hidden")
    }
  })

  // 显示通知
  const categoryNames = {
    all: "全部鏈接",
    official: "官方資源",
    tools: "實用工具",
    community: "社群資源",
    partners: "合作夥伴",
  }

  showNotification(`🔗 已切換到 ${categoryNames[category]} 分類`)
}

function showAllLinks() {
  const sections = document.querySelectorAll(".links-section")
  sections.forEach((section) => {
    section.classList.remove("hidden")
  })
}

function createNavSwitchEffect(button) {
  const effect = document.createElement("div")
  effect.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.4), transparent);
    border-radius: 20px;
    animation: navSwitch 0.6s ease-out;
    pointer-events: none;
  `

  button.style.position = "relative"
  button.appendChild(effect)

  setTimeout(() => {
    effect.remove()
  }, 600)

  // 添加导航切换动画
  if (!document.querySelector("#nav-switch-style")) {
    const style = document.createElement("style")
    style.id = "nav-switch-style"
    style.textContent = `
      @keyframes navSwitch {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(2);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

// 友链卡片设置
function setupLinkCards() {
  const linkCards = document.querySelectorAll(".link-card")

  linkCards.forEach((card) => {
    // 点击显示详情
    card.addEventListener("click", function () {
      showLinkDetails(this)
    })

    // 悬停效果
    card.addEventListener("mouseenter", function () {
      createCardHoverEffect(this)
    })

    // 添加连接动画
    card.addEventListener("mouseleave", function () {
      createConnectionBeam(this)
    })
  })
}

function createCardHoverEffect(card) {
  const connectionEffect = document.createElement("div")
  connectionEffect.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border: 2px solid rgba(0, 212, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: cardConnection 2s ease-out;
    pointer-events: none;
    z-index: 0;
  `

  card.style.position = "relative"
  card.appendChild(connectionEffect)

  setTimeout(() => {
    connectionEffect.remove()
  }, 2000)

  // 添加连接动画
  if (!document.querySelector("#card-connection-style")) {
    const style = document.createElement("style")
    style.id = "card-connection-style"
    style.textContent = `
      @keyframes cardConnection {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

function createConnectionBeam(card) {
  const beam = document.createElement("div")
  beam.style.cssText = `
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.8), transparent);
    animation: beamSweep 1s ease-out;
    pointer-events: none;
    z-index: 1;
  `

  card.appendChild(beam)

  setTimeout(() => {
    beam.remove()
  }, 1000)

  if (!document.querySelector("#beam-sweep-style")) {
    const style = document.createElement("style")
    style.id = "beam-sweep-style"
    style.textContent = `
      @keyframes beamSweep {
        0% {
          transform: translateX(-100%);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

function showLinkDetails(card) {
  const modal = document.getElementById("linkModal")
  const siteName = card.querySelector(".site-info h3").textContent
  const siteDesc = card.querySelector(".site-info p").textContent
  const description = card.querySelector(".card-description").textContent
  const logo = card.querySelector(".site-logo").src
  const tags = card.querySelectorAll(".tag")

  // 填充模态框内容
  document.getElementById("modalTitle").textContent = "網站詳情"
  document.getElementById("modalSiteName").textContent = siteName
  document.getElementById("modalSiteDesc").textContent = siteDesc
  document.getElementById("modalDescription").textContent = description
  document.getElementById("modalLogo").src = logo

  // 填充标签
  const modalTags = document.getElementById("modalTags")
  modalTags.innerHTML = ""
  tags.forEach((tag) => {
    const newTag = tag.cloneNode(true)
    modalTags.appendChild(newTag)
  })

  // 显示模态框
  modal.classList.add("show")

  // 创建模态框显示效果
  createModalShowEffect()
}

function createModalShowEffect() {
  // 创建连接线效果
  const lines = document.createElement("div")
  lines.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9998;
  `

  for (let i = 0; i < 5; i++) {
    const line = document.createElement("div")
    line.style.cssText = `
      position: absolute;
      width: 2px;
      height: 100vh;
      background: linear-gradient(180deg, transparent, rgba(0, 212, 255, 0.6), transparent);
      left: ${Math.random() * 100}%;
      animation: modalLines 1s ease-out;
    `
    lines.appendChild(line)
  }

  document.body.appendChild(lines)

  setTimeout(() => {
    lines.remove()
  }, 1000)

  if (!document.querySelector("#modal-lines-style")) {
    const style = document.createElement("style")
    style.id = "modal-lines-style"
    style.textContent = `
      @keyframes modalLines {
        0% {
          transform: translateY(-100%);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translateY(100%);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

// 模态框设置
function setupModal() {
  const modal = document.getElementById("linkModal")
  const closeBtn = document.getElementById("modalClose")
  const overlay = modal.querySelector(".modal-overlay")
  const visitBtn = document.getElementById("modalVisit")
  const shareBtn = document.getElementById("modalShare")

  // 关闭模态框
  closeBtn.addEventListener("click", closeModal)
  overlay.addEventListener("click", closeModal)

  // 访问网站
  visitBtn.addEventListener("click", () => {
    createVisitEffect()
    showNotification("🔗 正在跳轉到目標網站...")
    // 这里可以添加实际的跳转逻辑
  })

  // 分享链接
  shareBtn.addEventListener("click", () => {
    createShareEffect()
    showNotification("📤 鏈接已複製到剪貼板！")
    // 这里可以添加实际的分享逻辑
  })

  // ESC键关闭
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal()
    }
  })
}

function closeModal() {
  const modal = document.getElementById("linkModal")
  modal.classList.remove("show")
}

function createVisitEffect() {
  const effect = document.createElement("div")
  effect.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    border: 3px solid #00d4ff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: visitEffect 1s ease-out;
    pointer-events: none;
    z-index: 10000;
  `

  document.body.appendChild(effect)

  setTimeout(() => {
    effect.remove()
  }, 1000)

  if (!document.querySelector("#visit-effect-style")) {
    const style = document.createElement("style")
    style.id = "visit-effect-style"
    style.textContent = `
      @keyframes visitEffect {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(5);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

function createShareEffect() {
  const particles = []
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div")
    particle.textContent = "📤"
    particle.style.cssText = `
      position: fixed;
      left: ${centerX}px;
      top: ${centerY}px;
      font-size: 1.5rem;
      pointer-events: none;
      z-index: 10000;
      animation: shareParticle 1.5s ease-out forwards;
    `

    const angle = (Math.PI * 2 * i) / 8
    const distance = 100
    const vx = Math.cos(angle) * distance
    const vy = Math.sin(angle) * distance

    particle.style.setProperty("--vx", vx + "px")
    particle.style.setProperty("--vy", vy + "px")

    document.body.appendChild(particle)
    particles.push(particle)
  }

  setTimeout(() => {
    particles.forEach((p) => p.remove())
  }, 1500)

  if (!document.querySelector("#share-particle-style")) {
    const style = document.createElement("style")
    style.id = "share-particle-style"
    style.textContent = `
      @keyframes shareParticle {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(calc(-50% + var(--vx)), calc(-50% + var(--vy))) scale(0);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

// 申请按钮设置
function setupApplyButtons() {
  const applyBtns = document.querySelectorAll(".apply-btn")

  applyBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const action = this.textContent.trim()

      if (action === "立即申請") {
        createApplicationEffect()
        showNotification("📝 正在打開申請表單...")
        // 这里可以添加实际的申请逻辑
      } else if (action === "查看模板") {
        createTemplateEffect()
        showNotification("📋 正在顯示申請模板...")
        // 这里可以添加模板显示逻辑
      }
    })
  })
}

function createApplicationEffect() {
  const form = document.createElement("div")
  form.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 200px;
    background: rgba(0, 212, 255, 0.1);
    border: 2px solid #00d4ff;
    border-radius: 15px;
    transform: translate(-50%, -50%);
    animation: applicationForm 2s ease-out;
    pointer-events: none;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00d4ff;
    font-size: 2rem;
  `
  form.textContent = "📝"

  document.body.appendChild(form)

  setTimeout(() => {
    form.remove()
  }, 2000)

  if (!document.querySelector("#application-form-style")) {
    const style = document.createElement("style")
    style.id = "application-form-style"
    style.textContent = `
      @keyframes applicationForm {
        0% {
          transform: translate(-50%, -50%) scale(0) rotate(0deg);
          opacity: 0;
        }
        50% {
          transform: translate(-50%, -50%) scale(1) rotate(180deg);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(0) rotate(360deg);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

function createTemplateEffect() {
  const template = document.createElement("div")
  template.style.cssText = `
    position: fixed;
    top: 20%;
    left: 50%;
    width: 400px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid #00d4ff;
    border-radius: 15px;
    transform: translateX(-50%);
    animation: templateShow 2s ease-out;
    pointer-events: none;
    z-index: 10000;
    padding: 2rem;
    color: #ffffff;
    font-size: 0.9rem;
  `
  template.innerHTML = `
    <h3 style="color: #00d4ff; margin-bottom: 1rem;">申請模板</h3>
    <p>網站名稱：[您的網站名稱]</p>
    <p>網站地址：[您的網站URL]</p>
    <p>網站描述：[簡短描述]</p>
    <p>聯繫方式：[郵箱或Discord]</p>
    <p>網站類型：[官方/工具/社群/其他]</p>
  `

  document.body.appendChild(template)

  setTimeout(() => {
    template.remove()
  }, 3000)

  if (!document.querySelector("#template-show-style")) {
    const style = document.createElement("style")
    style.id = "template-show-style"
    style.textContent = `
      @keyframes templateShow {
        0% {
          transform: translateX(-50%) translateY(-50px);
          opacity: 0;
        }
        20% {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
        80% {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
        100% {
          transform: translateX(-50%) translateY(-50px);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

// 创建网络效果
function createNetworkEffects() {
  createFloatingNodes()
  createDataStreams()
}

function createFloatingNodes() {
  const symbols = ["🔗", "🌐", "⚡", "💫", "🔧", "👥", "🤝", "📡"]

  function createNode() {
    const node = document.createElement("div")
    node.textContent = symbols[Math.floor(Math.random() * symbols.length)]
    node.style.cssText = `
      position: fixed;
      color: rgba(0, 212, 255, ${Math.random() * 0.6 + 0.2});
      font-size: ${Math.random() * 25 + 15}px;
      left: ${Math.random() * 100}vw;
      top: 100vh;
      pointer-events: none;
      z-index: -1;
      animation: nodeFloat ${Math.random() * 8 + 6}s linear infinite;
    `

    document.body.appendChild(node)

    setTimeout(() => {
      node.remove()
    }, 14000)
  }

  // 定期创建节点
  setInterval(createNode, 1500)

  // 添加节点浮动动画
  if (!document.querySelector("#node-float-style")) {
    const style = document.createElement("style")
    style.id = "node-float-style"
    style.textContent = `
      @keyframes nodeFloat {
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

function createDataStreams() {
  const container = document.querySelector(".data-streams")
  if (!container) return

  function createStream() {
    const stream = document.createElement("div")
    stream.style.cssText = `
      position: absolute;
      width: 1px;
      height: 80px;
      background: linear-gradient(180deg, 
        transparent, 
        rgba(0, 212, 255, 0.6), 
        transparent
      );
      left: ${Math.random() * 100}%;
      top: -80px;
      animation: dataStreamFlow ${Math.random() * 4 + 3}s linear infinite;
      pointer-events: none;
    `

    container.appendChild(stream)

    setTimeout(() => {
      stream.remove()
    }, 7000)
  }

  // 定期创建数据流
  setInterval(createStream, 300)

  if (!document.querySelector("#data-stream-flow-style")) {
    const style = document.createElement("style")
    style.id = "data-stream-flow-style"
    style.textContent = `
      @keyframes dataStreamFlow {
        0% {
          transform: translateY(0);
          opacity: 0;
        }
        20% {
          opacity: 1;
        }
        80% {
          opacity: 1;
        }
        100% {
          transform: translateY(100vh);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

// 通知系统
function showNotification(message) {
  const notification = document.createElement("div")
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(45deg, #00d4ff, #0099cc);
    color: white;
    padding: 1rem 2rem;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 212, 255, 0.4);
    z-index: 9999;
    animation: notificationSlide 0.4s ease-out;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-weight: 500;
    max-width: 300px;
  `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "notificationSlide 0.4s ease-out reverse"
    setTimeout(() => {
      notification.remove()
    }, 400)
  }, 3000)

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

// 页面滚动视差效果
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const backgroundEffects = document.querySelector(".background-effects")

  if (backgroundEffects) {
    backgroundEffects.style.transform = `translateY(${scrolled * 0.1}px)`
  }

  // 角色视差效果
  const characters = document.querySelectorAll(".header-char, .card-char, .apply-char")
  characters.forEach((char, index) => {
    const speed = 0.02 + (index % 3) * 0.01
    char.style.transform = `translateY(${scrolled * speed}px)`
  })

  // 连接线视差效果
  const beams = document.querySelectorAll(".char-connection-beam")
  beams.forEach((beam, index) => {
    const speed = 0.03 + (index % 2) * 0.01
    beam.style.transform += ` translateY(${scrolled * speed}px)`
  })
})

console.log("🔗 Links page loaded with enhanced Wuthering Waves network effects! 🌐")
