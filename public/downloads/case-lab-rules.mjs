// Independently authored teaching rules. Sources and scope: /cases/dino/,
// /cases/th04/, /cases/dx-ball/ and /cases/calculator/.
export function advanceSpeed(speed) {
  return speed < 13 ? speed + 0.001 : speed;
}
export function replaySpeed(updates) {
  if (!Number.isInteger(updates) || updates < 0 || updates > 100000) throw new RangeError('Use 0–100000 updates.');
  let speed = 6;
  for (let i = 0; i < updates; i++) speed = advanceSpeed(speed);
  return speed;
}
export function ringAngles(count, aim = 0, rotation = 0) {
  if (!Number.isInteger(count) || count < 1 || count > 256) throw new RangeError('Use 1–256 bullets.');
  return Array.from({length: count}, (_, i) => ((Math.trunc(i * 256 / count) + aim + rotation) % 256 + 256) % 256);
}
export function screenPan(x, scale = 1) {
  if (!Number.isFinite(x) || !Number.isFinite(scale)) throw new RangeError('Use finite inputs.');
  return Math.trunc((x * 1.5625 - 500) * scale) || 0;
}
export function percentCalculation(base, entry, operator) {
  if (!Number.isFinite(base) || !Number.isFinite(entry)) throw new RangeError('Use finite inputs.');
  if (!['+', '-', '*', '/'].includes(operator)) throw new RangeError('Unknown operator.');
  const operand = operator === '*' || operator === '/' ? entry / 100 : entry * (base / 100);
  if (operator === '/' && operand === 0) return {operand, result: null};
  const result = operator === '+' ? base + operand : operator === '-' ? base - operand : operator === '*' ? base * operand : base / operand;
  return {operand, result: Number.isFinite(result) ? result : null};
}
