export const calculateTimeToDistance = (distance, maxSpeed, acceleration, attributes) => {
  const frontalArea = attributes.width * attributes.height;
  const dragForce = 0.5 * attributes.airDen * frontalArea * attributes.dragCoeff * Math.pow(maxSpeed, 2);
  const rollingResistance = attributes.rollCoeff * attributes.gvw;
  const gradeResistance = attributes.gvw * Math.sin(attributes.slope * (Math.PI / 180));
  const totalResistance = dragForce + rollingResistance + gradeResistance;
  const effectiveAcceleration = acceleration - (totalResistance / attributes.gvw);

  if (effectiveAcceleration <= 0) {
    return Infinity;
  }

  const timeToReachMaxSpeed = maxSpeed / effectiveAcceleration;
  const distanceDuringAcceleration = 0.5 * effectiveAcceleration * Math.pow(timeToReachMaxSpeed, 2);

  if (distanceDuringAcceleration >= distance) {
    return Math.sqrt((2 * distance) / effectiveAcceleration);
  }

  const remainingDistance = distance - distanceDuringAcceleration;
  return timeToReachMaxSpeed + (remainingDistance / maxSpeed);
};