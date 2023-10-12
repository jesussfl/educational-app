const positions = [0, -80, 0, 80];

export const calculateLeftPosition = (index) => {
  const positionIndex = index % positions.length;
  let leftPosition = positions[positionIndex];

  if (Math.floor(index / positions.length) % 2 === 1) {
    leftPosition = -leftPosition;
  }

  return leftPosition;
};
