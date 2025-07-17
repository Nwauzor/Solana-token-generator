'use client'

import { NFT } from '@/types'
import { NFTCard } from './NFTCard'
import { motion } from 'framer-motion'

interface NFTGridProps {
  nfts: NFT[]
  loading?: boolean
}

export const NFTGrid = ({ nfts, loading = false }: NFTGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="bg-dark-700 rounded-lg h-64 mb-4"></div>
            <div className="space-y-2">
              <div className="bg-dark-700 h-4 rounded w-3/4"></div>
              <div className="bg-dark-700 h-4 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎨</div>
        <h3 className="text-xl font-semibold text-white mb-2">No NFTs Found</h3>
        <p className="text-dark-300">Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {nfts.map((nft, index) => (
        <motion.div
          key={nft.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <NFTCard nft={nft} />
        </motion.div>
      ))}
    </div>
  )
} 