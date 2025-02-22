import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { api, API_URL, apiClient } from './api';

describe('API 유틸리티 테스트', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.reset();
    vi.restoreAllMocks();
  });

  describe('성공 케이스', () => {
    it('GET 요청이 성공하면 데이터를 반환해야 함', async () => {
      const mockData = { id: 1, title: '테스트' };
      mock.onGet(`${API_URL}test`).reply(200, mockData);

      const result = await api('get', 'test');
      expect(result).toEqual(mockData);
    });

    it('POST 요청이 성공하면 생성된 데이터를 반환해야 함', async () => {
      const postData = { title: '새 항목' };
      const mockResponse = { id: 1, ...postData };
      mock.onPost(`${API_URL}test`, postData).reply(201, mockResponse);

      const result = await api('post', 'test', postData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('실패 케이스', () => {
    it('404 에러가 발생하면 reject 되어야 함', async () => {
      mock.onGet(`${API_URL}notfound`).reply(404);

      await expect(api('get', 'notfound')).rejects.toThrow();
    });

    it('네트워크 에러가 발생하면 reject 되어야 함', async () => {
      mock.onGet(`${API_URL}test`).networkError();

      await expect(api('get', 'test')).rejects.toThrow();
    });

    it('onError 콜백이 제공되면 호출되어야 함', async () => {
      const onError = vi.fn();
      mock.onGet(`${API_URL}test`).reply(500);

      await expect(api('get', 'test', undefined, undefined, onError)).rejects.toThrow();
      expect(onError).toHaveBeenCalled();
    });
  });

  describe('옵션 처리', () => {
    it('추가 옵션이 요청에 포함되어야 함', async () => {
      const mockData = { id: 1 };
      mock.onGet(`${API_URL}test`).reply((config) => {
        expect(config.headers?.['Authorization']).toBe('Bearer token');
        return [200, mockData];
      });

      const result = await api('get', 'test', undefined, {
        headers: {
          Authorization: 'Bearer token'
        }
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('타임아웃 처리', () => {
    it('타임아웃이 발생하면 reject 되어야 함', async () => {
      mock.onGet(`${API_URL}test`).timeout();

      await expect(api('get', 'test')).rejects.toThrow();
    });
  });
});
