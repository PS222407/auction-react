export default class MoneyTransformer {
    /**
     * Converts string (can include , or . as separator) to an integer in cents format
     * @param {string} price price in string (9,25 = 925, 9 = 900, 9.5 = 950)
     * @return {number}
     */
    moneyDB(price) {
        let newFormat;
        if (/[.,]/.test(price)) {
            if (price.split(/[.,]/)[1].length === 1) {
                newFormat = parseInt(price.replace(/[.,]/g, ''), 10) * 10;
            } else {
                newFormat = parseInt(price.replace(/[.,]/g, ''), 10);
            }
        } else {
            newFormat = parseInt(price, 10) * 100;
        }

        return newFormat;
    }
}