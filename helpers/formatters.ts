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
