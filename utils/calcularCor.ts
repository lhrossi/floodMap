export default function calcularCor(vagas: any, vagasOcupadas: any) {
  if (isNaN(vagas) || isNaN(vagasOcupadas) || vagas <= 0) {
    return "lightgrey";
  }
  const percentual = (vagasOcupadas * 100) / vagas;
  if (percentual <= 50) {
    // Calcula a cor entre verde e amarelo
    var r = Math.floor(255 * (percentual / 50));
    var g = 255;
    var b = 0;
  } else {
    // Calcula a cor entre amarelo e vermelho
    var r = 255;
    var g = Math.floor(255 * ((100 - percentual) / 50));
    var b = 0;
  }
  return `rgb(${r}, ${g}, ${b})`;
}
