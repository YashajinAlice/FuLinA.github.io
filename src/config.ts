import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
  SponsorConfig,
  MouseAnimationConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: '共鳴Blog',
  subtitle: '共鳴基地的官方部落格',
  lang: 'zh_TW',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
  themeColor: {
    hue: 250,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'assets/images/banner.jpg',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'center',      // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: false,         // Display the credit text of the banner image
      text: '',              // Credit text to be displayed
      url: ''                // (Optional) URL link to the original artwork or artist's page
    }
  },
  favicon: [    // Leave this array empty to use the default favicon
    {
      src: '/favicon/dev-icon.png',    // icon 的路徑，相對於 /public 目錄
      theme: 'light',              // (可選) 'light' 或 'dark'，如果您有不同主題的 icon，請設置此項
      sizes: '32x32',              // (可選) icon 的尺寸，如果您有不同尺寸的 icon，請設置此項
    },
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'wwuid主要教程',
      url: '/posts/guide/',
      external: false,
    },
    {
      name: 'Discord社群',
      url: 'https://discord.gg/wawuuid',     // Internal links should not include the base path, as it is automatically added
      external: true,                               // Show an external link icon and will open in a new tab
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/demo-avatar.png',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: '芙檁',
  bio: 'Discord機器人開發者',
  links: [
    {
      name: 'Discord',
      icon: 'fa6-brands:discord',
      url: 'https://discord.gg/wawuuid',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/YashajinAlice',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}

export const sponsorConfig: SponsorConfig = {
  enable: true,
  title: '贊助支持',
  description: '如果這個部落格對您有幫助，歡迎贊助支持！',
  links: [
    {
      name: 'PayPal 贊助',
      url: 'https://www.paypal.com/ncp/payment/PF79NLJFNYG4N',
      icon: 'fa6-brands:paypal',
      color: 'text-blue-600'
    },
    {
      name: '請我喝咖啡',
      url: 'https://ko-fi.com/fulin66002',
      icon: 'material-symbols:coffee-outline',
      color: 'text-orange-500'
    },
    {
      name: 'GitHub Sponsors',
      url: 'https://github.com/sponsors/YashajinAlice',
      icon: 'material-symbols:favorite-outline',
      color: 'text-pink-500'
    }
  ]
}

export const mouseAnimationConfig: MouseAnimationConfig = {
  enable: true,
  cursor: {
    enable: true,
    size: 20,
    trail: true,
    hoverEffect: true,
    clickEffect: true
  },
  particles: {
    enable: true,
    density: 0.7,
    colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'],
    size: {
      min: 1,
      max: 4
    }
  }
}
