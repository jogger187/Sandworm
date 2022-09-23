import React, { FC } from 'react'
import { Button } from '@mui/material'

import { Container, GamePanel } from './styles'

const Playground: FC = () => {
  return (
    <Container>
      <GamePanel>
        <Button variant='text'>Text</Button>
      </GamePanel>
    </Container>
  )
}

export default Playground
