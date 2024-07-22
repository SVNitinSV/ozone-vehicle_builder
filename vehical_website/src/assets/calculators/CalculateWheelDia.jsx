// calculateWheelDiameter.js
export const calculateWheelDiameter = (a, b, c) => {
    // Ensure inputs are converted to numbers
    const operandA = parseFloat(a);
    const operandB = parseFloat(b);
    const operandC = parseFloat(c);

    // Check if inputs are valid numbers
    if (isNaN(operandA) || isNaN(operandB) || isNaN(operandC)) {
        return 'Invalid inputs'; // Return an error message if any input is invalid
    }

    // Calculate the wheel diameter using the formula
    const wheelDiameter = (2 * (operandB * operandA) / 100) + 25.4 * operandC;

    return {
        wheelDiameter: wheelDiameter.toFixed(3), // Return the diameter rounded to 3 decimal places
    };
};
