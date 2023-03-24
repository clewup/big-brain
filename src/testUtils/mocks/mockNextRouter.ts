import { NextRouter } from 'next/router';

const mockNextRouter: NextRouter = {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '/',
    events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
    },
    push: jest.fn().mockResolvedValue(undefined),
    replace: jest.fn().mockResolvedValue(undefined),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    isFallback: false,
    isReady: true,
    isPreview: false,
    isLocaleDomain: false,
    forward: jest.fn(),
};

export default mockNextRouter;
