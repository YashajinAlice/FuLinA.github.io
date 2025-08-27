<script>
  import { onMount } from 'svelte';
  
  let visible = false;
  let announcement = {
    title: '20250826公告',
    content: '我正在尋找2-3位對《wwuid》數據分析有熱情、願意一同加入開發行列的夥伴。如果你符合以下條件，我誠摯地邀請你加入：\n對數據敏感，擅長數值計算：協助我們進行角色、技能、武器等各項數值的精準計算與驗證。\n熱衷於收集遊戲資料：負責收集最新的角色技能、專武數值、素材清單等遊戲內數據含圖像等。',
    type: 'info', // info, warning, success, error
    date: '2024-01-01'
  };
  
  onMount(() => {
    // 每次載入都顯示公告
    setTimeout(() => {
      visible = true;
    }, 2000);
  });
  
  function closeModal() {
    visible = false;
  }
  
  function getTypeConfig() {
    switch (announcement.type) {
      case 'warning':
        return {
          icon: 'material-symbols:warning',
          bgColor: 'from-yellow-500/95 via-orange-500/95 to-red-500/95',
          iconColor: 'from-yellow-400 to-orange-500',
          borderColor: 'border-yellow-300/50'
        };
      case 'success':
        return {
          icon: 'material-symbols:check-circle',
          bgColor: 'from-green-500/95 via-emerald-500/95 to-teal-500/95',
          iconColor: 'from-green-400 to-emerald-500',
          borderColor: 'border-green-300/50'
        };
      case 'error':
        return {
          icon: 'material-symbols:error',
          bgColor: 'from-red-500/95 via-pink-500/95 to-rose-500/95',
          iconColor: 'from-red-400 to-pink-500',
          borderColor: 'border-red-300/50'
        };
      default:
        return {
          icon: 'material-symbols:info',
          bgColor: 'from-blue-500/95 via-purple-500/95 to-indigo-500/95',
          iconColor: 'from-blue-400 to-purple-500',
          borderColor: 'border-blue-300/50'
        };
    }
  }
  
  $: typeConfig = getTypeConfig();
</script>

{#if visible}
  <!-- 背景遮罩 -->
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fade-in" on:click={closeModal}></div>
  
  <!-- 彈窗內容 -->
  <div class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
    <div class="relative bg-gradient-to-br {typeConfig.bgColor} backdrop-blur-sm rounded-3xl p-8 shadow-2xl border {typeConfig.borderColor} max-w-md w-full animate-scale-in">
      <!-- 裝飾性元素 -->
      <div class="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-white/20 to-transparent rounded-full animate-pulse"></div>
      <div class="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-white/30 to-transparent rounded-full animate-ping"></div>
      <div class="absolute -bottom-2 -left-2 w-5 h-5 bg-gradient-to-br from-white/10 to-transparent rounded-full animate-bounce"></div>
      
             <!-- 關閉按鈕 -->
       <button 
         on:click={closeModal}
         class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200 hover:scale-110"
       >
         ✕
       </button>
      
      <!-- 標題區域 -->
      <div class="flex items-center mb-6">
                 <div class="w-12 h-12 bg-gradient-to-br {typeConfig.iconColor} rounded-full flex items-center justify-center mr-4 animate-bounce">
           <span class="text-white text-2xl">
             {announcement.type === 'warning' ? '⚠️' : 
              announcement.type === 'success' ? '✅' : 
              announcement.type === 'error' ? '❌' : 'ℹ️'}
           </span>
         </div>
        <div>
          <h2 class="text-white font-bold text-xl">{announcement.title}</h2>
                     <div class="flex items-center text-white/60 text-sm mt-1">
             <span class="mr-1">🕐</span>
             {announcement.date}
           </div>
        </div>
      </div>
      
      <!-- 內容區域 -->
      <div class="mb-6">
        <p class="text-white/90 text-base leading-relaxed">{announcement.content}</p>
      </div>
      
      <!-- 按鈕區域 -->
      <div class="flex justify-end">
        <button 
          on:click={closeModal}
          class="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm"
        >
          我知道了
        </button>
      </div>
      
      <!-- 底部裝飾 -->
      <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"></div>
    </div>
  </div>
{/if}

<style>
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .animate-scale-in {
    animation: scaleIn 0.4s ease-out forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes scaleIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
