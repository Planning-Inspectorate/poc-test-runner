import { formatDateForDisplay, parseDateInput } from './format-date.js';
import {describe, it} from 'node:test';
import assert from 'node:assert';

describe('format-date', () => {
	describe.only('formatUTCDateToUK', () => {
		const tests = [
			{ date: new Date('2024-02-20T15:00Z'), expected: '20 Feb 2024 - 15 00' },
			{ date: new Date('2024-09-30T20:00Z'), expected: '30 Sep 2024 - 21 00' },
			{ date: new Date('2024-09-30T23:59Z'), expected: '1 Oct 2024 - 00 59' },
			{ date: '2024-02-20T15:00:00.000Z', expected: '20 Feb 2024 - 15 00' },
			{ date: '2024-09-30T20:00:00.000Z', expected: '30 Sep 2024 - 21 00' },
			{ date: '2024-09-30T23:59:00.000Z', expected: '1 Oct 2024 - 00 59' }
		];

		for (const {date, expected} of tests) {
			it(`format date ${date} in Europe/London`, () => {
				assert.deepStrictEqual(formatDateForDisplay(date, { format: 'd MMM yyyy - HH mm' }), expected);
			});
		}

		const badInputTests = [
			{ date: undefined, expected: '' },
			{ date: null, expected: '' },
			{ date: 'nope', expected: '' }
		];

		for (const {date, expected} of badInputTests) {
			it(`returns empty string for bad value: ${date}`, () => {
				assert.deepStrictEqual(formatDateForDisplay(date), expected);
			});
		}
	});

	describe('parseDateInput', () => {
		const tests = [
			{ input: { year: 2024, month: 2, day: 20 }, expected: new Date('2024-02-20T00:00:00.000Z') },
			{
				input: { year: 2024, month: 9, day: 30, hour: 21, minute: 0 },
				expected: new Date('2024-09-30T20:00:00.000Z')
			},
			{
				input: { year: 2024, month: 10, day: 1, hour: 0, minute: 59 },
				expected: new Date('2024-09-30T23:59:00.000Z')
			}
		];

		for (const {input, expected} of tests) {
			it(`parse ${JSON.stringify(input)} in Europe/London`, () => {
				assert.deepStrictEqual(parseDateInput(input), expected);
			});
		}
	});
});
