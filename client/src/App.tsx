import React from 'react'
import ProfileCard from './ProfileCard'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const App: React.FC = () => {
  return (
    <Container>
      <ProfileCard id={1} />
    </Container>
  )
}

export default App
