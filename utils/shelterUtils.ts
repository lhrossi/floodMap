import type { Abrigo } from '~/models/Abrigo';
import { citiesWithCentralizedDonations } from '~/config/citiesWithCentralizedDonations';

function getShelterUtils(shelter: Abrigo) {
  const dayjs = useDayjs();

  const sanitizePhone = (phone: string) => String(phone)?.replace(/\D/g, '');

  const getFormattedLastUpdated = () =>
    dayjs(shelter?.update_in?._seconds * 1000).format('DD/MM/YY - HH:mm');

  const getNeedsList = () => {
    if (!shelter?.itensUteis) return [];
    return shelter.itensUteis.filter((eachItem) => eachItem.item);
  };

  const getIsManagedByGovern = () =>
    shelter?.abrigopm && shelter.pmpa === shelter.city;

  const getIsCityCentralizedDonations = () =>
    citiesWithCentralizedDonations.includes(shelter?.city ?? '');

  const linkToWhatsapp = () => {
    if (!shelter?.telefone) return;
    window.open(
      `https://api.whatsapp.com/send?phone=${sanitizePhone(shelter.telefone)}`,
    );
  };

  const callToPhone = () => {
    if (!shelter?.telefone) return;
    window.open(`tel:${sanitizePhone(shelter.telefone)}`);
  };

  const linkToMaps = () => {
    if (!shelter?.latitude || !shelter?.longitude) return;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${shelter?.latitude},${shelter?.longitude}`,
    );
  };

  return {
    linkToWhatsapp,
    callToPhone,
    linkToMaps,
    sanitizePhone,
    getFormattedLastUpdated,
    getNeedsList,
    getIsManagedByGovern,
    getIsCityCentralizedDonations,
  };
}

export { getShelterUtils };
