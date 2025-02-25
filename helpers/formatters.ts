import moment from 'moment';

export const getUserCurrentAge = (dateString: string) => {
  const dob = moment(dateString, 'DD-MM-YYYY');
  return moment().diff(dob, 'years');
};

export const formatTodaysDate = () => {
  const todaysDate = moment(Date.now()).format('DD-MM-YYYY');
  console.log(todaysDate, 'todayyyy');
  return todaysDate;
};

export const formatToDynamicTime = (date: string) => {
  const formatTime = moment(date).calendar(null, {
    sameDay: 'HH:mm a', // Today, display only time, e.g., "19:20"
    lastDay: '[Yesterday]', // Yesterday, display "Yesterday"
    lastWeek: 'DD/MM/YYYY', // For dates in the last week (or older), display as "10/02/2025"
    sameElse: 'DD/MM/YYYY', // For any other date, also display as "DD/MM/YYYY"
  });
  return formatTime;
};
