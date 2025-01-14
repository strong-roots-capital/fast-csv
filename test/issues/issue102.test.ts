import * as assert from 'assert';
import { resolve } from 'path';
import { parseFile } from '../../src';


describe('Issue #102 - https://github.com/C2FO/fast-csv/issues/102', () => {
    const row = [
        '123456',
        '123456',
        '2018-02-01T16:05:16Z',
        '7',
        '80428',
        '65756',
        'Unquoted_String_With_Underscores_Hypens And_Spaces And-Numbers 1',
        '{"JSON":"DATA"}',
    ];

    it('parse all rows ', (next) => {
        let receivedRows = 0;
        parseFile(resolve(__dirname, 'assets', 'issue102.csv'))
            .on('data-invalid', () => next(new Error('Should not have received data-invalid event')))
            .on('data', (r) => {
                receivedRows += 1;
                assert.deepStrictEqual(r, row);
            })
            .on('error', err => next(err))
            .on('end', (rowCount: number) => {
                assert.strictEqual(rowCount, 100000);
                assert.strictEqual(receivedRows, rowCount);
                next();
            });
    });
});
