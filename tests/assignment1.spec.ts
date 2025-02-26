import { test, expect } from '@playwright/test';
import { extractToken } from '../helpers/auth.helper';


test('/auth', async ({ request }) => {
let token: string;

  test.step('/login', async () => {
    
    const response = await request.post('auth/login', { data: { username: 'admin', password: 'password' } });
    expect(response.status()).toBe(200)
    token = await extractToken(response);
    expect(token).toBeTruthy();
  });
  test.step('/validate', async () => {
    
  });
  test.step('/logout', async () => {
    
  });

  
});

