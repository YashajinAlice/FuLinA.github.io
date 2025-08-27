<script>
  import { onMount } from 'svelte';
  
  let visible = false;
  let latestPost = {
    title: 'wwuid主要教程',
    date: '2025-08-26',
    excerpt: '该文章尚在施工中...'
  };
  
  onMount(() => {
    // 延遲顯示通知
    setTimeout(() => {
      visible = true;
    }, 1000);
  });
  
  function closeNotification() {
    visible = false;
  }
  
  function viewPost() {
    // 跳轉到文章頁面
    window.location.href = 'posts/guide';
  }
</script>

{#if visible}
  <div class="fixed top-4 right-4 z-50 animate-slide-in-right">
    <!-- 通知卡片 -->
    <div class="relative bg-gradient-to-br from-purple-500/95 via-pink-500/95 to-cyan-500/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 max-w-sm">
      <!-- 裝飾性元素 -->
      <div class="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
      <div class="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
      
      <!-- 關閉按鈕 -->
      <button 
        on:click={closeNotification}
        class="absolute top-2 right-2 text-white/70 hover:text-white transition-colors duration-200"
      >
        ✕
      </button>
      
      <!-- 標題區域 -->
      <div class="flex items-center mb-3">
        <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3 animate-bounce">
          <span class="text-white text-lg">📰</span>
        </div>
        <h3 class="text-white font-bold text-lg">最新文章更新</h3>
      </div>
      
      <!-- 文章資訊 -->
      <div class="mb-4">
        <h4 class="text-white font-semibold mb-2 line-clamp-2">{latestPost.title}</h4>
        <p class="text-white/80 text-sm mb-2 line-clamp-2">{latestPost.excerpt}</p>
        <div class="flex items-center text-white/60 text-xs">
          <span class="mr-1">🕐</span>
          {latestPost.date}
        </div>
      </div>
      
      <!-- 按鈕區域 -->
      <div class="flex gap-2">
        <button 
          on:click={viewPost}
          class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 backdrop-blur-sm"
        >
          立即閱讀
        </button>
        <button 
          on:click={closeNotification}
          class="px-4 py-2 text-white/70 hover:text-white transition-colors duration-200"
        >
          稍後
        </button>
      </div>
      
      <!-- 底部裝飾 -->
      <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
    </div>
  </div>
{/if}

<style>
  .animate-slide-in-right {
    animation: slideInRight 0.6s ease-out forwards;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
