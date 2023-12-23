import { afterAll, beforeAll, afterEach, expect, beforeEach, vi } from 'vitest';
import { setup, cleanup } from '@arktype/attest';

const methods = ['error'] as const;

beforeAll(() => setup());
afterAll(() => cleanup());

beforeEach((context) => {
	context.failOnConsole = true;
	methods.forEach((method) => {
		vi.spyOn(console, method).mockClear();
	});
});

afterEach((context) => {
	if (!context.failOnConsole) return;
	methods.forEach((method) => {
		expect(console[method]).not.toHaveBeenCalled();
	});
});
