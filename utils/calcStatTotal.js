export default function calcStatTotal(data, stat) {
  const total = data.reduce((acc, current) => acc + current[stat], 0);
  return total.toLocaleString();
}
