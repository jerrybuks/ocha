import { createSelector } from 'reselect';

const selectBag = state => state.bag;

export const selectIsGeneratingBag = createSelector(
  [selectBag],
  bag => bag.isGeneratingBag
);