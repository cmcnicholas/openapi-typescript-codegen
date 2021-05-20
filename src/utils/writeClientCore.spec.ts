import type { Client } from '../client/interfaces/Client';
import { HttpClient } from '../HttpClient';
import { writeFile } from './fileSystem';
import { Templates } from './registerHandlebarTemplates';
import { writeClientCore } from './writeClientCore';

jest.mock('./fileSystem');

describe('writeClientCore', () => {
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

        await writeClientCore(client, templates, '/', HttpClient.FETCH);

        expect(writeFile).toBeCalledWith('/OpenAPI.ts', 'settings');
        expect(writeFile).toBeCalledWith('/ApiRequestOptions.ts', 'apiRequestOptions');
        expect(writeFile).toBeCalledWith('/ApiResult.ts', 'apiResult');
        expect(writeFile).toBeCalledWith('/request.ts', 'request');
    });
});
