export default function macFormat(data: string): boolean {
  if (!data) {
    return true;
  }

  return /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(data);
}
