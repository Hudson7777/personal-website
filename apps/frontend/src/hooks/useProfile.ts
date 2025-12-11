import { useState, useEffect } from 'react'
import { Profile, mockProfile, Interest, mockInterests } from '@/data/mockProfile'

export interface UseProfileReturn {
  profile: Profile | null
  interests: Interest[]
  isLoading: boolean
  error: string | null
}

export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [interests, setInterests] = useState<Interest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300))

        setProfile(mockProfile)
        setInterests(mockInterests)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return { profile, interests, isLoading, error }
}
