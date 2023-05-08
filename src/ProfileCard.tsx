import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaUser } from 'react-icons/fa'

const Card = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const Avatar = styled(FaUser)`
  font-size: 48px;
  color: #555;
`

const Name = styled.h2`
  font-size: 24px;
  margin: 10px 0;
`

const Description = styled.p`
  font-size: 16px;
  color: #777;
  text-align: center;
`

interface ProfileCardProps {
  id: string
}

interface UserData {
  name: string
  description: string
}

const API_URL: string = process.env.REACT_APP_API_URL || 'http://localhost:8000'

const ProfileCard: React.FC<ProfileCardProps> = ({ id }) => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/user?id=${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const data = await response.json()
        setUserData(data)
      } catch (error: any) {
        console.error('Error fetching user data:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!userData) {
    return <div>No user data found</div>
  }

  return (
    <Card>
      <Avatar />
      <Name>{userData.name}</Name>
      <Description>{userData.description}</Description>
    </Card>
  )
}

export default ProfileCard
