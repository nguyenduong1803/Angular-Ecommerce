export type AppTheme = 'light' | 'dark' | 'auto';

export interface AppSettings {
  navPos: 'side' | 'top';
  dir: 'ltr' | 'rtl';
  theme: AppTheme;
  showHeader: boolean;
  headerPos: 'fixed' | 'static' | 'above';
  showUserPanel: boolean;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  language: string;
}

export const defaults: AppSettings = {
  navPos: 'side',
  dir: 'ltr',
  theme: 'auto',
  showHeader: true,
  headerPos: 'fixed',
  showUserPanel: true,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'en-US',
};


export const BILL_STATUS = {
  0: 'Pending',
  1: 'Shipping',
  2: 'Paid',
  3: 'Cancelled',
} as const;


export const billColor = {
  0: {
    label: 'Pending',
    backgroundColor: '#FFEB3B', // Vàng sáng
    textColor: '#000000' // Đen
  },
  1: {
    label: 'Shipping',
    backgroundColor: '#2196F3', // Xanh dương sáng
    textColor: '#FFFFFF' // Trắng
  },
  2: {
    label: 'Paid',
    backgroundColor: '#4CAF50', // Xanh lá cây
    textColor: '#FFFFFF' // Trắng
  },

  3: {
    label: 'Cancelled',
    backgroundColor: '#9E9E9E', // Xám
    textColor: '#FFFFFF' // Trắng
  },

} as const;
