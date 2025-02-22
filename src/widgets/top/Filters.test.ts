import { describe, it, expect, vi } from 'vitest';
import { getFilterValue, setQueryParams } from './Filters';

describe('필터 관련 함수 테스트', () => {
  describe('getFilterValue 함수', () => {
    it('검색어가 있을 때는 "all"을 반환해야 함', () => {
      const params = new URLSearchParams('q=검색어');
      expect(getFilterValue(params)).toBe('all');
    });

    it('완료 상태가 true일 때는 "complete"를 반환해야 함', () => {
      const params = new URLSearchParams('isComplete=true');
      expect(getFilterValue(params)).toBe('complete');
    });

    it('완료 상태가 false일 때는 "incomplete"를 반환해야 함', () => {
      const params = new URLSearchParams('isComplete=false');
      expect(getFilterValue(params)).toBe('incomplete');
    });

    it('우선순위에 따라 올바른 값을 반환해야 함', () => {
      const testCases = [
        { params: new URLSearchParams('priority=3'), expected: 'priority_high' },
        { params: new URLSearchParams('priority=2'), expected: 'priority_medium' },
        { params: new URLSearchParams('priority=1'), expected: 'priority_low' }
      ];

      testCases.forEach(({ params, expected }) => {
        expect(getFilterValue(params)).toBe(expected);
      });
    });

    it('파라미터가 없을 때는 "all"을 반환해야 함', () => {
      const params = new URLSearchParams();
      expect(getFilterValue(params)).toBe('all');
    });
  });

  describe('setQueryParams 함수', () => {
    it('"all" 선택 시 모든 파라미터를 제거해야 함', () => {
      const mockSetSearchParams = vi.fn();
      setQueryParams('all', mockSetSearchParams);
      expect(mockSetSearchParams).toHaveBeenCalledWith();
    });

    it('"complete" 선택 시 isComplete=true를 설정해야 함', () => {
      const mockSetSearchParams = vi.fn();
      setQueryParams('complete', mockSetSearchParams);
      expect(mockSetSearchParams).toHaveBeenCalledWith({ isComplete: 'true' });
    });

    it('"incomplete" 선택 시 isComplete=false를 설정해야 함', () => {
      const mockSetSearchParams = vi.fn();
      setQueryParams('incomplete', mockSetSearchParams);
      expect(mockSetSearchParams).toHaveBeenCalledWith({ isComplete: 'false' });
    });

    it('우선순위 선택 시 올바른 priority 값을 설정해야 함', () => {
      const mockSetSearchParams = vi.fn();

      setQueryParams('priority_high', mockSetSearchParams);
      expect(mockSetSearchParams).toHaveBeenCalledWith({ priority: '3' });

      setQueryParams('priority_medium', mockSetSearchParams);
      expect(mockSetSearchParams).toHaveBeenCalledWith({ priority: '2' });

      setQueryParams('priority_low', mockSetSearchParams);
      expect(mockSetSearchParams).toHaveBeenCalledWith({ priority: '1' });
    });
  });
});
