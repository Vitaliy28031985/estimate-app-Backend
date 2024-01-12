

function sumEstimate(array) {
    
        const sum = array.estimates.reduce((prevPosition, position) => {
            return prevPosition + position.total;
        }, 0);
        return sum;
    
}

module.exports = sumEstimate;