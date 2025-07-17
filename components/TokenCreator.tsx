'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useTokenStore } from '@/store/tokenStore'
import { TokenFormData } from '@/types'
import { 
  Coins, 
  Hash, 
  Globe, 
  FileText,
  Upload,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

export const TokenCreator = () => {
  const { publicKey } = useWallet()
  const { createToken, loading, error } = useTokenStore()
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    decimals: 9,
    totalSupply: 1000000000,
    description: '',
    website: '',
    logo: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'decimals' || name === 'totalSupply' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!publicKey) {
      toast.error('Please connect your wallet first')
      return
    }

    if (!formData.name || !formData.symbol) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      await createToken(formData)
      toast.success('Token created successfully!')
      setFormData({
        name: '',
        symbol: '',
        decimals: 9,
        totalSupply: 1000000000,
        description: '',
        website: '',
        logo: '',
      })
    } catch (error) {
      toast.error('Failed to create token')
    }
  }

  if (!publicKey) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Wallet Not Connected</h3>
        <p className="text-dark-300 mb-4">Please connect your wallet to create tokens</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Create New Token</h2>
        <p className="text-dark-300">Create your own SPL token on Solana blockchain</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Token Name */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Token Name *
          </label>
          <div className="relative">
            <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., My Awesome Token"
              className="input-field pl-10"
              required
            />
          </div>
        </div>

        {/* Token Symbol */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Token Symbol *
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              placeholder="e.g., MAT"
              className="input-field pl-10"
              maxLength={10}
              required
            />
          </div>
        </div>

        {/* Decimals and Total Supply */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Decimals
            </label>
            <input
              type="number"
              name="decimals"
              value={formData.decimals}
              onChange={handleInputChange}
              min="0"
              max="9"
              className="input-field"
            />
            <p className="text-xs text-dark-400 mt-1">Usually 9 for most tokens</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Total Supply
            </label>
            <input
              type="number"
              name="totalSupply"
              value={formData.totalSupply}
              onChange={handleInputChange}
              min="1"
              className="input-field"
            />
            <p className="text-xs text-dark-400 mt-1">Total tokens to be created</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Description
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-dark-400 w-5 h-5" />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your token..."
              rows={3}
              className="input-field pl-10 resize-none"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Website URL
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com"
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Token Logo
          </label>
          <div className="relative">
            <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              className="input-field pl-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-700"
            />
          </div>
        </div>

        {/* Cost Info */}
        <div className="bg-dark-700 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-dark-300">Estimated Cost:</span>
            <span className="text-white font-semibold">~0.01 SOL</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-dark-300">Network:</span>
            <span className="text-primary-400">Solana Devnet</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Token...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Create Token</span>
            </>
          )}
        </button>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </form>
    </div>
  )
} 