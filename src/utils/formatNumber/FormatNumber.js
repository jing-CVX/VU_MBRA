const FormatNumber = (value, fractionSize = 0, code, empty = 1, key, translateFunc) => {
    if (!value || value === '0' || value === ' ' || isNaN(Number(value)) || value === Infinity) {
        if (key === 'dash') return '---';
        return empty === 1 ? '0' : '0'.padEnd(fractionSize +2, '0');
    }

    const DECIMAL_SEPARATOR = ',';
    const THOUSANDS_SEPARATOR = '.';
    const precision = 10 ** fractionSize;
    const valueRound = Math.round(Number(value) * precision) / precision;
    
    let [integer, fraction = ''] = valueRound.toString().split('.');
    
    // Đảm bảo độ dài của phần thập phân
    if (fractionSize > 0) {
        // Lấy đúng số chữ số thập phân mà bạn muốn
        fraction = (fraction || '').substring(0, fractionSize);
        if (fraction.length > 0) {
            fraction = DECIMAL_SEPARATOR + fraction;
        } else {
            fraction = '';
        }
    } else {
        fraction = '';
    }
    
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR);

    if (key === 'input_plcord') {
        return (integer + fraction).endsWith(DECIMAL_SEPARATOR + '00') ? '' : integer + fraction;
    }

    if (key === 'short') {
        if (Math.abs(value) < 999) return value.toString();
        let newValue = value, unit = '';
        
        if (Math.abs(value) >= 10 ** 3) {
            newValue = value / 10 ** 3;
            unit = translateFunc ? translateFunc('unit_thousand') : ' K';
        }
        if (Math.abs(value) > 10 ** 6) {
            newValue = value / 10 ** 6;
            unit = translateFunc ? translateFunc('unit_millions') : ' M';
        }
        if (Math.abs(value) > 10 ** 9) {
            newValue = value / 10 ** 9;
            unit = translateFunc ? translateFunc('unit_billions') : ' B';
        }

        let [integerS, fractionS = ''] = newValue.toString().split('.');
        fractionS = (fractionS || '').substring(0, 2); // Chỉ lấy 2 chữ số thập phân cho 'short'
        fractionS = DECIMAL_SEPARATOR + fractionS;
        integerS = integerS.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR);
        return integerS + fractionS + unit;
    }

    return integer + fraction;
};

FormatNumber.defaultProps = {
    fractionSize: 0,
    empty: 1,
};

export default FormatNumber;