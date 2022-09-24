import React, { FC, useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'

import { getIndexByXY } from '../../utility'
import Block from '../block/block'

import { Container, GamePanel, UserPanel } from './styles'
import { BlockProp } from './types'

enum ArrowType {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
}

const Playground: FC = () => {
  const [headX, setHeadX] = useState(15)
  const [headY, setHeadY] = useState(-15)
  const preHeadX = useRef(15)
  const preHeadY = useRef(-15)
  const [gameStatus, setGameStatus] = useState<boolean | undefined>(undefined)

  const [userArrow, setUserArrow] = useState<ArrowType>(ArrowType.ArrowRight)

  const [blockStatus, setBlockStatus] = useState<BlockProp[]>([])

  const handleGeneratePoint = () => {
    const blockStatusArray = [...blockStatus]
    const { status, id, x, y } = blockStatusArray[0]
    blockStatusArray[0] = {
      status: 1,
      id: id,
      x: x,
      y: y,
    }
    setBlockStatus(blockStatusArray)
  }

  const handleGO = () => {
    preHeadX.current = headX
    preHeadY.current = headY
    setHeadX((prevState) => prevState + 1)
  }

  const changeGameStatus = () => {
    setGameStatus(!gameStatus)
  }

  const handleMoving = () => {
    const blockStatusArray: BlockProp[] = Object.assign([], blockStatus)
    // const { status, id, x, y } = blockStatusArray[getIndexByXY(headX, headY)]

    blockStatusArray[getIndexByXY(preHeadX.current, preHeadY.current)] = {
      status: 0,
      id: `(${preHeadX.current},${preHeadY.current})`,
      x: preHeadX.current,
      y: preHeadY.current,
    }

    blockStatusArray[getIndexByXY(headX, headY)] = {
      status: 3,
      id: `(${headX},${headY})`,
      x: headX,
      y: headY,
    }
    setBlockStatus(blockStatusArray)
  }

  function iniStatus() {
    const blockStatusArray: BlockProp[] = []
    for (let j = 0; j > -30; j--) {
      for (let k = 0; k < 30; k++) {
        blockStatusArray.push({
          status: 0,
          id: `(${j},${k})`,
          x: j,
          y: k,
        })
      }
    }
    setBlockStatus(blockStatusArray)
  }

  function getArrowNow(arrow: string) {
    switch (arrow) {
      case ArrowType.ArrowDown:
        setUserArrow(ArrowType.ArrowDown)
        break
      case ArrowType.ArrowUp:
        setUserArrow(ArrowType.ArrowUp)
        break
      case ArrowType.ArrowLeft:
        setUserArrow(ArrowType.ArrowLeft)
        break
      case ArrowType.ArrowRight:
        setUserArrow(ArrowType.ArrowRight)
        break
    }
  }

  function moveForwardByArrowType(arrow: ArrowType) {
    switch (arrow) {
      case ArrowType.ArrowDown:
        console.log('>> ArrowDown')
        setHeadY((prevState) => prevState - 1)
        break
      case ArrowType.ArrowUp:
        console.log('>> ArrowUp')
        setHeadY((prevState) => prevState + 1)
        break
      case ArrowType.ArrowLeft:
        console.log('>> ArrowLeft')
        setHeadX((prevState) => prevState - 1)
        break
      case ArrowType.ArrowRight:
        console.log('>> ArrowRight')
        setHeadX((prevState) => prevState + 1)
        break
    }
  }

  useEffect(() => {
    if (gameStatus !== undefined) {
      handleMoving()
    }
  }, [headX, headY])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(`gameStatus = ${gameStatus} `)
      if (gameStatus === true) {
        moveForwardByArrowType(userArrow)
      }
    }, 200)

    if (gameStatus !== true) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [gameStatus, userArrow])

  return (
    <Container
      onKeyDown={(e) => {
        getArrowNow(e.code)
      }}
    >
      <GamePanel>
        {blockStatus.map((item) => {
          return <Block key={item.id} blocktype={item.status}></Block>
        })}
      </GamePanel>
      <UserPanel>
        <Button
          variant='text'
          onClick={() => {
            handleGO()
          }}
        >
          Moving
        </Button>
        <Button
          variant='text'
          onClick={() => {
            iniStatus()
            changeGameStatus()
          }}
        >
          {gameStatus === true ? '暫停' : '開始'}
        </Button>
        <Button
          variant='text'
          onClick={() => {
            iniStatus()
          }}
        >
          重新開始
        </Button>
      </UserPanel>
    </Container>
  )
}

export default Playground
