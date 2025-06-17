import { Chart } from "@/components/ui/chart"
// Stats 页面专用脚本
document.addEventListener("DOMContentLoaded", () => {
  // 初始化所有功能
  initializeStats()
  setupPeriodButtons()
  createContributionGraph()
  initializeCharts()
  setupRealtimeData()
  animateStatNumbers()
  createActivityHeatmap()
  setupTooltips()
  createTitleParticles()
})

// 初始化统计数据
function initializeStats() {
  console.log("🚀 Stats page initialized with Wuthering Waves theme!")
}

// 时间周期按钮
function setupPeriodButtons() {
  const periodBtns = document.querySelectorAll(".period-btn")

  periodBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      periodBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const period = this.dataset.period
      updateStatsForPeriod(period)

      // 创建选择效果
      createSelectionEffect(this)
    })
  })
}

function updateStatsForPeriod(period) {
  // 模拟数据更新
  const mockData = {
    "7d": { users: 1247, commands: 15420, uptime: 99.9, response: 2.8 },
    "30d": { users: 1156, commands: 45230, uptime: 99.7, response: 3.1 },
    "90d": { users: 987, commands: 125600, uptime: 99.5, response: 3.5 },
    "1y": { users: 543, commands: 456780, uptime: 99.2, response: 4.2 },
  }

  const data = mockData[period]
  if (data) {
    updateStatCards(data)
    updateCharts(period)
  }

  showNotification(`📊 已切換到 ${period} 數據視圖`)
}

function createSelectionEffect(button) {
  const effect = document.createElement("div")
  effect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent);
        border-radius: 20px;
        animation: selectionPulse 0.6s ease-out;
        pointer-events: none;
    `

  button.style.position = "relative"
  button.appendChild(effect)

  setTimeout(() => {
    effect.remove()
  }, 600)

  // 添加选择脉冲动画
  if (!document.querySelector("#selection-pulse-style")) {
    const style = document.createElement("style")
    style.id = "selection-pulse-style"
    style.textContent = `
            @keyframes selectionPulse {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(1.5);
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(style)
  }
}

// 统计数字动画
function animateStatNumbers() {
  const statValues = document.querySelectorAll(".stat-value")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number.parseFloat(entry.target.dataset.target)
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

    if (target % 1 !== 0) {
      element.textContent = current.toFixed(1)
    } else {
      element.textContent = Math.floor(current).toLocaleString()
    }
  }, stepTime)
}

function updateStatCards(data) {
  const cards = document.querySelectorAll(".stat-value")
  cards[0].dataset.target = data.users
  cards[1].dataset.target = data.commands
  cards[2].dataset.target = data.uptime
  cards[3].dataset.target = data.response

  // 重新动画
  cards.forEach((card) => {
    const target = Number.parseFloat(card.dataset.target)
    animateNumber(card, target)
  })
}

// 贡献热力图
function createContributionGraph() {
  const grid = document.getElementById("contributionGrid")
  const today = new Date()
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

  let totalContributions = 0
  const currentDate = new Date(oneYearAgo)

  // 生成一年的数据
  while (currentDate <= today) {
    const cell = document.createElement("div")
    cell.className = "contribution-cell"

    // 随机生成贡献级别 (0-4)
    const level = Math.floor(Math.random() * 5)
    const contributions = level * Math.floor(Math.random() * 5 + 1)

    cell.dataset.level = level
    cell.dataset.date = currentDate.toISOString().split("T")[0]
    cell.dataset.contributions = contributions

    totalContributions += contributions

    // 添加悬停效果
    cell.addEventListener("mouseenter", (e) => showContributionTooltip(e, cell))
    cell.addEventListener("mouseleave", hideTooltip)

    // 添加点击效果
    cell.addEventListener("click", () => createContributionRipple(cell))

    grid.appendChild(cell)
    currentDate.setDate(currentDate.getDate() + 1)
  }

  // 更新总贡献数
  document.getElementById("totalContributions").textContent = totalContributions.toLocaleString()
}

function showContributionTooltip(e, cell) {
  const tooltip = document.getElementById("dataTooltip")
  const contributions = cell.dataset.contributions
  const date = new Date(cell.dataset.date)

  tooltip.querySelector(".tooltip-title").textContent = "貢獻活動"
  tooltip.querySelector(".tooltip-value").textContent = `${contributions} 次貢獻`
  tooltip.querySelector(".tooltip-date").textContent = date.toLocaleDateString("zh-TW")

  tooltip.style.left = e.pageX + 10 + "px"
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
    background: rgba(0, 212, 255, 0.5);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: contributionRipple 0.6s ease-out;
    pointer-events: none;
  `

  cell.style.position = "relative"
  cell.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)

  // 添加贡献波纹动画
  if (!document.querySelector("#contribution-ripple-style")) {
    const style = document.createElement("style")
    style.id = "contribution-ripple-style"
    style.textContent = `
      @keyframes contributionRipple {
        to {
          width: 30px;
          height: 30px;
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

// 活跃时间热力图
function createActivityHeatmap() {
  const heatmap = document.getElementById("activityHeatmap")

  // 生成7天x24小时的热力图
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const cell = document.createElement("div")
      cell.className = "heatmap-cell"

      // 模拟活跃度数据 (晚上8-10点最活跃)
      let activity = 0
      if (hour >= 20 && hour <= 22) {
        activity = Math.floor(Math.random() * 3) + 3 // 3-5
      } else if (hour >= 18 && hour <= 23) {
        activity = Math.floor(Math.random() * 3) + 2 // 2-4
      } else if (hour >= 12 && hour <= 17) {
        activity = Math.floor(Math.random() * 3) + 1 // 1-3
      } else {
        activity = Math.floor(Math.random() * 2) // 0-1
      }

      cell.dataset.activity = activity
      cell.dataset.day = ["一", "二", "三", "四", "五", "六", "日"][day]
      cell.dataset.hour = hour

      // 添加悬停效果
      cell.addEventListener("mouseenter", (e) => showActivityTooltip(e, cell))
      cell.addEventListener("mouseleave", hideTooltip)

      heatmap.appendChild(cell)
    }
  }
}

function showActivityTooltip(e, cell) {
  const tooltip = document.getElementById("dataTooltip")
  const activity = cell.dataset.activity
  const day = cell.dataset.day
  const hour = cell.dataset.hour

  const activityLevels = ["很低", "低", "中等", "高", "很高", "極高"]

  tooltip.querySelector(".tooltip-title").textContent = "用戶活躍度"
  tooltip.querySelector(".tooltip-value").textContent = activityLevels[activity]
  tooltip.querySelector(".tooltip-date").textContent = `週${day} ${hour}:00`

  tooltip.style.left = e.pageX + 10 + "px"
  tooltip.style.top = e.pageY - 10 + "px"
  tooltip.classList.add("show")
}

function hideTooltip() {
  const tooltip = document.getElementById("dataTooltip")
  tooltip.classList.remove("show")
}

// 图表初始化
function initializeCharts() {
  createUserGrowthChart()
  createFeatureUsageChart()
  createPerformanceChart()
  createMiniCharts()
}

function createUserGrowthChart() {
  const ctx = document.getElementById("userGrowthChart").getContext("2d")

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      datasets: [
        {
          label: "用戶數量",
          data: [120, 190, 300, 500, 650, 800, 950, 1100, 1200, 1247, 1300, 1400],
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
          },
          ticks: {
            color: "#b0b8c8",
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "#b0b8c8",
          },
        },
      },
      elements: {
        point: {
          hoverBackgroundColor: "#00d4ff",
        },
      },
    },
  })
}

function createFeatureUsageChart() {
  const ctx = document.getElementById("featureUsageChart").getContext("2d")

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["角色面板", "抽卡記錄", "深塔查詢", "其他功能"],
      datasets: [
        {
          data: [35, 28, 20, 17],
          backgroundColor: ["#00d4ff", "#0099cc", "#66ccff", "#99ddff"],
          borderWidth: 0,
          hoverBorderWidth: 3,
          hoverBorderColor: "#ffffff",
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
      cutout: "60%",
    },
  })
}

function createPerformanceChart() {
  const ctx = document.getElementById("performanceChart").getContext("2d")

  const timeLabels = []
  const cpuData = []
  const memoryData = []
  const networkData = []

  // 生成24小时的数据
  for (let i = 0; i < 24; i++) {
    timeLabels.push(`${i}:00`)
    cpuData.push(Math.random() * 30 + 20) // 20-50%
    memoryData.push(Math.random() * 20 + 60) // 60-80%
    networkData.push(Math.random() * 40 + 30) // 30-70%
  }

  new Chart(ctx, {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "CPU使用率",
          data: cpuData,
          borderColor: "#00d4ff",
          backgroundColor: "rgba(0, 212, 255, 0.1)",
          borderWidth: 2,
          fill: false,
          tension: 0.4,
        },
        {
          label: "內存使用率",
          data: memoryData,
          borderColor: "#ffaa00",
          backgroundColor: "rgba(255, 170, 0, 0.1)",
          borderWidth: 2,
          fill: false,
          tension: 0.4,
        },
        {
          label: "網絡使用率",
          data: networkData,
          borderColor: "#00ff88",
          backgroundColor: "rgba(0, 255, 136, 0.1)",
          borderWidth: 2,
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#b0b8c8",
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "#b0b8c8",
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "#b0b8c8",
          },
          min: 0,
          max: 100,
        },
      },
    },
  })
}

function createMiniCharts() {
  // 为统计卡片创建迷你图表
  const chartIds = ["usersChart", "commandsChart", "uptimeChart", "responseChart"]
  const chartData = [
    [10, 15, 12, 18, 25, 22, 30],
    [100, 120, 110, 140, 160, 150, 180],
    [99.1, 99.5, 99.8, 99.9, 99.7, 99.9, 99.9],
    [3.2, 2.8, 3.1, 2.5, 2.8, 2.9, 2.8],
  ]

  chartIds.forEach((id, index) => {
    const ctx = document.getElementById(id)
    if (ctx) {
      new Chart(ctx.getContext("2d"), {
        type: "line",
        data: {
          labels: ["", "", "", "", "", "", ""],
          datasets: [
            {
              data: chartData[index],
              borderColor: "#00d4ff",
              backgroundColor: "rgba(0, 212, 255, 0.2)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: { display: false },
            y: { display: false },
          },
          elements: {
            point: { radius: 0 },
          },
        },
      })
    }
  })
}

// 实时数据更新
function setupRealtimeData() {
  updateRealtimeValues()
  createRealtimeChart()

  // 每5秒更新一次实时数据
  setInterval(updateRealtimeValues, 5000)
}

function updateRealtimeValues() {
  const onlineUsers = document.getElementById("onlineUsers")
  const newUsers = document.getElementById("newUsers")
  const systemLoad = document.getElementById("systemLoad")
  const errorRate = document.getElementById("errorRate")
  const loadProgress = document.getElementById("loadProgress")

  // 模拟实时数据
  const currentOnline = Math.floor(Math.random() * 50) + 80
  const todayNew = Math.floor(Math.random() * 10) + 15
  const load = Math.floor(Math.random() * 30) + 40
  const errors = (Math.random() * 0.5).toFixed(2)

  // 动画更新数值
  animateValue(onlineUsers, currentOnline)
  animateValue(newUsers, todayNew)
  animateValue(systemLoad, load, "%")
  animateValue(errorRate, errors, "%")

  // 更新负载条
  loadProgress.style.width = load + "%"

  // 根据负载调整颜色
  if (load > 80) {
    loadProgress.style.background = "linear-gradient(90deg, #ff4444, #cc0000)"
  } else if (load > 60) {
    loadProgress.style.background = "linear-gradient(90deg, #ffaa00, #ff6600)"
  } else {
    loadProgress.style.background = "linear-gradient(90deg, #00d4ff, #0099cc)"
  }
}

function animateValue(element, target, suffix = "") {
  const current = Number.parseInt(element.textContent) || 0
  const increment = (target - current) / 20
  let step = 0

  const timer = setInterval(() => {
    step++
    const value = Math.floor(current + increment * step)
    element.textContent = value + suffix

    if (step >= 20) {
      element.textContent = target + suffix
      clearInterval(timer)
    }
  }, 50)
}

function createRealtimeChart() {
  const ctx = document.getElementById("realtimeChart")
  if (!ctx) return

  const realtimeData = Array(20)
    .fill(0)
    .map(() => Math.floor(Math.random() * 30) + 70)

  const chart = new Chart(ctx.getContext("2d"), {
    type: "line",
    data: {
      labels: Array(20).fill(""),
      datasets: [
        {
          data: realtimeData,
          borderColor: "#00d4ff",
          backgroundColor: "rgba(0, 212, 255, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { display: false },
        y: { display: false },
      },
      animation: {
        duration: 1000,
        easing: "easeInOutQuart",
      },
    },
  })

  // 每5秒更新图表数据
  setInterval(() => {
    chart.data.datasets[0].data.shift()
    chart.data.datasets[0].data.push(Math.floor(Math.random() * 30) + 70)
    chart.update("none")
  }, 5000)
}

// 图表控制按钮
function setupChartControls() {
  const chartBtns = document.querySelectorAll(".chart-btn")

  chartBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const chartType = this.dataset.chart
      const type = this.dataset.type

      // 更新按钮状态
      const siblings = this.parentElement.querySelectorAll(".chart-btn")
      siblings.forEach((s) => s.classList.remove("active"))
      this.classList.add("active")

      // 更新图表类型
      updateChartType(chartType, type)

      // 创建切换效果
      createChartSwitchEffect(this)
    })
  })
}

function updateChartType(chartName, type) {
  // 这里可以实现图表类型切换逻辑
  showNotification(`📊 已切換到 ${type} 視圖`)
}

function createChartSwitchEffect(button) {
  const effect = document.createElement("div")
  effect.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 212, 255, 0.2), rgba(0, 153, 204, 0.2));
    border-radius: 8px;
    animation: chartSwitch 0.4s ease-out;
    pointer-events: none;
  `

  button.style.position = "relative"
  button.appendChild(effect)

  setTimeout(() => {
    effect.remove()
  }, 400)

  if (!document.querySelector("#chart-switch-style")) {
    const style = document.createElement("style")
    style.id = "chart-switch-style"
    style.textContent = `
      @keyframes chartSwitch {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        50% {
          opacity: 1;
          transform: scale(1.1);
        }
        100% {
          opacity: 0;
          transform: scale(1);
        }
      }
    `
    document.head.appendChild(style)
  }
}

// 提示框系统
function setupTooltips() {
  // 为所有统计卡片添加提示框
  const statCards = document.querySelectorAll(".stat-card")

  statCards.forEach((card) => {
    card.addEventListener("mouseenter", (e) => showStatTooltip(e, card))
    card.addEventListener("mouseleave", hideTooltip)
  })
}

function showStatTooltip(e, card) {
  const tooltip = document.getElementById("dataTooltip")
  const icon = card.querySelector(".stat-icon").textContent
  const value = card.querySelector(".stat-value").textContent
  const label = card.querySelector(".stat-label").textContent

  tooltip.querySelector(".tooltip-title").textContent = label
  tooltip.querySelector(".tooltip-value").textContent = value
  tooltip.querySelector(".tooltip-date").textContent = "點擊查看詳細信息"

  tooltip.style.left = e.pageX + 10 + "px"
  tooltip.style.top = e.pageY - 10 + "px"
  tooltip.classList.add("show")
}

// 标题粒子效果
function createTitleParticles() {
  const particleContainer = document.querySelector(".title-particles")

  function createParticle() {
    const particle = document.createElement("div")
    const symbols = ["📊", "📈", "📉", "💹", "⚡", "🔥", "💎", "⭐"]
    const symbol = symbols[Math.floor(Math.random() * symbols.length)]

    particle.textContent = symbol
    particle.style.cssText = `
      position: absolute;
      color: rgba(0, 212, 255, ${Math.random() * 0.8 + 0.2});
      font-size: ${Math.random() * 20 + 15}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
      animation: titleParticle ${Math.random() * 4 + 3}s ease-out infinite;
    `

    particleContainer.appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, 7000)
  }

  // 定期创建粒子
  setInterval(createParticle, 800)

  // 添加标题粒子动画
  if (!document.querySelector("#title-particle-style")) {
    const style = document.createElement("style")
    style.id = "title-particle-style"
    style.textContent = `
      @keyframes titleParticle {
        0% {
          opacity: 0;
          transform: translateY(0) rotate(0deg) scale(0);
        }
        20% {
          opacity: 1;
          transform: translateY(-20px) rotate(90deg) scale(1);
        }
        80% {
          opacity: 1;
          transform: translateY(-40px) rotate(270deg) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-60px) rotate(360deg) scale(0);
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
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
    z-index: 9999;
    animation: notificationSlide 0.3s ease-out;
    backdrop-filter: blur(10px);
  `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "notificationSlide 0.3s ease-out reverse"
    setTimeout(() => {
      notification.remove()
    }, 300)
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
    backgroundEffects.style.transform = `translateY(${scrolled * 0.2}px)`
  }

  // 统计卡片视差
  const statCards = document.querySelectorAll(".stat-card")
  statCards.forEach((card, index) => {
    const speed = 0.05 + (index % 4) * 0.02
    card.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// 初始化图表控制
setupChartControls()

// 声明 updateCharts 函数
function updateCharts(period) {
  // 这里可以实现图表数据更新逻辑
  console.log(`Updating charts for period: ${period}`)
}

console.log("📊 Stats page loaded with comprehensive data visualization! 🌊")
