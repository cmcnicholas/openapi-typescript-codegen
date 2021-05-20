import type { Client } from '../client/interfaces/Client';
import { writeFile } from './fileSystem';
import { Templates } from './registerHandlebarTemplates';
import { writeClientIndex } from './writeClientIndex';

jest.mock('./fileSystem');

describe('writeClientIndex', () => {
    it('should write to filesystem', async () => {
        const client: Client = {
            server: 'http://localhost:8080',
            version: '1.0',
            models: [],
            services: [],
        };

        const templates: Templates = {
            exports: {
                model: () => 'model',
                schema: () => 'schema',
                serviceImplementation: () => 'service-implementation',
                serviceInterface: () => 'service-interface',
            },
            core: {
                settings: () => 'settings',
                apiRequestOptions: () => 'apiRequestOptions',
                apiResult: () => 'apiResult',
                request: () => 'request',
            },
        };

        await writeClientIndex(client, templates, '/', true, true, true, true, true);

        expect(writeFile).toBeCalledWith('/index.ts', 'index');
    });
});
