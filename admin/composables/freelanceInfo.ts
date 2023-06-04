import {FreelanceInfoType } from '@/types/freelanceInfoType'

export const useFreelanceInfo = () =>{

  const readFreelanceInfo = async () => {
    const { data:freelanceInfoArray, pending, error, refresh } = await useFetch<FreelanceInfoType[]>('/api/freelanceInfo');
    return { freelanceInfoArray, pending, error, refresh }
  }

  const createFreelanceInfo = async (freelanceInfo: FreelanceInfoType) => {
    const { data:result, pending:createPending, error:createError, refresh } = await useFetch<FreelanceInfoType>('/api/freelanceInfo',{
      method: 'post',
      body: freelanceInfo,
    });
    return { result, createPending, createError, refresh }
  }

  const updateFreelanceInfo = async (freelanceInfo: FreelanceInfoType) => {
    const { data:updateResult, pending:updatePending, error:updateError, refresh } = await useFetch<FreelanceInfoType>('/api/freelanceInfo',{
      method: 'put',
      body: freelanceInfo,
    });
    return { updateResult, updatePending, updateError, refresh }
  }

  const deleteFreelanceInfo = async (id: number) => {
    const { data:deleteResult, pending:deletePending, error:deleteError, refresh } = await useFetch<FreelanceInfoType>('/api/freelanceInfo',{
      method: 'delete',
      body: {id :id},
    });
    return { deleteResult, deletePending, deleteError, refresh }
  }


  return { readFreelanceInfo,createFreelanceInfo,deleteFreelanceInfo,updateFreelanceInfo }
}