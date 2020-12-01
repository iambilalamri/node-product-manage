const calculTotalTip = (total, tipPercent) => {
  const tip = total * tipPercent;
  return total + tip;
};

module.exports = calculTotalTip;
