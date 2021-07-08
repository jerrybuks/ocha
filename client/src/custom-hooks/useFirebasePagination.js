import { useState, useEffect, useCallback } from "react";
// import { firestore } from '../firebase/firebase.utils';

const useFirebasePagination = (
  ref,
  totalItemsCount,
  noOfitemsPerPage,
  totalNumOfPages
) => {
  const [queryState, setQueryState] = useState({
    totalItemsCount,
    noOfitemsPerPage,
    totalNumOfPages,
    curPage: 0,
    hasNextPage: totalNumOfPages > 1 ? true : false,
    hasPrevPage: false,
    curFirst: null,
    curLast: null,
    curData: [],
    curListStart: 0,
    curListEnd: 0,
    isGettingTableData: true,
    error: null,
  });

  const getData = useCallback(
    async (fn, operation = 1) => {
      setQueryState((queryState) => ({
        ...queryState,
        isGettingTableData: true,
      }));
      try {
        const docRef = await fn;

        const documentSnapshots = await docRef.get();
        const data = [];
        documentSnapshots.forEach(function (doc) {
          if (doc.exists) {
            data.push({ ...doc.data(), docId: doc.id });
          }
        });

        const firstVisible = documentSnapshots.docs[0];

        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

       
        setQueryState((queryState) => {  
			const newPage = queryState.curPage + operation;
			let newListStart = queryState.curListEnd + 1;
			let newListEnd =
			  newPage !== totalNumOfPages
				? queryState.curListEnd + noOfitemsPerPage
				: totalItemsCount;
			if (operation === -1) {
			  newListEnd = queryState.curListStart - 1;
			  newListStart = queryState.curListStart - noOfitemsPerPage;
			}
		return	{
          ...queryState,
          curPage: newPage,
          hasNextPage: totalNumOfPages > newPage ? true : false,
          hasPrevPage: newPage > 1 ? true : false,
          curFirst: firstVisible,
          curLast: lastVisible,
          curData: data,
          curListStart: newListStart,
          curListEnd: newListEnd,
          isGettingTableData: false,
        }});
      } catch (error) {
        setQueryState((queryState) => ({
          ...queryState,
          isGettingTableData: false,
          error,
        }));
      }

      // console.log(data);
    },
    [
      noOfitemsPerPage,
      totalItemsCount,
      totalNumOfPages,
    //   queryState.curListEnd,
    //   queryState.curListStart,
    //   queryState.curPage,
    ]
  );

  useEffect(() => {
    getData(ref.limit(noOfitemsPerPage));
    // getData(ref.limit(noOfitemsPerPage));
  }, [noOfitemsPerPage,ref, getData]);

  const getNextPage = () => {
    if (queryState.curLast) {
      getData(ref.startAfter(queryState.curLast).limit(noOfitemsPerPage));
    }
  };

  const getPrevPage = () => {
    if (queryState.curFirst) {
      getData(
        ref.endBefore(queryState.curFirst).limitToLast(noOfitemsPerPage),
        -1
      );
    }
  };

  return [queryState, getNextPage, getPrevPage];
};

export default useFirebasePagination;
