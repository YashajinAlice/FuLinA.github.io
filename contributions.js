import { Chart } from "@/components/ui/chart"
// Contributions 页面专用脚本
document.addEventListener("DOMContentLoaded", () => {
  // 初始化所有功能
  initializeContributions()
  setupYearControls()
  createContributionHeatmap()
  createTimeHeatmap()
  animateStatNumbers()
  setupTooltips()
  createBackgroundEffects()
  initializeCharts()
})

// 初始化贡献页面
function initializeContributions() {
  console.log("🌊 Contributions page initialized with Wuthering Waves resonance!")

  // 创建页面加载动画
  createPageLoadAnimation()
}

// 页面加载动画
function createPageLoadAnimation() {
  const cards = document.querySelectorAll(".overview-card, .analysis-card, .achievement-card")

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

// 年份控制按钮
function setupYearControls() {
  const controlBtns = document.querySelectorAll(".control-btn")

  controlBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      controlBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const year = this.dataset.year
      updateHeatmapForYear(year)

      // 创建切换效果
      createYearSwitchEffect(this)
    })
  })
}

function updateHeatmapForYear(year) {
  // 重新生成对应年份的热力图数据
  createContributionHeatmap(year)

  showNotification(`🔄 已切換到 ${year === "all" ? "全部年份" : year + "年"} 數據`)
}

function createYearSwitchEffect(button) {
  const effect = document.createElement("div")
  effect.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.4), transparent);
    border-radius: 15px;
    animation: yearSwitch 0.6s ease-out;
    pointer-events: none;
  `

  button.style.position = "relative"
  button.appendChild(effect)

  setTimeout(() => {
    effect.remove()
  }, 600)

  // 添加年份切换动画
  if (!document.querySelector("#year-switch-style")) {
    const style = document.createElement("style")
    style.id = "year-switch-style"
    style.textContent = `
      @keyframes yearSwitch {
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

// 创建贡献热力图
function createContributionHeatmap(year = "2024") {
  const grid = document.getElementById("contributionGrid")
  grid.innerHTML = "" // 清空现有内容

  const today = new Date()
  const startDate = year === "all" ? new Date(today.getFullYear() - 2, 0, 1) : new Date(Number.parseInt(year), 0, 1)
  const endDate = year === "all" ? today : new Date(Number.parseInt(year), 11, 31)

  let totalContributions = 0
  const currentDate = new Date(startDate)

  // 生成贡献数据
  while (currentDate <= endDate && currentDate <= today) {
    const cell = document.createElement("div")
    cell.className = "contribution-cell"

    // 智能生成贡献级别
    const level = generateContributionLevel(currentDate)
    const contributions = level * Math.floor(Math.random() * 5 + 1)

    cell.dataset.level = level
    cell.dataset.date = currentDate.toISOString().split("T")[0]
    cell.dataset.contributions = contributions

    totalContributions += contributions

    // 添加交互事件
    cell.addEventListener("mouseenter", (e) => showContributionTooltip(e, cell))
    cell.addEventListener("mouseleave", hideTooltip)
    cell.addEventListener("click", () => createContributionRipple(cell))

    grid.appendChild(cell)
    currentDate.setDate(currentDate.getDate() + 1)
  }

  // 更新总贡献数
  document.getElementById("totalContributions").textContent = totalContributions.toLocaleString()

  // 创建贡献动画
  animateContributionCells()
}

function generateContributionLevel(date) {
  const day = date.getDay()
  const hour = date.getHours()

  // 工作日更活跃
  let baseLevel = day >= 1 && day <= 5 ? 2 : 1

  // 特殊日期增加活跃度
  if (date.getDate() % 7 === 0) baseLevel += 1
  if (date.getMonth() === 5) baseLevel += 1 // 6月最活跃

  // 随机因素
  const random = Math.random()
  if (random > 0.8) baseLevel += 2
  else if (random > 0.6) baseLevel += 1
  else if (random < 0.2) baseLevel = Math.max(0, baseLevel - 1)

  return Math.min(4, Math.max(0, baseLevel))
}

function animateContributionCells() {
  const cells = document.querySelectorAll(".contribution-cell")

  cells.forEach((cell, index) => {
    setTimeout(() => {
      cell.style.opacity = "0"
      cell.style.transform = "scale(0)"
      cell.style.transition = "all 0.3s ease"

      setTimeout(() => {
        cell.style.opacity = "1"
        cell.style.transform = "scale(1)"
      }, 50)
    }, index * 2)
  })
}

function showContributionTooltip(e, cell) {
  const tooltip = document.getElementById("contributionTooltip")
  const contributions = cell.dataset.contributions
  const date = new Date(cell.dataset.date)
  const level = cell.dataset.level

  const levelTexts = ["無貢獻", "輕度活躍", "中度活躍", "高度活躍", "極度活躍"]

  tooltip.querySelector(".tooltip-title").textContent = "貢獻活動"
  tooltip.querySelector(".tooltip-value").textContent = `${contributions} 次貢獻 (${levelTexts[level]})`
  tooltip.querySelector(".tooltip-date").textContent = date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })

  tooltip.style.left = e.pageX + 15 + "px"
  tooltip.style.top = e.pageY - 10 + "px"
  tooltip.classList.add("show")
}

function createContributionRipple(cell) {
  const ripple = document.createElement("div")
  ripple.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(0, 212, 255, 0.6);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: contributionRipple 0.8s ease-out;
    pointer-events: none;
    z-index: 10;
  `

  cell.style.position = "relative"
  cell.appendChild(ripple)

  // 创建能量波纹
  createEnergyWave(cell)

  setTimeout(() => {
    ripple.remove()
  }, 800)

  // 添加贡献波纹动画
  if (!document.querySelector("#contribution-ripple-style")) {
    const style = document.createElement("style")
    style.id = "contribution-ripple-style"
    style.textContent = `
      @keyframes contributionRipple {
        to {
          width: 40px;
          height: 40px;
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

function createEnergyWave(cell) {
  const wave = document.createElement("div")
  wave.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 212, 255, 0.8);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: energyWave 1.2s ease-out;
    pointer-events: none;
    z-index: 9;
  `

  cell.appendChild(wave)

  setTimeout(() => {
    wave.remove()
  }, 1200)

  if (!document.querySelector("#energy-wave-style")) {
    const style = document.createElement("style")
    style.id = "energy-wave-style"
    style.textContent = `
      @keyframes energyWave {
        0% {
          width: 20px;
          height: 20px;
          opacity: 1;
        }
        100% {
          width: 60px;
          height: 60px;
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

// 创建时间热力图
function createTimeHeatmap() {
  const heatmap = document.getElementById("timeHeatmap")

  // 生成7天x24小时的热力图
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const cell = document.createElement("div")
      cell.className = "heatmap-cell"

      // 智能生成活跃度数据
      const activity = generateActivityLevel(day, hour)

      cell.dataset.activity = activity
      cell.dataset.day = ["一", "二", "三", "四", "五", "六", "日"][day]
      cell.dataset.hour = hour

      // 添加悬停效果
      cell.addEventListener("mouseenter", (e) => showActivityTooltip(e, cell))
      cell.addEventListener("mouseleave", hideTooltip)
      cell.addEventListener("click", () => createActivityPulse(cell))

      heatmap.appendChild(cell)
    }
  }
}

function generateActivityLevel(day, hour) {
  let activity = 0

  // 工作日模式 (周一到周五)
  if (day >= 0 && day <= 4) {
    if (hour >= 9 && hour <= 12)
      activity = 2 + Math.floor(Math.random() * 2) // 上午
    else if (hour >= 14 && hour <= 18)
      activity = 3 + Math.floor(Math.random() * 2) // 下午
    else if (hour >= 20 && hour <= 22)
      activity = 4 + Math.floor(Math.random() * 2) // 晚上高峰
    else if (hour >= 19 && hour <= 23)
      activity = 2 + Math.floor(Math.random() * 3) // 晚上
    else activity = Math.floor(Math.random() * 2) // 其他时间
  }
  // 周末模式
  else {
    if (hour >= 10 && hour <= 12)
      activity = 2 + Math.floor(Math.random() * 2) // 上午
    else if (hour >= 14 && hour <= 16)
      activity = 3 + Math.floor(Math.random() * 2) // 下午
    else if (hour >= 20 && hour <= 22)
      activity = 4 + Math.floor(Math.random() * 2) // 晚上高峰
    else if (hour >= 19 && hour <= 23)
      activity = 2 + Math.floor(Math.random() * 3) // 晚上
    else activity = Math.floor(Math.random() * 2) // 其他时间
  }

  return Math.min(5, Math.max(0, activity))
}

function showActivityTooltip(e, cell) {
  const tooltip = document.getElementById("contributionTooltip")
  const activity = cell.dataset.activity
  const day = cell.dataset.day
  const hour = cell.dataset.hour

  const activityLevels = ["無活動", "很低", "低", "中等", "高", "很高"]
  const activityColors = ["#666", "#00d4ff", "#66ccff", "#0099cc", "#0066cc", "#003399"]

  tooltip.querySelector(".tooltip-title").textContent = "活躍程度"
  tooltip.querySelector(".tooltip-value").textContent = activityLevels[activity]
  tooltip.querySelector(".tooltip-value").style.color = activityColors[activity]
  tooltip.querySelector(".tooltip-date").textContent = `週${day} ${hour.toString().padStart(2, "0")}:00`

  tooltip.style.left = e.pageX + 15 + "px"
  tooltip.style.top = e.pageY - 10 + "px"
  tooltip.classList.add("show")
}

function createActivityPulse(cell) {
  const pulse = document.createElement("div")
  pulse.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    background: rgba(0, 212, 255, 0.3);
    border: 2px solid rgba(0, 212, 255, 0.8);
    border-radius: 2px;
    transform: translate(-50%, -50%);
    animation: activityPulse 1s ease-out;
    pointer-events: none;
    z-index: 10;
  `

  cell.style.position = "relative"
  cell.appendChild(pulse)

  setTimeout(() => {
    pulse.remove()
  }, 1000)

  if (!document.querySelector("#activity-pulse-style")) {
    const style = document.createElement("style")
    style.id = "activity-pulse-style"
    style.textContent = `
      @keyframes activityPulse {
        0% {
          transform: translate(-50%, -50%) scale(1);
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

function hideTooltip() {
  const tooltip = document.getElementById("contributionTooltip")
  tooltip.classList.remove("show")
}

// 统计数字动画
function animateStatNumbers() {
  const statValues = document.querySelectorAll(".stat-value")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number.parseInt(entry.target.dataset.target)
        animateNumber(entry.target, target)
        observer.unobserve(entry.target)
      }
    })
  })

  statValues.forEach((stat) => observer.observe(stat))
}

function animateNumber(element, target) {
  let current = 0
  const increment = target / 100
  const duration = 2000
  const stepTime = duration / 100

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }

    element.textContent = Math.floor(current).toLocaleString()

    // 添加数字发光效果
    if (current === target) {
      element.style.textShadow = "0 0 20px rgba(0, 212, 255, 0.8)"
      setTimeout(() => {
        element.style.textShadow = "0 0 15px rgba(0, 212, 255, 0.5)"
      }, 500)
    }
  }, stepTime)
}

// 初始化图表
function initializeCharts() {
  createMonthlyTrendChart()
}

function createMonthlyTrendChart() {
  const canvas = document.getElementById("monthlyTrendChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // 模拟月度数据
  const monthlyData = [45, 67, 89, 123, 156, 134, 178, 145, 167, 189, 201, 187]

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      datasets: [
        {
          label: "月度貢獻",
          data: monthlyData,
          borderColor: "#00d4ff",
          backgroundColor: "rgba(0, 212, 255, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#00d4ff",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "#66ccff",
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(0, 212, 255, 0.3)",
          },
          ticks: {
            color: "#b0b8c8",
            font: {
              weight: 500,
            },
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(0, 212, 255, 0.3)",
          },
          ticks: {
            color: "#b0b8c8",
            font: {
              weight: 500,
            },
          },
        },
      },
      elements: {
        point: {
          hoverBackgroundColor: "#00d4ff",
        },
      },
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
    },
  })
}

// 设置提示框
function setupTooltips() {
  // 为成就卡片添加特殊交互
  const achievementCards = document.querySelectorAll(".achievement-card")

  achievementCards.forEach((card) => {
    card.addEventListener("click", function () {
      if (this.classList.contains("achieved")) {
        createAchievementCelebration(this)
      } else {
        createProgressAnimation(this)
      }
    })

    card.addEventListener("mouseenter", function () {
      createAchievementAura(this)
    })
  })
}

function createAchievementCelebration(card) {
  const rect = card.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // 创建庆祝粒子
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div")
    const symbols = ["⭐", "✨", "💫", "🌟", "💎", "🔥", "⚡", "🌊"]
    const symbol = symbols[Math.floor(Math.random() * symbols.length)]

    particle.textContent = symbol
    particle.style.cssText = `
      position: fixed;
      left: ${centerX}px;
      top: ${centerY}px;
      font-size: ${Math.random() * 20 + 15}px;
      pointer-events: none;
      z-index: 9999;
      animation: celebrationParticle 2s ease-out forwards;
    `

    const angle = (Math.PI * 2 * i) / 15
    const velocity = Math.random() * 150 + 100
    const vx = Math.cos(angle) * velocity
    const vy = Math.sin(angle) * velocity

    particle.style.setProperty("--vx", vx + "px")
    particle.style.setProperty("--vy", vy + "px")

    document.body.appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, 2000)
  }

  // 添加庆祝动画样式
  if (!document.querySelector("#celebration-style")) {
    const style = document.createElement("style")
    style.id = "celebration-style"
    style.textContent = `
      @keyframes celebrationParticle {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(0) rotate(0deg);
        }
        20% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1) rotate(90deg);
        }
        100% {
          opacity: 0;
          transform: translate(calc(-50% + var(--vx)), calc(-50% + var(--vy))) scale(0) rotate(360deg);
        }
      }
    `
    document.head.appendChild(style)
  }

  showNotification("🎉 成就已解鎖！共鳴能量+100！")
}

function createProgressAnimation(card) {
  const progressBar = card.querySelector(".progress-fill")
  if (progressBar) {
    const currentWidth = Number.parseInt(progressBar.style.width)
    const newWidth = Math.min(100, currentWidth + Math.random() * 5 + 2)

    progressBar.style.width = newWidth + "%"

    // 创建进度提升效果
    const progressEffect = document.createElement("div")
    progressEffect.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
      animation: progressGlow 1s ease-out;
      pointer-events: none;
    `

    progressBar.style.position = "relative"
    progressBar.appendChild(progressEffect)

    setTimeout(() => {
      progressEffect.remove()
    }, 1000)

    showNotification(`📈 進度提升！當前進度: ${newWidth.toFixed(1)}%`)
  }
}

function createAchievementAura(card) {
  if (card.querySelector(".hover-aura")) return

  const aura = document.createElement("div")
  aura.className = "hover-aura"
  aura.style.cssText = `
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 25px;
    background: linear-gradient(45deg, 
      rgba(0, 212, 255, 0.2), 
      rgba(102, 204, 255, 0.2), 
      rgba(0, 153, 204, 0.2),
      rgba(0, 212, 255, 0.2)
    );
    background-size: 400% 400%;
    animation: auraShift 3s ease-in-out infinite;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  `

  card.style.position = "relative"
  card.appendChild(aura)

  setTimeout(() => {
    aura.style.opacity = "1"
  }, 50)

  card.addEventListener(
    "mouseleave",
    () => {
      aura.style.opacity = "0"
      setTimeout(() => {
        aura.remove()
      }, 300)
    },
    { once: true },
  )

  if (!document.querySelector("#aura-shift-style")) {
    const style = document.createElement("style")
    style.id = "aura-shift-style"
    style.textContent = `
      @keyframes auraShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
    `
    document.head.appendChild(style)
  }
}

// 创建背景效果
function createBackgroundEffects() {
  createFloatingSymbols()
  createEnergyStreams()
}

function createFloatingSymbols() {
  const symbols = ["🌊", "⚡", "💫", "✨", "🔥", "💎", "🌟", "💠"]

  function createSymbol() {
    const symbol = document.createElement("div")
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)]
    symbol.style.cssText = `
      position: fixed;
      color: rgba(0, 212, 255, ${Math.random() * 0.6 + 0.2});
      font-size: ${Math.random() * 30 + 20}px;
      left: ${Math.random() * 100}vw;
      top: 100vh;
      pointer-events: none;
      z-index: -1;
      animation: symbolFloat ${Math.random() * 10 + 8}s linear infinite;
    `

    document.body.appendChild(symbol)

    setTimeout(() => {
      symbol.remove()
    }, 18000)
  }

  // 定期创建符号
  setInterval(createSymbol, 2000)

  // 添加符号浮动动画
  if (!document.querySelector("#symbol-float-style")) {
    const style = document.createElement("style")
    style.id = "symbol-float-style"
    style.textContent = `
      @keyframes symbolFloat {
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

function createEnergyStreams() {
  const container = document.querySelector(".energy-streams")
  if (!container) return

  function createStream() {
    const stream = document.createElement("div")
    stream.style.cssText = `
      position: absolute;
      width: 2px;
      height: 100px;
      background: linear-gradient(180deg, 
        transparent, 
        rgba(0, 212, 255, 0.8), 
        transparent
      );
      left: ${Math.random() * 100}%;
      top: -100px;
      animation: streamFlow ${Math.random() * 3 + 2}s linear infinite;
      pointer-events: none;
    `

    container.appendChild(stream)

    setTimeout(() => {
      stream.remove()
    }, 5000)
  }

  // 定期创建能量流
  setInterval(createStream, 500)

  if (!document.querySelector("#stream-flow-style")) {
    const style = document.createElement("style")
    style.id = "stream-flow-style"
    style.textContent = `
      @keyframes streamFlow {
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
  const characters = document.querySelectorAll(".header-char, .stats-char-img, .card-char")
  characters.forEach((char, index) => {
    const speed = 0.02 + (index % 3) * 0.01
    char.style.transform = `translateY(${scrolled * speed}px)`
  })
})

console.log("🌊 Contributions page loaded with enhanced Wuthering Waves resonance effects! ⚡")
