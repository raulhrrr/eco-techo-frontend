import { groupBy } from "../dashboard/interfaces";

export function getFormattedDate(inputDate?: Date): string {
  const date = inputDate ?? new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

export function getDayOrHourFromDate(date: string, groupBy: groupBy): string {
  if (groupBy === 'day') {
    return date.split('T')[0];
  }

  const hourSplited = date.split('T')[1].split(':');
  return `${hourSplited[0]}:${hourSplited[1]}`;
}
