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

export const getNumOfBagsStart = () => ({
    type: BagActionTypes.GET_NUMOFBAGS_START
  });

export const getNumOfBagsSuccess = (numOfBags) => ({
	type: BagActionTypes.GET_NUMOFBAGS_SUCCESS,
	payload: numOfBags
});

export const getNumOfBagsFailure = (error) => ({
	type: BagActionTypes.GET_NUMOFBAGS_FAILURE,
	payload: error
});

export const linkBagToUserStart = (data) => ({
    type: BagActionTypes.LINK_BAG_START,
	payload: data
  });

export const linkBagToUserSuccess = () => ({
	type: BagActionTypes.LINK_BAG_SUCCESS,
});

export const linkBagToUserFailure = (error) => ({
	type: BagActionTypes.LINK_BAG_FAILURE,
	payload: error
});

// export const getBagsStart = () => ({
//     type: BagActionTypes.GET_BAGS_START,
//   });

// export const getBagsSuccess = (bags) => ({
// 	type: BagActionTypes.GET_BAGS_SUCCESS,
// 	payload: bags
// });

// export const getBagsFailure = (error) => ({
// 	type: BagActionTypes.GET_BAGS_FAILURE,
// 	payload: error
// });