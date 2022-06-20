import BigNumber from 'bignumber.js'

export default class MathHelper {

  static addCommasToNumber(rawNumber) {
      return Number(rawNumber).toLocaleString();
  }

  static convertToPercentage(rawNumber) {
      return rawNumber.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "%";
  }

  static rawAmountToFormatted(amount,decimals)
  {
    return (amount * Math.pow(10,-1 * decimals)).toFixed(decimals);
  }

  static formattedAmountToRaw(amountFormatted,decimals)
  {
    console.log(new BigNumber( 10 ))


    var multiplier = new BigNumber( 10 ).exponentiatedBy( decimals ) ;


    return multiplier.multipliedBy(amountFormatted).toFixed() ;
  }



}
