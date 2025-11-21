export function getMirroredColors(colorArray, numSinks) {
  const mid = Math.floor(numSinks / 2);
  const colors = [];

  for (let i = 0; i < numSinks; i++) {
    let idx = i;
    if (i >= mid) {
      idx = numSinks - 1 - i;
    }

    idx = Math.min(idx, colorArray.length - 1);
    colors.push(colorArray[idx]);
  }

  return colors;
}
