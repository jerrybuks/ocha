import { createSelector } from 'reselect';

const selectBag = state => state.bag;

export const selectIsGeneratingBag = createSelector(
  [selectBag],
  bag => bag.isGeneratingBag
);

export const selectIsFetchingNumOfDocs = createSelector(
  [selectBag],
  bag => bag.isFetchingNumOfDocs
);

export const selectNumOfDocs = createSelector(
  [selectBag],
  bag => bag.numOfDocs
)