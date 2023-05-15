export const salaryData = new Array(20).fill(null).map((_, index) => {
  const value = String((index + 1) * 10000);
  return { label: value, value };
});
