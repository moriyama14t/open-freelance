<script lang="ts" setup>
import { FreelanceInfoType } from "~/types/freelanceInfoType";
const { readFreelanceInfo, createFreelanceInfo } = useFreelanceInfo();
const { freelanceInfoArray, pending, error, refresh } =
  await readFreelanceInfo();

const isFormShow = ref<boolean>(false);
const request = ref<FreelanceInfoType>({
  name: "",
  company_name: "",
  description: "",
});
const create = async (req: FreelanceInfoType) => {
  const { result, createPending, createError } = await createFreelanceInfo(req);
  // TODO: refreshが必要
  freelanceInfoArray.value!.push(result.value!);
  request.value = {
    name: "",
    company_name: "",
    description: "",
  };
  isFormShow.value = false;
};
</script>
<template>
  <div class="m-20">
    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" v-if="isFormShow" @click="isFormShow = false">
      フォームを閉じる
    </button>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" v-else @click="isFormShow = true">新規作成</button>
    <form v-if="isFormShow" class="w-full max-w-lg m-3">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            サービス名
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            v-model="request.name"
          />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            会社名
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            v-model="request.company_name"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            備考
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            v-model="request.description"
          />
        </div>
      </div>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="create(request)">保存</button>
    </form>
    <table class="table-auto m-5">
      <thead>
        <tr>
          <th>ID</th>
          <th>サービス名</th>
          <th>会社名</th>
          <th>その他</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="freelanceInfo in freelanceInfoArray" :key="freelanceInfo.id">
          <td>{{ freelanceInfo.id }}</td>
          <td>{{ freelanceInfo.name }}</td>
          <td>{{ freelanceInfo.company_name }}</td>
          <td>{{ freelanceInfo.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
