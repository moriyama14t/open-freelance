import { describe, expect, it } from 'vitest';
import { $fetch } from '@nuxt/test-utils';

describe('pages/index.vue', () => {
	it('新規作成ボタンが表示されているか', async () => {
		expect(await $fetch('/')).toMatch('エージェント一覧');
	});
});
