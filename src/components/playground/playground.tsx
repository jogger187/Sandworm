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

  const [pointsAddress, setPointsAddress] = useState(0)
  const [score, setScore] = useState(0)

  const bodyLinkList = useRef()

  const [userArrow, setUserArrow] = useState<ArrowType>(ArrowType.ArrowRight)
  const preUserArrow = useRef<ArrowType>(ArrowType.ArrowRight)

  const [blockStatus, setBlockStatus] = useState<BlockProp[]>([])

  const handleGeneratePoint = () => {
    let tempAddress = generateRandom()

    // add condition for new point address
    while (pointsAddress === tempAddress) {
      tempAddress = generateRandom()
    }
    setPointsAddress(tempAddress)
  }

  function generateRandom(min = 0, max = 899) {
    // find diff
    const difference = max - min

    // generate random number
    let rand = Math.random()

    // multiply with difference
    rand = Math.floor(rand * difference)

    // add with min value
    rand = rand + min

    return rand
  }

  const handleGO = () => {
    preHeadX.current = headX
    preHeadY.current = headY
    setHeadX((prevState) => prevState + 1)
  }

  const changeGameStatus = () => {
    setGameStatus(!gameStatus)
  }

  const handleRestart = () => {
    iniStatus()
    setHeadX(15)
    setHeadY(-15)
  }

  const handleMoving = () => {
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

    const { id, x, y } = blockStatusArray[pointsAddress]
    blockStatusArray[pointsAddress] = {
      status: 1,
      id: id,
      x: x,
      y: y,
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
        if (preUserArrow.current === ArrowType.ArrowUp) {
          // error arrow
        } else {
          preUserArrow.current = ArrowType.ArrowDown
          setUserArrow(ArrowType.ArrowDown)
        }
        break
      case ArrowType.ArrowUp:
        if (preUserArrow.current === ArrowType.ArrowDown) {
          // error arrow
        } else {
          preUserArrow.current = ArrowType.ArrowUp
          setUserArrow(ArrowType.ArrowUp)
        }
        break
      case ArrowType.ArrowLeft:
        if (preUserArrow.current === ArrowType.ArrowRight) {
          // error arrow
        } else {
          preUserArrow.current = ArrowType.ArrowLeft
          setUserArrow(ArrowType.ArrowLeft)
        }

        break
      case ArrowType.ArrowRight:
        if (preUserArrow.current === ArrowType.ArrowLeft) {
          // error arrow
        } else {
          preUserArrow.current = ArrowType.ArrowRight
          setUserArrow(ArrowType.ArrowRight)
        }
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
    // Generate a point address
    handleGeneratePoint()
  }, [])

  useEffect(() => {
    if (headX > 29 || headX < 0 || headY > 0 || headY < -29) {
      alert('Game Over !!!')
    } else if (getIndexByXY(headX, headY) === pointsAddress) {
      handleGeneratePoint()
      setScore((prevState) => prevState + 1)
    } else if (gameStatus !== undefined) {
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
            handleRestart()
          }}
        >
          重新開始
        </Button>
      </UserPanel>
    </Container>
  )
}

export default Playground
