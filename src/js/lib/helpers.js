export const formatDate = date => {
    //date must be a string
    const inputDate = new Date(date);
    let dd = inputDate.getDate();
    let mm = inputDate.getMonth() + 1; //January is 0!
    let yyyy = inputDate.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return `${dd}-${mm}-${yyyy}`;
};

export const formatNamedDate = date => {
    const monthNames = [
        `Januari`,
        `Februari`,
        `Maart`,
        `April`,
        `Mei`,
        `Juni`,
        `July`,
        `Augustus`,
        `September`,
        `Oktober`,
        `November`,
        `December`
    ];

    //date must be a string
    const inputDate = new Date(date);
    const dd = inputDate.getDate();
    const mm = inputDate.getMonth() + 1; //January is 0!

    return `${dd} ${monthNames[mm]}`;
};

export const formatDateReversed = date => {
    //date must be a string
    const inputDate = new Date(date);
    let dd = inputDate.getDate();
    let mm = inputDate.getMonth() + 1; //January is 0!
    let yyyy = inputDate.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return `${yyyy}-${mm}-${dd}`;
};

export const isValidDate = date => {
    const matches = /^[0-9]{4}(-|\/)[0-3]{1}[0-9]{1}(-|\/)[0-3]{1}[0-9]{1} [0-9]{2}:[0-9]{2}:[0-9]{2}$/.exec(date);
    if (matches === null) return false;
    else return true;
};

export const parserData = data => {
    if (data === 0) {
        return data;
    } else {
        let dec = ``;
        if (data % 1 === 0) {
            dec = `.00`;
        }
        let num = data.toLocaleString();
        num = `${num}${dec}`;
        const array = num.split(/[,]/);
        let result = `${array[0]}`;
        for (let i = 1; i < array.length; i++) {
            result = `${result}.${array[i]}`;
        }
        const arr = result.split(/[.]/);
        const decimal = arr.pop().slice(0, -1);
        result = arr.join(`.`);
        result = `${result},${decimal.length === 1 ? `${decimal}0` : decimal}`;

        return result;
    }
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
