import { DateTime } from 'luxon';

export const defaultDateTime = DateTime.fromMillis(0);

export const formatTime = (date?: DateTime): string => date?.toFormat('h:mm a')?.toLowerCase() || '';

export const formatFullDateTime = (date: DateTime): string => {
  const datePart = date.toFormat('MMM d, yyyy');
  const timePart = formatTime(date);
  return `${datePart} at ${timePart}`;
};

export const combineDateAndTime = (date: DateTime, time: DateTime): DateTime => date.set({
  hour: time.hour,
  minute: time.minute,
  second: time.second,
  millisecond: time.millisecond,
});
