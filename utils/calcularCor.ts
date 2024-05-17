export default function calcularCor(vagas: any, vagasOcupadas: any) {
  if (isNaN(vagas) || isNaN(vagasOcupadas) || vagas <= 0) {
    return "#E61226";
  }
  const percentual = (vagasOcupadas * 100) / vagas;

  if (percentual < 0) {
    return "#02952B";
  }
  if (percentual < 50) return "#02952B";
  if (percentual < 75) return "#E37000";
  return "#E61226";
}
