// @flow

import transpose from '../transpose';
import { OCTAVE } from '../constants/Interval/Names';

import isValidScale from '../isValidScale';
import isDescendingScale from '../isDescendingScale';
import isAscendingScale from '../isAscendingScale';
import getNote from '../getNote';

type options = {
  direction: direction
};

const calculateInterval = (scale, direction = 1) => {
  if (isDescendingScale(scale)) return -OCTAVE;
  else if (isAscendingScale(scale)) return OCTAVE;
  return direction === 1 ? OCTAVE : -OCTAVE;
};

const normalizeScale = (
  scale: Scale,
  { direction = 1 }: options = {}
): Scale => {
  if (!isValidScale(scale, { direction })) {
    throw new Error(`${JSON.stringify(scale)} is not a valid scale`);
  }

  const start = scale[0];
  const end = scale[scale.length - 1];

  const normalizedScale =
    getNote(start) !== getNote(end)
      ? [...scale, transpose(scale[0], calculateInterval(scale, direction))]
      : scale;

  if (direction === -1 || isDescendingScale(scale)) normalizedScale.reverse();

  return normalizedScale;
};

export default normalizeScale;
