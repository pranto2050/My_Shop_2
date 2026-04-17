import { storeInfo } from '../../data/stor info';

export const getCleanNumber = (num) => {
  if (!num) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.split('').map(char => {
    const index = bengaliDigits.indexOf(char);
    return index !== -1 ? index : char;
  }).join('').replace(/\s+/g, '');
};

export const getWhatsAppUrl = (num, text = '') => {
  const clean = getCleanNumber(num).replace('+', '');
  return `https://wa.me/${clean}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};

export const getTelUrl = (num) => {
  return `tel:${getCleanNumber(num)}`;
};
