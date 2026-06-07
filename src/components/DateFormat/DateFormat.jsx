// utils/DateFormatUTC.js

const monthsKa = [
  'იანვარი',
  'თებერვალი',
  'მარტი',
  'აპრილი',
  'მაისი',
  'ივნისი',
  'ივლისი',
  'აგვისტო',
  'სექტემბერი',
  'ოქტომბერი',
  'ნოემბერი',
  'დეკემბერი',
];

export default function DateFormat(dateInput) {
  if (!dateInput) {
    return {
      getDate: () => '',
      getMonth: () => '',
    };
  }

  const str = dateInput.toString().slice(0, 10);
  const parts = str.split('-');
  if (parts.length < 3) {
    return { getDate: () => '', getMonth: () => '' };
  }

  const day   = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10) - 1; // 0–11

  return {
    getDate:  () => day,
    getMonth: () => monthsKa[month],
  };
}
