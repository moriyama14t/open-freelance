<script lang="ts" setup>
import { FreelanceInfoType } from '~/types/freelanceInfoType';
const { readFreelanceInfo, createFreelanceInfo } = useFreelanceInfo();
const { freelanceInfoArray, pending, error,refresh } = await readFreelanceInfo();

const request = ref<FreelanceInfoType>({
  name: 'test4',
  company_name: 'test444',
  description: 'testxdddddd',
})
const create = async (req: FreelanceInfoType) => {
  const { result, createPending, createError } = await createFreelanceInfo(req);
  // TODO: refreshが必要
  freelanceInfoArray.value!.push(result.value!);
}
</script>
<template>
  <div>
    <div>{{ freelanceInfoArray }}</div>
    <button @click="create(request)">保存</button>
    
  </div>
</template>