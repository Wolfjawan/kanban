export const toLowerCaseIfAlpha = value => {
  return typeof value === 'string' ? value.toLowerCase() : value
}
export const pancakeSort = (propertyName, ascending) => {
  return (a, b) => {
    if (
      toLowerCaseIfAlpha(a[propertyName]) < toLowerCaseIfAlpha(b[propertyName])
    ) {
      return ascending ? -1 : 0
    }
    return ascending ? 0 : -1
  }
}

const randFromTo = (min, max) => {
  return Math.random() * (max - min) + min
}
export const creatNewPos = (arry, index) => {
  let newPos
  const PItem = arry[index - 1]
  const NItem = arry[index + 1]
  if (!PItem) {
    newPos = randFromTo(NItem.pos / 2, NItem.pos)
  } else if (!NItem) {
    newPos = randFromTo(PItem.pos, PItem.pos * 2)
  } else if (PItem && NItem) {
    newPos = randFromTo(PItem.pos, NItem.pos)
  }
  return newPos
}

export const creatNewVolunteerPos = (arry, index, targetId) => {
  let newPos
  const targetItem = arry.find(item => item._id === targetId)
  const hoveredItem = arry[index]
  if (!hoveredItem) {
    return null
  } else if (!targetItem) {
    newPos = randFromTo(hoveredItem.pos / 2, hoveredItem.pos)
  } else if (hoveredItem.pos > targetItem.pos) {
    const NItem = arry[index + 1]
    if (NItem) {
      newPos = randFromTo(hoveredItem.pos, NItem.pos)
    } else {
      newPos = randFromTo(hoveredItem.pos, hoveredItem.pos * 2)
    }
  } else if (hoveredItem.pos < targetItem.pos) {
    const PItem = arry[index - 1]
    if (PItem) {
      newPos = randFromTo(PItem.pos, hoveredItem.pos)
    } else {
      newPos = randFromTo(hoveredItem.pos / 2, hoveredItem.pos)
    }
  } else if (hoveredItem.pos === targetItem.pos) {
    newPos = targetItem.pos
  }
  return newPos
}
