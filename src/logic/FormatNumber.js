const formatLargeNumbers = (number) => {
  let numberFormated = number
  if (number > 1000000) {
    numberFormated = `${(number / 1000000).toFixed(1)}M`
  } else if (number > 1000) {
    numberFormated = `${(number / 1000).toFixed(1)}k`
  }
  return numberFormated
}

export default formatLargeNumbers
