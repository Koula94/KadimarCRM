import { api } from '../api';
import fetchMock from 'jest-fetch-mock';

describe('API Configuration', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8080/api';
  });

  it('should use the correct API URL from environment', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'test' }));

    await api.get('/test');

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/api/test',
      expect.any(Object)
    );
  });

  it('should include auth token when available', async () => {
    const token = 'test-token';
    localStorage.setItem('token', token);
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'test' }));

    await api.get('/test');

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
        }),
      })
    );
  });

  it('should handle API errors correctly', async () => {
    const errorMessage = 'Test error';
    fetchMock.mockResponseOnce(JSON.stringify({ error: errorMessage }), { status: 400 });

    await expect(api.get('/test')).rejects.toThrow(`API Error: ${errorMessage}`);
  });
});
