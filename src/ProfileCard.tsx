import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Tilt from 'react-parallax-tilt'
import './App.scss'

const API_URL = process.env.REACT_APP_API_URL

const Card = styled.div`
  width: 25rem;
  height: 35rem;
  position: relative;
  box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.1), 0px 30px 60px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
`

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 1px solid #fff;
`

const UserName = styled.h1`
  font-size: 1.5rem;
  text-transform: uppercase;
  color: #fff;
  margin-top: 1rem;
`

const UserBio = styled.p`
  width: calc(100% - 6rem);
  font-size: 1rem;
  color: #fff;
  text-align: center;
  border-radius: 5px;
`

const UserEmail = styled.h2`
  font-size: 1rem;
  color: #fff;
  margin-top: 1rem;
  font-weight: 300;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
`

interface UserData {
  name: string
  email: string
  bio: string
  avatar: string
}

interface ProfileCardProps {
  id: number
}

const ProfileCard: React.FC<ProfileCardProps> = ({ id }) => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <Card style={{ color: 'white' }}>Loading...</Card>
  if (error)
    return <Card style={{ color: 'white' }}>Unable to load user data</Card>

  if (!userData) return null

  return (
    <Tilt
      tiltAngleXInitial={0}
      tiltReverse={true}
      glareEnable={true}
      glareMaxOpacity={0.7}
      glareColor="rgba(255,255,255,0.4)"
      glarePosition="all"
      scale={1.1}
      transitionSpeed={5000}
      glareBorderRadius="10px"
      perspective={1000}
    >
      <Card>
        {userData.avatar && (
          <ProfileImage src={userData.avatar} alt={userData.name} />
        )}
        <UserName>{userData.name}</UserName>
        <Divider />
        <UserBio>{userData.bio}</UserBio>
        <UserEmail>{userData.email}</UserEmail>
      </Card>
    </Tilt>
  )
}

export default ProfileCard
