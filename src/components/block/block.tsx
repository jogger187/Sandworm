import React, { FC } from 'react'

import { Normal, Point, SandwormBody } from './styles'
enum BlockType {
  normal = 0,
  point = 1,
  head = 2,
  body = 3,
}

type props = {
  blocktype: BlockType
}

const Block: FC<props> = ({ blocktype = BlockType.normal }) => {
  function checkBlockType(type: BlockType) {
    switch (type) {
      case BlockType.normal:
        return <Normal></Normal>
        break
      case BlockType.body:
        return <SandwormBody></SandwormBody>
        break
      case BlockType.point:
        return <Point></Point>
        break
      case BlockType.head:
        return <SandwormBody></SandwormBody>
        break
      default:
        return <Normal></Normal>
        break
    }
  }

  return <>{checkBlockType(blocktype)}</>
}

export default Block
