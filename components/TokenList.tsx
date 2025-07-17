'use client'

import { useEffect } from 'react'
import { useTokenStore } from '@/store/tokenStore'
import { 
  Coins, 
  Copy, 
  ExternalLink, 
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react'
import toast from 'react-hot-toast'

export const TokenList = () => {
  const { tokens, loading, fetchTokens } = useTokenStore()

  useEffect(() => {
    fetchTokens()
  }, [fetchTokens])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-dark-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="bg-dark-700 h-4 rounded w-1/4"></div>
                <div className="bg-dark-700 h-3 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tokens.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Coins className="w-8 h-8 text-dark-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Tokens Created</h3>
        <p className="text-dark-300 mb-4">Create your first token to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">My Tokens</h2>
        <div className="text-sm text-dark-300">
          {tokens.length} token{tokens.length !== 1 ? 's' : ''}
        </div>
      </div>

      {tokens.map((token) => (
        <div key={token.id} className="card hover:border-primary-500 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Token Icon */}
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>

              {/* Token Info */}
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-white">{token.name}</h3>
                  {token.isVerified && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <p className="text-sm text-dark-300">
                  Symbol: <span className="text-white font-mono">{token.symbol}</span>
                </p>
                <p className="text-xs text-dark-400">
                  Created: {token.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Token Details */}
            <div className="text-right">
              <div className="text-sm text-dark-300">
                Supply: <span className="text-white font-mono">{formatNumber(token.totalSupply)}</span>
              </div>
              <div className="text-sm text-dark-300">
                Decimals: <span className="text-white">{token.decimals}</span>
              </div>
            </div>
          </div>

          {/* Token Description */}
          {token.description && (
            <div className="mt-4 p-3 bg-dark-700 rounded-lg">
              <p className="text-sm text-dark-300">{token.description}</p>
            </div>
          )}

          {/* Token Actions */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-dark-400">Mint Address:</span>
              <span className="text-xs text-white font-mono">{formatAddress(token.mintAddress)}</span>
              <button
                onClick={() => copyToClipboard(token.mintAddress)}
                className="p-1 hover:bg-dark-700 rounded transition-colors duration-200"
              >
                <Copy className="w-3 h-3 text-dark-400" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {token.website && (
                <a
                  href={token.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-dark-700 rounded transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 text-primary-400" />
                </a>
              )}
              <button className="p-2 hover:bg-dark-700 rounded transition-colors duration-200">
                <Eye className="w-4 h-4 text-dark-400" />
              </button>
            </div>
          </div>

          {/* Token Status */}
          <div className="mt-3 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-dark-400" />
              <span className="text-dark-400">
                Last updated: {token.updatedAt.toLocaleDateString()}
              </span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs ${
              token.isVerified 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {token.isVerified ? 'Verified' : 'Pending'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 