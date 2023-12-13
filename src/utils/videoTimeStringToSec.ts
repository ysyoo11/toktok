export function videoTimeStringToSec(time: string) {
  const minuteNum = +time.split(':')[0];
  const secondNum = +time.split(':')[1];

  return minuteNum * 60 + secondNum;
}
