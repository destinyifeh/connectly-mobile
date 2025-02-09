import moment from 'moment';

export const getUserCurrentAge = (dateString: string) => {
  const dob = moment(dateString, 'MM-DD-YYYY');
  return moment().diff(dob, 'years');
};
