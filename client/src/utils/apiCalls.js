import { useMutation, useQuery } from "react-query";

async function getRequest({ docRef, isCollection }) {
  console.log(docRef,66666)
  const snapshot = await docRef.get();
  return isCollection ?  snapshot.docs.map(doc => doc.data()) : snapshot.data()
}

async function postRequest({ docRef, data }) {
       console.log(docRef,data,111333)
  return await docRef.add(data);
}

function editRequest({ docRef, data }) {
  return docRef.update(data);
}

// const deleteRequest = (request) => axiosInstance.delete(request.url);

/**
 * This is api hook for different http operations
 * Takes the following values
 * @param  data: {url, body}
 * @returns Object
 */
export function useApiGet(params, options) {
  const queryOptions = {
    ...options,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };
  console.log(params,555)
  return useQuery(params.key,() => getRequest(params), queryOptions);
}

export function useApiPost(options) {
  return useMutation(postRequest, options);
}

export function useApiEdit(options) {
  return useMutation(editRequest, options);
}

export function useApiDelete(data) {
  //   return useMutation(deleteRequest, data);
}
