# 贊助功能與載入動畫更新

## 新增功能

### 1. 贊助支持組件
- 位置：側邊欄底部
- 功能：提供多種贊助方式
- 配置：可在 `src/config.ts` 中自定義

#### 贊助方式
- **PayPal 贊助**：使用 PayPal 進行贊助
- **Ko-fi 贊助**：請我喝咖啡
- **GitHub Sponsors**：GitHub 贊助者計劃

#### 配置選項
```typescript
export const sponsorConfig: SponsorConfig = {
  enable: true,                    // 是否啟用贊助功能
  title: '贊助支持',               // 標題
  description: '描述文字',         // 描述
  links: [                        // 贊助連結列表
    {
      name: 'PayPal 贊助',
      url: 'https://www.paypal.com/...',
      icon: 'fa6-brands:paypal',
      color: 'text-blue-600'
    }
  ]
}
```

### 2. 載入動畫系統
- **進度條動畫**：頁面頂部的載入進度條
- **元素動畫**：各種組件的載入動畫
- **骨架屏**：可選的骨架屏載入效果

### 3. 滑鼠動畫系統
- **自定義游標**：替換原始滑鼠游標
- **拖尾效果**：滑鼠移動時的拖尾動畫
- **懸停效果**：滑鼠懸停時的縮放動畫
- **點擊效果**：滑鼠點擊時的縮放動畫
- **粒子效果**：滑鼠移動時產生的粒子動畫

### 4. 大字動畫系統
- **動畫文字**：自動切換的大字動畫效果
- **漸變色彩**：彩虹漸變的文字色彩
- **淡入淡出**：流暢的文字切換動畫
- **響應式設計**：適配不同螢幕尺寸

### 5. 機器人更新日誌頁面
- **精美排版**：現代化的更新日誌設計
- **版本分類**：按更新類型分類顯示
- **動畫效果**：載入和懸停動畫
- **響應式佈局**：完美適配移動端

#### 動畫類型
- `onload-animation`：淡入上移動畫
- `onload-animation-scale`：縮放淡入動畫
- `onload-animation-slide`：左滑入動畫

#### 載入管理器
- 自動管理頁面載入動畫
- 支持頁面切換動畫
- 智能隱藏/顯示進度條

## 圖標修正
- 使用 Material Symbols 圖標集
- 修正了圖標顯示問題
- 支持深色/淺色主題

## 使用方法

### 啟用贊助功能
1. 在 `src/config.ts` 中設置 `sponsorConfig.enable = true`
2. 更新贊助連結為您的實際連結
3. 自定義標題和描述

### 自定義載入動畫
1. 在組件上添加動畫類名
2. 調整動畫延遲時間
3. 使用載入管理器控制全局動畫

### 自定義滑鼠動畫
1. 在 `src/config.ts` 中調整 `mouseAnimationConfig`
2. 啟用/禁用游標和粒子效果
3. 自定義游標大小、顏色和動畫效果

### 使用大字動畫
1. 在組件中使用 `<AnimatedText>` 組件
2. 設置文字數組和切換間隔
3. 自定義樣式和動畫效果

### 更新日誌頁面
1. 訪問 `/bot-changelog/` 頁面
2. 在 `src/pages/bot-changelog.astro` 中修改內容
3. 自定義更新日誌數據和樣式

### 添加新的贊助方式
1. 在 `sponsorConfig.links` 中添加新項目
2. 設置正確的圖標名稱和顏色
3. 提供有效的贊助連結

## 文件結構
```
src/
├── components/
│   ├── widget/
│   │   └── Sponsor.astro          # 贊助組件
│   ├── LoadingManager.astro       # 載入動畫管理器
│   ├── LoadingSkeleton.astro      # 骨架屏組件
│   ├── SimpleMouseCursor.astro    # 滑鼠游標組件
│   ├── MouseParticles.astro       # 滑鼠粒子組件
│   ├── AnimatedText.astro         # 大字動畫組件
│   └── HomeHero.astro             # 首頁英雄區域
├── pages/
│   └── bot-changelog.astro        # 機器人更新日誌頁面
├── types/
│   └── config.ts                  # 配置類型定義
└── config.ts                      # 主配置文件
```

## 注意事項
- 確保所有圖標名稱正確
- 贊助連結需要是有效的 URL
- 載入動畫會影響頁面性能，請適度使用
- 建議在生產環境中測試所有功能
