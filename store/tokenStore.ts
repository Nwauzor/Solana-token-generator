import { create } from 'zustand'
import { Token, TokenFormData, WalletInfo } from '@/types'

interface TokenStore {
  tokens: Token[]
  loading: boolean
  error: string | null
  walletInfo: WalletInfo | null
  
  // Actions
  fetchTokens: () => Promise<void>
  createToken: (tokenData: TokenFormData) => Promise<void>
  fetchWalletInfo: () => Promise<void>
  clearError: () => void
}

// Mock data for development
const mockTokens: Token[] = [
  {
    id: '1',
    name: 'My First Token',
    symbol: 'MFT',
    decimals: 9,
    totalSupply: 1000000000,
    mintAddress: '0xabc123...',
    creator: '0x1234...5678',
    description: 'My first token created on Solana',
    website: 'https://myfirsttoken.com',
    isVerified: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Community Token',
    symbol: 'COMM',
    decimals: 6,
    totalSupply: 1000000,
    mintAddress: '0xdef456...',
    creator: '0x8765...4321',
    description: 'Token for our community',
    isVerified: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
  },
]

export const useTokenStore = create<TokenStore>((set, get) => ({
  tokens: [],
  loading: false,
  error: null,
  walletInfo: null,

  fetchTokens: async () => {
    set({ loading: true, error: null })
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      set({ tokens: mockTokens, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch tokens', loading: false })
    }
  },

  createToken: async (tokenData: TokenFormData) => {
    set({ loading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newToken: Token = {
        id: Date.now().toString(),
        name: tokenData.name,
        symbol: tokenData.symbol,
        decimals: tokenData.decimals,
        totalSupply: tokenData.totalSupply,
        mintAddress: `0x${Math.random().toString(16).slice(2, 8)}...`,
        creator: '0x1234...5678', // Mock creator address
        description: tokenData.description,
        website: tokenData.website,
        logo: tokenData.logo,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      set(state => ({ 
        tokens: [newToken, ...state.tokens], 
        loading: false 
      }))
    } catch (error) {
      set({ error: 'Failed to create token', loading: false })
    }
  },

  fetchWalletInfo: async () => {
    set({ loading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockWalletInfo: WalletInfo = {
        publicKey: '0x1234...5678',
        balance: 2.5,
        tokens: [
          {
            mint: '0xabc123...',
            amount: 1000000000,
            decimals: 9,
            symbol: 'MFT',
            name: 'My First Token',
          },
          {
            mint: '0xdef456...',
            amount: 500000,
            decimals: 6,
            symbol: 'COMM',
            name: 'Community Token',
          },
        ],
      }
      
      set({ walletInfo: mockWalletInfo, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch wallet info', loading: false })
    }
  },

  clearError: () => {
    set({ error: null })
  },
})) 