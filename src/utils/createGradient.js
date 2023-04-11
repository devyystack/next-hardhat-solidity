// ----------------------------------------------------------------------

export function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

export function createCustomGradient(
  degree,
  color1,
  colorOnePercentage,
  color2,
  colorTwoPercentage
) {
  return `linear-gradient(${degree}, ${color1} ${colorOnePercentage}, ${color2} ${colorTwoPercentage})`;
}
