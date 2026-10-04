export interface TrackedToken {
  name: string;
  symbol: string;
  mint: string;
  price: string;
  change24h: string;
  isPositive: boolean;
  volume24h: string;
  standard: 'SPL-Token' | 'Token-2022';
  badge: 'TRENDING' | 'NEW MINT' | 'HIGH VOL' | 'TOKEN-2022' | 'EXPLOIT VECTOR';
  isExploitVector?: boolean;
  exploitType?: 'PREDATORY_FEE' | 'TRANSFER_HOOK_TRAP' | 'PERMANENT_DELEGATE_DRAIN';
}

// Live Exploit Vector Test Mints (Honeypot, 99% Tax, Transfer Hook Trap)
export const EXPLOIT_VECTORS_RADAR: TrackedToken[] = [
  {
    name: '99% Tax Extortion',
    symbol: 'TAX99',
    mint: 'Tax9999999999999999999999999999999999999999',
    price: '.0004',
    change24h: '+840.5%',
    isPositive: true,
    volume24h: '.4M',
    standard: 'Token-2022',
    badge: 'EXPLOIT VECTOR',
    isExploitVector: true,
    exploitType: 'PREDATORY_FEE'
  },
  {
    name: 'Blacklist Hook Honeypot',
    symbol: 'HOOKTRAP',
    mint: 'HookTrap111111111111111111111111111111111111',
    price: '.82',
    change24h: '+120.0%',
    isPositive: true,
    volume24h: '',
    standard: 'Token-2022',
    badge: 'EXPLOIT VECTOR',
    isExploitVector: true,
    exploitType: 'TRANSFER_HOOK_TRAP'
  },
  {
    name: 'Perm Delegate Drainer',
    symbol: 'DRAIN',
    mint: 'DrainMe1111111111111111111111111111111111111',
    price: '.000001',
    change24h: '-99.9%',
    isPositive: false,
    volume24h: '.1M',
    standard: 'Token-2022',
    badge: 'EXPLOIT VECTOR',
    isExploitVector: true,
    exploitType: 'PERMANENT_DELEGATE_DRAIN'
  }
];

// 100% Verified Real Existing Mainnet Mints
export const TOKEN_2022_RADAR: TrackedToken[] = [
  {
    name: 'BonkEarn',
    symbol: 'BERN',
    mint: 'CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo',
    price: '.0031',
    change24h: '+14.2%',
    isPositive: true,
    volume24h: '.2M',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  },
  {
    name: 'Jito Staked SOL',
    symbol: 'JITOSOL',
    mint: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn',
    price: '.50',
    change24h: '+3.9%',
    isPositive: true,
    volume24h: '.2M',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  },
  {
    name: 'Guacamole Token',
    symbol: 'GUAC',
    mint: 'AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR',
    price: '.000012',
    change24h: '+2.1%',
    isPositive: true,
    volume24h: '',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  },
  {
    name: 'BlazeStake Staked SOL',
    symbol: 'bSOL',
    mint: 'bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1',
    price: '.10',
    change24h: '+4.1%',
    isPositive: true,
    volume24h: '.4M',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  },
  {
    name: 'Marinade Staked SOL',
    symbol: 'mSOL',
    mint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    price: '.20',
    change24h: '+4.2%',
    isPositive: true,
    volume24h: '.1M',
    standard: 'Token-2022',
    badge: 'TOKEN-2022'
  }
];

export const TOP_TRADED_TOKENS: TrackedToken[] = [
  {
    name: 'Wrapped SOL',
    symbol: 'SOL',
    mint: 'So11111111111111111111111111111111111111112',
    price: '.20',
    change24h: '+4.5%',
    isPositive: true,
    volume24h: '.1B',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    price: '.00',
    change24h: '0.0%',
    isPositive: true,
    volume24h: '.1M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'Tether USD',
    symbol: 'USDT',
    mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    price: '.00',
    change24h: '0.0%',
    isPositive: true,
    volume24h: '.8M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'Jupiter',
    symbol: 'JUP',
    mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    price: '.88',
    change24h: '-1.4%',
    isPositive: false,
    volume24h: '.2M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'Raydium',
    symbol: 'RAY',
    mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    price: '.45',
    change24h: '+12.7%',
    isPositive: true,
    volume24h: '.3M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'Bonk',
    symbol: 'BONK',
    mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    price: '.0000214',
    change24h: '+8.4%',
    isPositive: true,
    volume24h: '.5M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'dogwifhat',
    symbol: 'WIF',
    mint: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
    price: '.34',
    change24h: '+3.1%',
    isPositive: true,
    volume24h: '.8M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'Render Token',
    symbol: 'RENDER',
    mint: 'rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof',
    price: '.62',
    change24h: '+6.1%',
    isPositive: true,
    volume24h: '.1M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'Drift Protocol',
    symbol: 'DRIFT',
    mint: 'DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7',
    price: '.15',
    change24h: '+9.3%',
    isPositive: true,
    volume24h: '.4M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  },
  {
    name: 'Pyth Network',
    symbol: 'PYTH',
    mint: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
    price: '.38',
    change24h: '+5.7%',
    isPositive: true,
    volume24h: '.2M',
    standard: 'SPL-Token',
    badge: 'HIGH VOL'
  }
];

export const NEW_RADAR_MINTS: TrackedToken[] = [
  {
    name: 'Popcat',
    symbol: 'POPCAT',
    mint: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr',
    price: '.42',
    change24h: '+18.9%',
    isPositive: true,
    volume24h: '.2M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  },
  {
    name: 'Cat in a dogs world',
    symbol: 'MEW',
    mint: 'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5',
    price: '.0089',
    change24h: '+9.4%',
    isPositive: true,
    volume24h: '.4M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  },
  {
    name: 'BOOK OF MEME',
    symbol: 'BOME',
    mint: 'ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82',
    price: '.0094',
    change24h: '-2.1%',
    isPositive: false,
    volume24h: '.0M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  },
  {
    name: 'Samoyedcoin',
    symbol: 'SAMO',
    mint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    price: '.0098',
    change24h: '+6.4%',
    isPositive: true,
    volume24h: '.2M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  },
  {
    name: 'Slerf',
    symbol: 'SLERF',
    mint: '7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3',
    price: '.16',
    change24h: '-4.8%',
    isPositive: false,
    volume24h: '.4M',
    standard: 'SPL-Token',
    badge: 'TRENDING'
  }
];