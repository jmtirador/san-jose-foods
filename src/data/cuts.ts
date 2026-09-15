// Catalog spec data. `index` points into the matching `cuts` array in
// src/translations/index.ts, which is the source of truth for cut names in
// both languages; the order there must not change without updating this file.
//
// IMPS numbers come from the USDA AMS Institutional Meat Purchase
// Specifications, Series 100 (Fresh Beef) and Series 400 (Fresh Pork). Items
// without a Series 100/400 number (offal, poultry parts) carry null rather than
// an invented code. Mexican market names follow published nomenclature guides
// (Distribuidora Cholula's US-to-Mexico equivalence tables); a pair that could
// not be sourced cleanly stays null.

export type Protein = 'beef' | 'pork' | 'chicken'

export type PrimalId =
  | 'chuck' | 'rib' | 'loin' | 'round' | 'plate' | 'brisket' | 'trim'
  | 'shoulder' | 'porkLoin' | 'belly' | 'leg'
  | 'whole' | 'breast' | 'poultryLeg' | 'wing' | 'other'

export interface CutSpec {
  protein: Protein
  index: number
  primal: PrimalId
  imps: string | null
  mx: string | null
}

export const PROTEINS: { id: Protein; hs: string; image: string; primals: PrimalId[] }[] = [
  { id: 'beef', hs: 'HS 0201 / 0202', image: '/img/beef.jpg', primals: ['chuck', 'rib', 'loin', 'round', 'plate', 'brisket', 'trim'] },
  { id: 'pork', hs: 'HS 0203', image: '/img/pork.jpg', primals: ['shoulder', 'porkLoin', 'belly', 'leg', 'trim'] },
  { id: 'chicken', hs: 'HS 0207', image: '/img/chicken.jpg', primals: ['whole', 'breast', 'poultryLeg', 'wing', 'other'] },
]

const CUTS: CutSpec[] = [
  // Beef (Series 100)
  { protein: 'beef', index: 0, primal: 'chuck', imps: '116A', mx: 'Diezmillo' },
  { protein: 'beef', index: 1, primal: 'chuck', imps: '130', mx: null },
  { protein: 'beef', index: 2, primal: 'rib', imps: '112A · 109E', mx: 'Rib eye' },
  { protein: 'beef', index: 3, primal: 'loin', imps: '180 · 175', mx: 'New York' },
  { protein: 'beef', index: 4, primal: 'loin', imps: '189', mx: 'Filete' },
  { protein: 'beef', index: 5, primal: 'loin', imps: '184', mx: 'Aguayón' },
  { protein: 'beef', index: 6, primal: 'round', imps: '169', mx: 'Pulpa negra' },
  { protein: 'beef', index: 7, primal: 'round', imps: '170', mx: 'Pulpa blanca' },
  { protein: 'beef', index: 8, primal: 'brisket', imps: '120', mx: 'Pecho' },
  { protein: 'beef', index: 9, primal: 'plate', imps: '193', mx: 'Falda' },
  { protein: 'beef', index: 10, primal: 'plate', imps: '121D · 121C', mx: 'Arrachera' },
  { protein: 'beef', index: 11, primal: 'rib', imps: '123', mx: 'Costilla corta' },
  { protein: 'beef', index: 12, primal: 'trim', imps: null, mx: 'Cola de res' },
  { protein: 'beef', index: 13, primal: 'trim', imps: '136', mx: null },
  { protein: 'beef', index: 14, primal: 'trim', imps: '138', mx: null },
  { protein: 'beef', index: 15, primal: 'trim', imps: null, mx: null },

  // Pork (Series 400)
  { protein: 'pork', index: 0, primal: 'porkLoin', imps: '410 · 413', mx: null },
  { protein: 'pork', index: 1, primal: 'shoulder', imps: '406', mx: null },
  { protein: 'pork', index: 2, primal: 'shoulder', imps: '405', mx: null },
  { protein: 'pork', index: 3, primal: 'belly', imps: '408 · 409', mx: null },
  { protein: 'pork', index: 4, primal: 'porkLoin', imps: '422', mx: null },
  { protein: 'pork', index: 5, primal: 'porkLoin', imps: '416A', mx: null },
  { protein: 'pork', index: 6, primal: 'leg', imps: '401', mx: null },
  { protein: 'pork', index: 7, primal: 'trim', imps: '417 · 420', mx: null },
  { protein: 'pork', index: 8, primal: 'trim', imps: null, mx: null },
  { protein: 'pork', index: 9, primal: 'trim', imps: null, mx: null },
  { protein: 'pork', index: 10, primal: 'trim', imps: '496', mx: null },
  { protein: 'pork', index: 11, primal: 'trim', imps: '418', mx: null },

  // Chicken (USDA AMS part names; no IMPS series)
  { protein: 'chicken', index: 0, primal: 'whole', imps: null, mx: null },
  { protein: 'chicken', index: 1, primal: 'breast', imps: null, mx: null },
  { protein: 'chicken', index: 2, primal: 'breast', imps: null, mx: null },
  { protein: 'chicken', index: 3, primal: 'poultryLeg', imps: null, mx: null },
  { protein: 'chicken', index: 4, primal: 'poultryLeg', imps: null, mx: null },
  { protein: 'chicken', index: 5, primal: 'poultryLeg', imps: null, mx: null },
  { protein: 'chicken', index: 6, primal: 'wing', imps: null, mx: null },
  { protein: 'chicken', index: 7, primal: 'other', imps: null, mx: null },
  { protein: 'chicken', index: 8, primal: 'other', imps: null, mx: null },
  { protein: 'chicken', index: 9, primal: 'other', imps: null, mx: null },
  { protein: 'chicken', index: 10, primal: 'other', imps: null, mx: null },
]

export function cutsFor(protein: Protein): CutSpec[] {
  return CUTS.filter((c) => c.protein === protein).sort((a, b) => a.index - b.index)
}
