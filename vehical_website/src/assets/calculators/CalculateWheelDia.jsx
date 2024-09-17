
export const calculateWheelDiameter = (a, b, c) => {
   
    const operandA = parseFloat(a);
    const operandB = parseFloat(b);
    const operandC = parseFloat(c);

    if (isNaN(operandA) || isNaN(operandB) || isNaN(operandC)) {
        return 'Invalid inputs';
    }


    const wheelDiameter = (2 * (operandB * operandA) / 100) + 25.4 * operandC;

    return {
        wheelDiameter: wheelDiameter.toFixed(3),
    };
};
