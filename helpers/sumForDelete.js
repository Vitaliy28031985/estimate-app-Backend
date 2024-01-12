function sumDataForDelete(array) {
        const sum = array.reduce((prevPosition, position) => {
            return prevPosition + position.result;
        }, 0);

        return sum;
   
}

module.exports = sumDataForDelete;