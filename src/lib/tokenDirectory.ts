export interface TrackedToken {
  name: string;
  symbol: string;
  mint: string;
  price: string;
  change24h: string;
  isPositive: boolean;
  volume24h: string;
  standard: 'SPL-Token' | 'Token-2022';
  badge: 'TRENDING' | 'NEW MINT' | 'HIGH VOL' | 'TOKEN-2022';
}

// 100% Verified Real Mainnet Mints
export const TOP_TRADED_TOKENS: TrackedToken[] = [
  {
    name: 'Bonk',
    symbol: 'BONK',
    mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    price: '$0.0000214',
    change24h: '+8.4%',
    isPositive: true,
    volume24h: '$124.5M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'dogwifhat',
    symbol: 'WIF',
    mint: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
    price: '$2.34',
    change24h: '+3.1%',
    isPositive: true,
    volume24h: '$210.8M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  },
  {
    name: 'Jupiter',
    symbol: 'JUP',
    mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    price: '$0.88',
    change24h: '-1.4%',
    isPositive: false,
    volume24h: '$84.2M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    price: '$1.00',
    change24h: '0.0%',
    isPositive: true,
    volume24h: '$980.1M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'Raydium',
    symbol: 'RAY',
    mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    price: '$3.45',
    change24h: '+12.7%',
    isPositive: true,
    volume24h: '$65.3M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  }
];

export const TOKEN_2022_RADAR: TrackedToken[] = [
  {
    name: 'BonkEarn',
    symbol: 'BERN',
    mint: 'CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo',
    price: '$0.0031',
    change24h: '+14.2%',
    isPositive: true,
    volume24h: '$1.2M',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  },
  {
    name: 'Wrapped SOL',
    symbol: 'WSOL',
    mint: 'So11111111111111111111111111111111111111112',
    price: '$148.20',
    change24h: '+4.5%',
    isPositive: true,
    volume24h: '$2.1B',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  }
];

export const NEW_RADAR_MINTS: TrackedToken[] = [
  {
    name: 'Popcat',
    symbol: 'POPCAT',
    mint: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr',
    price: '$1.42',
    change24h: '+18.9%',
    isPositive: true,
    volume24h: '$150.2M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  },
  {
    name: 'Cat in a dogs world',
    symbol: 'MEW',
    mint: 'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5',
    price: '$0.0089',
    change24h: '+9.4%',
    isPositive: true,
    volume24h: '$80.4M',
    standard: 'SPL-Token',
    badge: 'NEW MINT'
  }
];
