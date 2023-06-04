import {FreelanceInfoType } from '@/types/freelanceInfoType'

export const useFreelanceInfo = () =>{

  const readFreelanceInfo = async () => {
    const { data:response, pending, error, refresh } = await useFetch<FreelanceInfoType[]>('/api/freelanceInfos');
    return { response, pending, error, refresh }
  }

  return { readFreelanceInfo }
}