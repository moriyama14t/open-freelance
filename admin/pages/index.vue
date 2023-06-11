<script lang="ts" setup>
import { FreelanceInfoType } from '~/types/freelanceInfoType';
const { readFreelanceInfo, createFreelanceInfo, updateFreelanceInfo, deleteFreelanceInfo } =
	useFreelanceInfo();
const { freelanceInfoArray } = await readFreelanceInfo();

const isFormShow = ref<boolean>(false);

const request = ref<FreelanceInfoType>({
	name: '',
	company_name: '',
	description: '',
});
const create = async (req: FreelanceInfoType) => {
	const { result } = await createFreelanceInfo(req);
	// TODO: refreshが必要
	freelanceInfoArray.value!.push(result.value!);
	request.value = {
		name: '',
		company_name: '',
		description: '',
	};
	isFormShow.value = false;
};

const editInfo = (req: FreelanceInfoType) => {
	request.value = {
		id: req.id,
		name: req.name,
		company_name: req.company_name,
		description: req.description,
	};
	isFormShow.value = true;
};

const update = async (req: FreelanceInfoType) => {
	const { updateResult } = await updateFreelanceInfo(req);
	// TODO: refreshが必要
	request.value = {
		name: '',
		company_name: '',
		description: '',
	};
	freelanceInfoArray.value = freelanceInfoArray.value!.map((freelanceInfo) => {
		if (freelanceInfo.id === req.id) {
			return updateResult.value!;
		}
		return freelanceInfo;
	});
	isFormShow.value = false;
};

const deleteInfo = async (id: number) => {
	await deleteFreelanceInfo(id);
	// TODO: refreshが必要  await refreshNuxtData();?
	freelanceInfoArray.value = freelanceInfoArray.value!.filter(
		(freelanceInfo) => freelanceInfo.id !== id
	);
};
</script>
<template>
	<div class="m-20">
		<h1 class="m-2">エージェント一覧</h1>
		<button
			v-if="isFormShow"
			class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
			@click="isFormShow = false"
		>
			フォームを閉じる
		</button>
		<button
			v-else
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			@click="isFormShow = true"
		>
			新規作成
		</button>
		<form v-if="isFormShow" class="w-full max-w-lg m-3">
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
						サービス名
					</label>
					<input
						v-model="request.name"
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						type="text"
					/>
				</div>
				<div class="w-full md:w-1/2 px-3">
					<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
						会社名
					</label>
					<input
						v-model="request.company_name"
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						type="text"
					/>
				</div>
			</div>
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full px-3 mb-6 md:mb-0">
					<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
						備考
					</label>
					<input
						v-model="request.description"
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						type="text"
					/>
				</div>
			</div>
			<button
				v-if="request.id"
				class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				@click="update(request)"
			>
				更新
			</button>
			<button
				v-else
				class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				@click="create(request)"
			>
				保存
			</button>
		</form>
		<table class="table-auto m-5">
			<thead>
				<tr>
					<th>ID</th>
					<th>サービス名</th>
					<th>会社名</th>
					<th>その他</th>
					<th v-if="!isFormShow">編集</th>
					<th v-if="!isFormShow">削除</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="freelanceInfo in freelanceInfoArray" :key="freelanceInfo.id">
					<td>{{ freelanceInfo.id }}</td>
					<td>{{ freelanceInfo.name }}</td>
					<td>{{ freelanceInfo.company_name }}</td>
					<td>{{ freelanceInfo.description }}</td>
					<td v-if="!isFormShow">
						<button
							class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
							@click="editInfo(freelanceInfo)"
						>
							編集
						</button>
					</td>
					<td v-if="!isFormShow">
						<button
							class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded"
							@click="deleteInfo(freelanceInfo.id!)"
						>
							削除
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
