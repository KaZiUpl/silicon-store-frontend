import { OrderNumberPipe } from './order-number.pipe';

describe('OrderNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
