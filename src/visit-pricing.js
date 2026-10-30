export const OWN_FABRIC_RATE = 120;

export function visitQuote({ ownFabric, service, quantity, fabricPrice, distanceKm, config }) {
  const qty = Math.max(1, Math.min(12, Math.trunc(Number(quantity)) || 1));
  const unit = ownFabric ? OWN_FABRIC_RATE : fabricPrice;
  const base = service === 'home' && Number.isFinite(unit) && unit >= 0 ? qty * unit : null;
  const distanceKnown = Number.isFinite(distanceKm) && distanceKm >= 0;
  const band = config?.ratesConfirmed && distanceKnown
    ? config.distanceBands?.find(b => distanceKm <= b.upToKm)
    : null;
  const travel = band && Number.isFinite(band.fee) && band.fee >= 0 ? band.fee : null;
  return { base, travel, total: base !== null && travel !== null ? base + travel : null, distanceKm: distanceKnown ? distanceKm : null };
}
