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

  const date = new Date(dateInput);

  if (isNaN(date)) {
    return {
      getDate: () => '',
      getMonth: () => '',
    };
  }

  // UTC-ს ვიღებთ
  let day = date.getUTCDate();
  const month = date.getUTCMonth(); // 0–11

  // შენი პირობა: 10-ის ქვემოთ +1
  if (day < 10) day += 1;

  return {
    getDate: () => day,
    getMonth: () => monthsKa[month],
  };
}
