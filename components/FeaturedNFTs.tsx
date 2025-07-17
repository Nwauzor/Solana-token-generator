'use client'

import { useNFTStore } from '@/store/nftStore'
import { NFTCard } from './NFTCard'
import { motion } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const FeaturedNFTs = () => {
  const { nfts } = useNFTStore()
  
  // Get featured NFTs (top 4 by likes)
  const featuredNFTs = nfts
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4)

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-3xl font-bold text-white">Featured NFTs</h2>
          </div>
          <Link 
            href="/featured"
            className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-200"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredNFTs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NFTCard nft={nft} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Featured NFTs</h3>
            <p className="text-dark-300">Check back soon for featured collections!</p>
          </div>
        )}
      </div>
    </section>
  )
} 