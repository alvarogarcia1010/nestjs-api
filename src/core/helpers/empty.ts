/**
 * JavaScript equivalent to PHP's empty
 *
 * @param mixed mixedVar
 *
 * @returns boolean
 * example 1: empty(null);
 * returns 1: true
 * example 2: empty(undefined);
 * returns 2: true
 * example 3: empty([]);
 * returns 3: true
 * example 4: empty({});
 * returns 4: true
 * example 5: empty({'aFunc' : function () { alert('humpty'); } });
 * returns 5: false
 */
const empty = (mixedVar: any) => {
  const emptyValues = [
    undefined,
    null,
    false,
    0,
    '',
    '0',
    '0.0',
    '0.00',
    '0.000',
    '0.0000',
    '0.00000',
    '0.000000',
  ]

  for (let i = 0; i < emptyValues.length; i++) {
    if (mixedVar === emptyValues[i]) {
      return true
    }
  }

  if (typeof mixedVar === 'object') {
    for (const key in mixedVar) {
      return false
    }

    return true
  }

  return false
}

export default empty
