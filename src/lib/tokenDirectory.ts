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
  riskScorePreview?: number;
}

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
    badge: 'HIGH VOL',
    riskScorePreview: 0
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
    badge: 'TRENDING',
    riskScorePreview: 0
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
    badge: 'TRENDING',
    riskScorePreview: 0
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
    badge: 'HIGH VOL',
    riskScorePreview: 0
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
    badge: 'HIGH VOL',
    riskScorePreview: 0
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
    badge: 'TOKEN-2022',
    riskScorePreview: 20 // 2.69% transfer fee
  },
  {
    name: 'PayPal USD',
    symbol: 'PYUSD',
    mint: '2b1kV6eusvdHamBQrhbuqvQqWmYeh89MmmiBpYNNPump',
    price: '$1.00',
    change24h: '0.0%',
    isPositive: true,
    volume24h: '$42.8M',
    standard: 'Token-2022',
    badge: 'TOKEN-2022',
    riskScorePreview: 35 // Has freeze authority
  }
];

export const NEW_RADAR_MINTS: TrackedToken[] = [
  {
    name: 'Solana AI Agent',
    symbol: 'SOLEX',
    mint: 'HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98888',
    price: '$0.00042',
    change24h: '+140.2%',
    isPositive: true,
    volume24h: '$340.5K',
    standard: 'Token-2022',
    badge: 'NEW MINT',
    riskScorePreview: 85
  },
  {
    name: 'CyberGuard Token',
    symbol: 'GUARD',
    mint: 'Guard111111111111111111111111111111111111111',
    price: '$0.12',
    change24h: '+5.4%',
    isPositive: true,
    volume24h: '$89.0K',
    standard: 'SPL-Token',
    badge: 'NEW MINT',
    riskScorePreview: 0
  }
];
