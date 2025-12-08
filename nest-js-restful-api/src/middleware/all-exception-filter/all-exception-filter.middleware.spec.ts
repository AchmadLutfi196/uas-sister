import { AllExceptionFilterMiddleware } from './all-exception-filter.middleware';

describe('AllExceptionFilterMiddleware', () => {
  it('should be defined', () => {
    expect(new AllExceptionFilterMiddleware()).toBeDefined();
  });
});
