'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NFT } from '@/types'
import { 
  Heart, 
  Eye, 
  ShoppingCart,
  Clock,
  Tag
} from 'lucide-react'
import { motion } from 'framer-motion'

interface NFTCardProps {
  nft: NFT
}

export const NFTCard = ({ nft }: NFTCardProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const formatPrice = (price: number, currency: string) => {
    return `${price} ${currency}`
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <motion.div
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/nft/${nft.id}`}>
        <div className="card overflow-hidden cursor-pointer">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
            <Image
              src={nft.image}
              alt={nft.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full backdrop-blur-md transition-colors duration-200 ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              
              <button className="p-2 rounded-full backdrop-blur-md bg-white/20 text-white hover:bg-white/30 transition-colors duration-200">
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Price Badge */}
            {nft.isListed && (
              <div className="absolute bottom-3 left-3">
                <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Tag className="w-3 h-3" />
                  <span>{formatPrice(nft.price, nft.currency)}</span>
                </div>
              </div>
            )}

            {/* Auction Badge */}
            {nft.isAuction && (
              <div className="absolute bottom-3 right-3">
                <div className="bg-secondary-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Auction</span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-3">
            {/* Title and Collection */}
            <div>
              <h3 className="font-semibold text-white mb-1 line-clamp-1">
                {nft.name}
              </h3>
              {nft.collection && (
                <p className="text-sm text-primary-400 font-medium">
                  {nft.collection}
                </p>
              )}
            </div>

            {/* Creator */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark-300">Creator</span>
              <span className="text-white font-mono">
                {formatAddress(nft.creator)}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-dark-300">
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{nft.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{nft.views}</span>
              </div>
            </div>

            {/* Buy Button */}
            {nft.isListed && (
              <motion.button
                className="w-full btn-primary flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Buy Now</span>
              </motion.button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 