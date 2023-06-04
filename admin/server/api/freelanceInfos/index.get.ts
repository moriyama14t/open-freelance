import { FreelanceInfoType } from '../../../types/freelanceInfoType';

const FreelanceInfos: FreelanceInfoType[] = [
  { id: 1, name: "Todo 1", company_name: "Todo 1 contents", discription: "Todo 1 discription" },
  { id: 2, name: "Todo 2", company_name: "Todo 2 contents", discription: "Todo 2 discription" },
  { id: 3, name: "Todo 3", company_name: "Todo 3 contents", discription: "Todo 3 discription" },
];

export default defineEventHandler(async(event) => {
  const freelanceInfoArray = await FreelanceInfos
  return freelanceInfoArray
})