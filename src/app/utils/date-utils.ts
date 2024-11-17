import { groupBy } from "../dashboard/interfaces";

export const getFormattedDate = (inputDate?: Date): string => {
  if (typeof inputDate === 'string') return inputDate;

  const date = inputDate ?? new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

export const getDayOrHourFromDate = (date: string, groupBy: groupBy): string => {
  if (groupBy === 'day') {
    return date.split(' ')[0];
  }

  const hourSplited = date.split(' ')[1].split(':');
  return `${hourSplited[0]}:${hourSplited[1]}`;
}
