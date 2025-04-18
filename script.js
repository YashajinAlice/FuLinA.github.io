document.addEventListener("DOMContentLoaded", () => {
  // 背景音樂控制
  const musicToggle = document.getElementById("music-toggle")
  const backgroundMusic = document.getElementById("background-music")
  let isPlaying = false

  // 音樂播放/暫停功能
  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      backgroundMusic.pause()
      musicToggle.classList.remove("playing")
      musicToggle.querySelector(".music-icon").textContent = "♪"
    } else {
      backgroundMusic.play().catch((e) => {
        console.log("自動播放被阻擋，請點擊按鈕播放音樂", e)
      })
      musicToggle.classList.add("playing")
      musicToggle.querySelector(".music-icon").textContent = "⏸"
    }
    isPlaying = !isPlaying
  })

  // 平滑滾動功能
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // 表單提交事件
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const nameInput = document.getElementById("name")
      const emailInput = document.getElementById("email")
      const messageInput = document.getElementById("message")

      // 簡單的表單驗證
      if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || messageInput.value.trim() === "") {
        alert("請填寫所有必填欄位")
        return
      }

      // 這裡可以添加表單提交的邏輯，例如AJAX請求
      alert("感謝您的訊息！我們會盡快回覆您。")
      contactForm.reset()
    })
  }

  // 導覽列滾動效果
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 50px"
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.padding = "20px 50px"
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }
  })
})
