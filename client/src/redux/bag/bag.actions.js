import BagActionTypes from './bag.types';

export const generateBagStart = () => ({
    type: BagActionTypes.GENERATE_BAG_START
  });


export const generateBagSuccess = () => ({
	type: BagActionTypes.GENERATE_BAG_SUCCESS
});

export const generateBagFailure = (error) => ({
	type: BagActionTypes.GENERATE_BAG_FAILURE,
	payload: error
});
