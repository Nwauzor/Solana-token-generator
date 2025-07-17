import { create } from 'zustand'
import { NFT, FilterOptions } from '@/types'

interface NFTStore {
  nfts: NFT[]
  loading: boolean
  error: string | null
  filters: FilterOptions
  selectedNFT: NFT | null
  
  // Actions
  fetchNFTs: () => Promise<void>
  fetchNFT: (id: string) => Promise<void>
  createNFT: (nftData: Partial<NFT>) => Promise<void>
  updateNFT: (id: string, updates: Partial<NFT>) => Promise<void>
  deleteNFT: (id: string) => Promise<void>
  setFilters: (filters: FilterOptions) => void
  setSelectedNFT: (nft: NFT | null) => void
  clearError: () => void
}

// Mock data for development
const mockNFTs: NFT[] = [
  {
    id: '1',
    name: 'Cosmic Dreamer #001',
    description: 'A mesmerizing digital artwork featuring cosmic elements and dreamlike landscapes.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    price: 2.5,
    currency: 'SOL',
    creator: '0x1234...5678',
    owner: '0x8765...4321',
    category: 'art',
    collection: 'Cosmic Dreams',
    attributes: [
      { trait_type: 'Background', value: 'Nebula', rarity: 15 },
      { trait_type: 'Character', value: 'Dreamer', rarity: 25 },
      { trait_type: 'Accessory', value: 'Crystal Crown', rarity: 5 },
    ],
    mintAddress: '0xabc123...',
    tokenAddress: '0xdef456...',
    isListed: true,
    likes: 156,
    views: 1247,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Pixel Warrior #042',
    description: 'A retro-style pixel art warrior ready for battle in the digital realm.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    price: 1.8,
    currency: 'SOL',
    creator: '0x2345...6789',
    owner: '0x9876...5432',
    category: 'gaming',
    collection: 'Pixel Warriors',
    attributes: [
      { trait_type: 'Weapon', value: 'Laser Sword', rarity: 20 },
      { trait_type: 'Armor', value: 'Cyber Plate', rarity: 30 },
      { trait_type: 'Helmet', value: 'Neon Visor', rarity: 10 },
    ],
    mintAddress: '0xghi789...',
    tokenAddress: '0xjkl012...',
    isListed: true,
    likes: 89,
    views: 567,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    name: 'Melodic Harmony #007',
    description: 'An abstract representation of musical harmony through vibrant colors and flowing shapes.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    price: 3.2,
    currency: 'SOL',
    creator: '0x3456...7890',
    owner: '0x0987...6543',
    category: 'music',
    collection: 'Melodic Vibes',
    attributes: [
      { trait_type: 'Genre', value: 'Ambient', rarity: 40 },
      { trait_type: 'Mood', value: 'Peaceful', rarity: 25 },
      { trait_type: 'Instrument', value: 'Digital Synth', rarity: 15 },
    ],
    mintAddress: '0xmno345...',
    tokenAddress: '0xpqr678...',
    isListed: true,
    likes: 234,
    views: 1890,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '4',
    name: 'Rare Crypto Kitty #1337',
    description: 'A legendary crypto kitty with unique genetic traits and rare accessories.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
    price: 5.0,
    currency: 'SOL',
    creator: '0x4567...8901',
    owner: '0x2109...8765',
    category: 'collectibles',
    collection: 'Crypto Kitties',
    attributes: [
      { trait_type: 'Fur', value: 'Golden', rarity: 2 },
      { trait_type: 'Eyes', value: 'Diamond', rarity: 1 },
      { trait_type: 'Accessory', value: 'Crown', rarity: 0.5 },
    ],
    mintAddress: '0xstu901...',
    tokenAddress: '0xvwx234...',
    isListed: true,
    likes: 567,
    views: 3456,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '5',
    name: 'Championship Trophy #2024',
    description: 'A digital trophy commemorating the 2024 championship victory.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop',
    price: 4.5,
    currency: 'SOL',
    creator: '0x5678...9012',
    owner: '0x4321...0987',
    category: 'sports',
    collection: 'Sports Memorabilia',
    attributes: [
      { trait_type: 'Sport', value: 'Football', rarity: 35 },
      { trait_type: 'Year', value: '2024', rarity: 100 },
      { trait_type: 'Edition', value: 'Championship', rarity: 5 },
    ],
    mintAddress: '0xyzab567...',
    tokenAddress: '0xcdef890...',
    isListed: true,
    likes: 123,
    views: 789,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '6',
    name: 'Neon Cityscape #025',
    description: 'A futuristic cityscape bathed in neon lights and cyberpunk aesthetics.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop',
    price: 2.8,
    currency: 'SOL',
    creator: '0x6789...0123',
    owner: '0x6543...2109',
    category: 'art',
    collection: 'Cyberpunk Dreams',
    attributes: [
      { trait_type: 'Time', value: 'Night', rarity: 60 },
      { trait_type: 'Weather', value: 'Rain', rarity: 30 },
      { trait_type: 'Mood', value: 'Mysterious', rarity: 20 },
    ],
    mintAddress: '0xghij234...',
    tokenAddress: '0xklmn567...',
    isListed: true,
    likes: 198,
    views: 1456,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
  },
]

export const useNFTStore = create<NFTStore>((set, get) => ({
  nfts: [],
  loading: false,
  error: null,
  filters: {},
  selectedNFT: null,

  fetchNFTs: async () => {
    set({ loading: true, error: null })
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      set({ nfts: mockNFTs, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch NFTs', loading: false })
    }
  },

  fetchNFT: async (id: string) => {
    set({ loading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const nft = mockNFTs.find(n => n.id === id)
      if (nft) {
        set({ selectedNFT: nft, loading: false })
      } else {
        set({ error: 'NFT not found', loading: false })
      }
    } catch (error) {
      set({ error: 'Failed to fetch NFT', loading: false })
    }
  },

  createNFT: async (nftData: Partial<NFT>) => {
    set({ loading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newNFT: NFT = {
        id: Date.now().toString(),
        name: nftData.name || 'Untitled NFT',
        description: nftData.description || '',
        image: nftData.image || '',
        price: nftData.price || 0,
        currency: nftData.currency || 'SOL',
        creator: nftData.creator || '',
        owner: nftData.owner || '',
        category: nftData.category || 'art',
        collection: nftData.collection,
        attributes: nftData.attributes || [],
        mintAddress: nftData.mintAddress || '',
        tokenAddress: nftData.tokenAddress || '',
        isListed: nftData.isListed || false,
        likes: 0,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      set(state => ({ 
        nfts: [newNFT, ...state.nfts], 
        loading: false 
      }))
    } catch (error) {
      set({ error: 'Failed to create NFT', loading: false })
    }
  },

  updateNFT: async (id: string, updates: Partial<NFT>) => {
    set({ loading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      set(state => ({
        nfts: state.nfts.map(nft => 
          nft.id === id 
            ? { ...nft, ...updates, updatedAt: new Date() }
            : nft
        ),
        selectedNFT: state.selectedNFT?.id === id 
          ? { ...state.selectedNFT, ...updates, updatedAt: new Date() }
          : state.selectedNFT,
        loading: false
      }))
    } catch (error) {
      set({ error: 'Failed to update NFT', loading: false })
    }
  },

  deleteNFT: async (id: string) => {
    set({ loading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      set(state => ({
        nfts: state.nfts.filter(nft => nft.id !== id),
        selectedNFT: state.selectedNFT?.id === id ? null : state.selectedNFT,
        loading: false
      }))
    } catch (error) {
      set({ error: 'Failed to delete NFT', loading: false })
    }
  },

  setFilters: (filters: FilterOptions) => {
    set({ filters })
  },

  setSelectedNFT: (nft: NFT | null) => {
    set({ selectedNFT: nft })
  },

  clearError: () => {
    set({ error: null })
  },
})) 