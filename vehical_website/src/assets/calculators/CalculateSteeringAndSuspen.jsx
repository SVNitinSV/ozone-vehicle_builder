// calculatePowertrain.js
export const calculateSteeringAndSuspen = (operand) => {
    const {
        wheelBase,
        Width,
        wheelDia,
        track,
        turningRadius,
        load,
        fullLoad,
        safetyLoad,
        frontWeight,
        rearWeight,
        displacement
    } = operand;

    const tanInner = (parseFloat(wheelBase)/((parseFloat(turningRadius) - (parseFloat(track)/2)))).toFixed(3);
    const tanOuter = (parseFloat(wheelBase)/((parseFloat(turningRadius) + (parseFloat(track)/2)))).toFixed(3);
    const tiltInner = ((Math.atan(tanInner))*(180/Math.PI)).toFixed(3);
    const tiltOuter = ((Math.atan(tanOuter))*(180/Math.PI)).toFixed(3);
    const safetyLoadN = (safetyLoad*9.81).toFixed(3);
    const fWheelLoad = (((parseFloat(safetyLoadN)*parseFloat(frontWeight)) / 100)/2).toFixed(3);
    const rWheelLoad = (((parseFloat(safetyLoadN)*parseFloat(rearWeight)) / 100)/2).toFixed(3);
    const  fWSuspension= ((parseFloat(fWheelLoad)/parseFloat(displacement)) / 2).toFixed(3);
    const rWSuspension = ((parseFloat(rWheelLoad)/parseFloat(displacement)) / 2).toFixed(3);
    const fWDamping = (parseFloat(fWSuspension) / 3).toFixed(3);
    const rWDamping = (parseFloat(rWSuspension) / 3).toFixed(3);
    
    return {
        tanInner,
        tanOuter,
        tiltInner,
        tiltOuter,
        safetyLoadN,
        fWheelLoad,
        rWheelLoad,
        fWSuspension,
        rWSuspension,
        fWDamping,
        rWDamping,
    };
};
