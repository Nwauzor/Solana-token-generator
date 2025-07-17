import { PublicKey } from '@solana/web3.js';

export interface Token {
  id: string
  name: string
  symbol: string
  decimals: number
  totalSupply: number
  mintAddress: string
  creator: string
  description?: string
  website?: string
  logo?: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TokenFormData {
  name: string
  symbol: string
  decimals: number
  totalSupply: number
  description?: string
  website?: string
  logo?: string
}

export interface WalletInfo {
  publicKey: string
  balance: number
  tokens: TokenBalance[]
}

export interface TokenBalance {
  mint: string
  amount: number
  decimals: number
  symbol?: string
  name?: string
}

export interface Transaction {
  id: string
  type: 'create' | 'mint' | 'transfer' | 'burn'
  tokenId: string
  from: string
  to?: string
  amount?: number
  status: 'pending' | 'confirmed' | 'failed'
  signature: string
  timestamp: Date
}

export interface MarketplaceStats {
  totalNFTs: number
  totalCollections: number
  totalUsers: number
  totalVolume: number
  floorPrice: number
  activeListings: number
  activeAuctions: number
}

export interface FilterOptions {
  category?: string
  priceRange?: [number, number]
  status?: 'all' | 'listed' | 'auction'
  sortBy?: 'price' | 'date' | 'likes' | 'views'
  sortOrder?: 'asc' | 'desc'
} 