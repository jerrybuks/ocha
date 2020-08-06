import BagActionTypes from './bag.types';

const INITIAL_STATE = {
  bags: null,
  error: null,
  isFetchingBags: null,
  isGeneratingBag: null
};

const bagReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BagActionTypes.GENERATE_BAG_START:
        return {...state, isGeneratingBag: true}
    case BagActionTypes.GENERATE_BAG_SUCCESS:
        return {...state, isGeneratingBag: false}
    case BagActionTypes.GENERATE_BAG_FAILURE:
        return {...state, isGeneratingBag: false, error: action.payload}
    default:
      return state;
  }
};

export default bagReducer;
