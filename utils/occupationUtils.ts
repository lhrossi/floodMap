import type { Abrigo, Vaga } from "~/models/Abrigo"
import { OccupationType, type Occupation, type RawOccupation } from "~/models/Occupation"

class OccupationUtils {
  constructor(
    private readonly abrigo?: Abrigo | null
  ) {
    this.occupations = this.setOccupations();
  }

  occupations: Occupation[];

  get abrigoStatusColor() {
    const percentage = this.getGeneralOccupationPercentage();

    return OccupationUtils.getOccupationColorByOccupationPercentage(percentage);
  }

  get abrigoMarkerColor() {
    switch (this.abrigoOccupationType) {
      case OccupationType.Both:
        return '#FF1183';
      case OccupationType.Pet:
        return '#9747FF';
      case OccupationType.Person:
      default:
        return '#4759FF';
    }
  }

  get abrigoOccupationType() {
    if (this.occupations.length > 1) return OccupationType.Both;

    return this.occupations[0]?.type || OccupationType.Person;
  }

  private getGeneralOccupationPercentage() {
    const { totalSlots, occupiedSlots } = this.occupations.reduce((total, occupation) => ({
      totalSlots: total.totalSlots + occupation.totalSlots,
      occupiedSlots: total.occupiedSlots + occupation.occupiedSlots
    }), { totalSlots: 0, occupiedSlots: 0 });

    return this.getOccupationPercentage(totalSlots, occupiedSlots);
  }

  private setOccupations() {
    if (!this.abrigo) return [];

    return [{
      type: OccupationType.Person,
      icon: 'carbon:user-filled',
      label: 'Pessoas',
      totalSlots: this.abrigo.vagas,
      occupiedSlots: this.abrigo.vagas_ocupadas,
    }, {
      type: OccupationType.Pet,
      icon: 'material-symbols:pets',
      label: 'Animais',
      totalSlots: this.abrigo.vagas_pet,
      occupiedSlots: this.abrigo.vagas_pet_ocupadas,
    }]
      .map(this.formatOccupationData.bind(this))
      .filter(({ totalSlots }) => totalSlots > 0);
  }

  private formatOccupationData(occupation: RawOccupation): Occupation {
    const totalSlots = this.formatSlotsToNumber(occupation.totalSlots);
    const occupiedSlots = this.formatSlotsToNumber(occupation.occupiedSlots);
    const occupiedPercentage = this.getOccupationPercentage(totalSlots, occupiedSlots);
    const availableSlots = this.getAvailableSlots(totalSlots, occupiedSlots);
    const colors = OccupationUtils.getOccupationColorByOccupationPercentage(occupiedPercentage);

    return {
      ...occupation,
      totalSlots,
      occupiedSlots,
      occupiedPercentage,
      availableSlots,
      colors
    }
  }

  private formatSlotsToNumber(vagas?: Vaga) {
    return typeof vagas === 'number' ? vagas : (parseInt(vagas || '0') || 0)
  }

  private getOccupationPercentage(totalSlots: number, occupiedSlots: number) {
    if (isNaN(occupiedSlots) || isNaN(totalSlots) || totalSlots === 0) return '100';

    const percentage = (occupiedSlots / totalSlots) * 100;
    return percentage > 0 ? Math.min(percentage, 100).toFixed(0) : '0';
  }

  private getAvailableSlots(totalSlots: number, occupiedSlots: number) {
    return Math.max(totalSlots - occupiedSlots, 0);
  }

  static getOccupationColorByOccupationPercentage(occupiedPercentage: string) {
    const percentage = parseFloat(occupiedPercentage);

    if (percentage < 50) {
      return {
        background: '#E3FBEA',
        text: '#02952B',
        marker: '#02952B',
      }
    }

    if (percentage < 75) {
      return {
        background: '#FFF5EC',
        text: '#E37000',
        marker: '#E37000',
      }
    }

    return {
      background: '#FDDDE0',
      text: '#E61226',
      marker: '#E61226',
    }
  }
}

export default OccupationUtils;
