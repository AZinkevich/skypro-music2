import { formatTime } from "./helper";

describe('formatTime', () => {
  it('Добавление 0, если секунд < 10', () => {
    expect(formatTime(61)).toBe('1:01');
  });
  it('Форматирует время меньше 1 минуты', () => {
    expect(formatTime(34)).toBe('0:34');
  });
  it('Обрабатывает время 0 минут 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
});