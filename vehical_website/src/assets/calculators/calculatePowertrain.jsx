// calculatePowertrain.js
export const calculatePowertrain = (operand) => {
    const {
        width,
        height,
        length,
        dragCoeff,
        accTime,
        slope,
        batt,
        gearRatio,
        maxSpeed,
        gvw,
        wheelDia,
        rollCoeff,
        airDen
    } = operand;

    const frontal = ((parseFloat(width) * parseFloat(height)) / 1000000).toFixed(3);
    const finalSpeed = ((parseFloat(maxSpeed) * 1000) / 3600).toFixed(3);
    const acceleration = (finalSpeed / parseFloat(accTime)).toFixed(3);
    const rollRest = (gvw * 9.81 * rollCoeff * Math.cos((Math.PI * parseFloat(slope)) / 180)).toFixed(3);
    const accForce = (gvw * acceleration).toFixed(3);
    const areoDrag = (0.5 * airDen * dragCoeff * frontal * Math.pow(finalSpeed, 2)).toFixed(3);
    const gradeResist = (gvw * 9.81 * Math.sin((Math.PI * parseFloat(slope)) / 180)).toFixed(3);
    const totTracEff = (parseFloat(rollRest) + parseFloat(accForce) + parseFloat(areoDrag) + parseFloat(gradeResist)).toFixed(3);
    const crusingTracEff = (parseFloat(rollRest) + parseFloat(areoDrag)).toFixed(3);
    const wheelTorque = (((parseFloat(totTracEff) / 2) * parseFloat(wheelDia)) / 2000).toFixed(3);
    const wheelRpm = ((finalSpeed * 60) / (Math.PI * parseFloat(wheelDia) / 1000)).toFixed(3);
    const wheelPower = ((parseFloat(wheelRpm) * parseFloat(wheelTorque)) / 9550).toFixed(3);
    const crusWheelPow = ((parseFloat(wheelPower) * parseFloat(crusingTracEff)) / parseFloat(totTracEff)).toFixed(3);
    const crusTorq = (((parseFloat(crusingTracEff) / 2) * (parseFloat(wheelDia) / 2000)) / parseFloat(gearRatio)).toFixed(3);
    const motorTorque = (parseFloat(wheelTorque) / parseFloat(gearRatio)).toFixed(3);
    const tracForce = (((parseFloat(motorTorque) * parseFloat(gearRatio) * 85 * 1000) / (parseFloat(wheelDia) / 2 * 100))).toFixed(3);
    const motorSpeed = (parseFloat(wheelRpm) * parseFloat(gearRatio)).toFixed(3);
    const motorPower = ((parseFloat(motorTorque) * parseFloat(motorSpeed)) / 9550 / 0.98).toFixed(3);
    const totRange = (0.6 * (parseFloat(batt) / (parseFloat(crusWheelPow) * 2)) * parseFloat(maxSpeed)).toFixed(3);
    const theoreticalConsump = ((parseFloat(batt) * 1000) / parseFloat(totRange)).toFixed(3);

    return {
        acceleration,
        rollRest,
        accForce,
        areoDrag,
        gradeResist,
        totTracEff,
        crusingTracEff,
        wheelTorque,
        wheelRpm,
        wheelPower,
        crusWheelPow,
        crusTorq,
        motorTorque,
        tracForce,
        motorSpeed,
        motorPower,
        totRange,
        theoreticalConsump,
        frontal,
    };
};
