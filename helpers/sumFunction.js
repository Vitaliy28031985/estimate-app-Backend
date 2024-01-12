function sumData(array) {
    for (let i = 0; i < array.length; i++) {
        const sum = array[i].positions.reduce((prevPosition, position) => {
            return prevPosition + position.result;
        }, 0);
        return sum;
    }
}

module.exports = sumData;