
export default function calcularCor(vagas: any, vagasOcupadas: any) {
  if (isNaN(vagas) || isNaN(vagasOcupadas) || vagas <= 0) {
    return "#02952B";
  }
  
  const percentual = (vagasOcupadas * 100) / vagas;

  if (percentual < 0) {
    return "#02952B";
  }

  if (percentual <= 25) return '#02952B'
  
  if (percentual <= 50) return '#114DE6'

  if (percentual <= 75) return '#E67711'

  return '#E61127'
}
