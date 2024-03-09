function sumMaterials(array) {
    
    const sum = array.reduce((prevMaterial, material) => {
        return prevMaterial + material.sum;
    }, 0);
    return sum;

}

module.exports = sumMaterials;