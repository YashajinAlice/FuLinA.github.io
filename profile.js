// Profile 页面专用脚本
document.addEventListener('DOMContentLoaded', function() {
    // 数字动画
    animateNumbers();
    
    // 技能条动画
    animateSkills();
    
    // 头像粒子效果
    createAvatarParticles();
    
    // 共鸣按钮效果
    setupResonanceButton();
    
    // 成就卡片交互
    setupAchievements();
    
    // 活动项目动画
    animateActivityItems();
});

// 数字动画
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    numbers.forEach(number => observer.observe(number));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target % 1 !== 0) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// 技能条动画
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                setTimeout(() => {
                    entry.target.style.width = width;
                    entry.target.classList.add('animated');
                }, Math.random() * 500);
                observer.unobserve(entry.target);
            }
        });
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// 头像粒子效果
function createAvatarParticles() {
    const particleContainer = document.querySelector('.avatar-particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(0, 212, 255, ${Math.random() * 0.8 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        
        // 随机位置（圆形分布）
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 100 + 50;
        const x = Math.cos(angle) * radius + 125;
        const y = Math.sin(angle) * radius + 125;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // 动画
        particle.style.animation = `avatarParticle ${Math.random() * 3 + 2}s ease-out forwards`;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
    
    // 定期创建粒子
    setInterval(createParticle, 200);
    
    // 添加粒子动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes avatarParticle {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            20% {
                opacity: 1;
                transform: scale(1) rotate(90deg);
            }
            80% {
                opacity: 1;
                transform: scale(1) rotate(270deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// 共鸣按钮效果
function setupResonanceButton() {
    const resonanceBtn = document.querySelector('.resonance-btn');
    const particleContainer = resonanceBtn.querySelector('.btn-particles');
    
    resonanceBtn.addEventListener('click', function(e) {
        // 创建共鸣波纹
        createResonanceRipple(e, this);
        
        // 创建按钮粒子
        createButtonParticles(particleContainer);
        
        // 震动效果
        this.style.animation = 'resonanceShake 0.5s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
    
    // 添加共鸣动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes resonanceShake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes buttonParticle {
            0% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-50px);
            }
        }
    `;
    document.head.appendChild(style);
}

function createResonanceRipple(e, button) {
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 212, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createButtonParticles(container) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = '#00d4ff';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `buttonParticle ${Math.random() * 1 + 0.5}s ease-out forwards`;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

// 成就卡片交互
function setupAchievements() {
    const achievementCards = document.querySelectorAll('.achievement-card.unlocked');
    
    achievementCards.forEach(card => {
        card.addEventListener('click', function() {
            // 创建庆祝效果
            createCelebrationEffect(this);
            
            // 播放成就音效（如果有的话）
            playAchievementSound();
        });
    });
}

function createCelebrationEffect(card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = ['#ffd700', '#ffaa00', '#ff6600'][Math.floor(Math.random() * 3)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = Math.random() * 100 + 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.animation = `celebrationParticle 1s ease-out forwards`;
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
    
    // 添加庆祝动画样式
    if (!document.querySelector('#celebration-style')) {
        const style = document.createElement('style');
        style.id = 'celebration-style';
        style.textContent = `
            @keyframes celebrationParticle {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(var(--vx), var(--vy)) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function playAchievementSound() {
    // 这里可以添加音效播放逻辑
    // 例如：new Audio('achievement.mp3').play();
    console.log('🎉 Achievement unlocked!');
}

// 活动项目动画
function animateActivityItems() {
    const activityItems = document.querySelectorAll('.activity-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    });
    
    activityItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// 鼠标跟随效果
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.5), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    cursorElement.style.left = e.clientX - 10 + 'px';
    cursorElement.style.top = e.clientY - 10 + 'px';
});

// 页面滚动视差效果
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.background-effects');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

console.log('Profile page loaded with enhanced Wuthering Waves effects! 🌊');
