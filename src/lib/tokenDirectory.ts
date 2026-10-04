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
    name: 'PayPal USD',
    symbol: 'PYUSD',
    mint: '2b1kV6eusvdHamBQrhbuqvQqWmYeh89MmmiBpYNNPump',
    price: '$1.00',
    change24h: '0.0%',
    isPositive: true,
    volume24h: '$42.8M',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  },
  {
    name: 'Catwifhat 2022',
    symbol: 'CWIF',
    mint: '7atGFDpHJLt7sZwsauuzmgrF2GUqhQMAFiNRNKZvPump',
    price: '$0.00000045',
    change24h: '+7.8%',
    isPositive: true,
    volume24h: '$3.4M',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  },
  {
    name: 'Guacamole 22',
    symbol: 'GUAC22',
    mint: 'AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR',
    price: '$0.000012',
    change24h: '+2.1%',
    isPositive: true,
    volume24h: '$410K',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  },
  {
    name: 'Bark Community',
    symbol: 'BARK',
    mint: 'Bark221111111111111111111111111111111111111',
    price: '$0.00084',
    change24h: '+18.4%',
    isPositive: true,
    volume24h: '$250K',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  },
  {
    name: 'Jito Staked SOL 22',
    symbol: 'JITOSOL',
    mint: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn',
    price: '$178.50',
    change24h: '+3.9%',
    isPositive: true,
    volume24h: '$19.2M',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  },
  {
    name: 'Wen Cat',
    symbol: 'WEN',
    mint: 'WENWENvqqNya429ubCdXr81ZmD69brwQaaBYY6p3LCU',
    price: '$0.000082',
    change24h: '-3.2%',
    isPositive: false,
    volume24h: '$4.5M',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  }
];

export const TOP_TRADED_TOKENS: TrackedToken[] = [
  {
    name: 'Wrapped SOL',
    symbol: 'SOL',
    mint: 'So11111111111111111111111111111111111111112',
    price: '$148.20',
    change24h: '+4.5%',
    isPositive: true,
    volume24h: '$2.1B',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
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
    name: 'Tether USD',
    symbol: 'USDT',
    mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    price: '$1.00',
    change24h: '0.0%',
    isPositive: true,
    volume24h: '$640.8M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
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
  },
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
    badge: 'HIGH VOL'
  },
  {
    name: 'Render Token',
    symbol: 'RENDER',
    mint: 'rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof',
    price: '$5.62',
    change24h: '+6.1%',
    isPositive: true,
    volume24h: '$48.1M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'Drift Protocol',
    symbol: 'DRIFT',
    mint: 'DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7',
    price: '$1.15',
    change24h: '+9.3%',
    isPositive: true,
    volume24h: '$22.4M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'Kamino Finance',
    symbol: 'KMNO',
    mint: 'KMNo3nJsBXfcpJTVhZnvBGRUseWvMojuGTV2BGjnvtz',
    price: '$0.14',
    change24h: '+4.2%',
    isPositive: true,
    volume24h: '$15.8M',
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
    badge: 'TRENDING'
  },
  {
    name: 'BOOK OF MEME',
    symbol: 'BOME',
    mint: 'ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82',
    price: '$0.0094',
    change24h: '-2.1%',
    isPositive: false,
    volume24h: '$95.0M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  },
  {
    name: 'Ponke',
    symbol: 'PONKE',
    mint: '5z3EqYQo9HiCEs3R84RCDMu2n7anpdmxRhdKqP87pump',
    price: '$0.44',
    change24h: '+11.2%',
    isPositive: true,
    volume24h: '$28.3M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  },
  {
    name: 'Billy Dog',
    symbol: 'BILLY',
    mint: '3B5wuUrMEiZTfWMByGdWTUmTxN3SENdWmTwJW9tFpump',
    price: '$0.034',
    change24h: '+24.5%',
    isPositive: true,
    volume24h: '$18.2M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  },
  {
    name: 'Mumu the Bull',
    symbol: 'MUMU',
    mint: '5LafQUrVQUquickNkJLdE8Z7TknwGup9mY57Zg21pump',
    price: '$0.000056',
    change24h: '+15.1%',
    isPositive: true,
    volume24h: '$12.0M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  },
  {
    name: 'Slerf',
    symbol: 'SLERF',
    mint: '7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3',
    price: '$0.16',
    change24h: '-4.8%',
    isPositive: false,
    volume24h: '$31.4M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  }
];
