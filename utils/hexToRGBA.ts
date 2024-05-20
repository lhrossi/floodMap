export function hexToRGBA(hex: string, opacity: number = 1) {
  const value = hex.replace('#', '');

  const r = Number.parseInt(value.substring(0, 2), 16);
  const g = Number.parseInt(value.substring(2, 4), 16);
  const b = Number.parseInt(value.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
};
