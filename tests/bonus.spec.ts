import { test, expect } from '@playwright/test';


test('Should get all products', async ({ request }) => {
  const response = await request.get('');
  
});

