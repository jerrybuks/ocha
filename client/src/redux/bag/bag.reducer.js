import BagActionTypes from './bag.types';

const INITIAL_STATE = {
	bags: null,
	error: null,
	// isFetchingBags: null,
	isGeneratingBag: null,
	isFetchingNumOfDocs: null,
	numOfDocs: 0
};

const bagReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case BagActionTypes.GENERATE_BAG_START:
			return { ...state, isGeneratingBag: true };
		case BagActionTypes.GENERATE_BAG_SUCCESS:
			return { ...state, isGeneratingBag: false,  isFetchingNumOfDocs: true, };
		case BagActionTypes.GENERATE_BAG_FAILURE:
			return { ...state, isGeneratingBag: false, error: action.payload };
		case BagActionTypes.GET_NUMOFBAGS_START:
			return { ...state, isFetchingNumOfDocs: true };
		case BagActionTypes.GET_NUMOFBAGS_SUCCESS:
			return { ...state, isFetchingNumOfDocs: false, numOfDocs : action.payload};
		case BagActionTypes.GET_NUMOFBAGS_FAILURE:
			return { ...state, isFetchingNumOfDocs: false, error : action.payload };
		default:
			return state;
	}
};

export default bagReducer;
