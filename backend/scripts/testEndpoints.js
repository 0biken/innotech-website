import http from 'http';
import app from '../src/app.js';

// Simple endpoint tester: starts the app on an ephemeral port, queries endpoints, prints results
async function runTests() {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  console.log(`Server started on port ${port}`);

  const endpoints = [
    '/',
    '/api/users',
    '/api/registrations',
    '/api/submissions',
    '/api/admin'
  ];

  const results = [];
  for (const path of endpoints) {
    const url = `http://127.0.0.1:${port}${path}`;
    try {
      const res = await fetch(url);
      const text = await res.text();
      results.push({ path, status: res.status, body: text.slice(0, 300) });
    } catch (err) {
      results.push({ path, error: String(err) });
    }
  }

  server.close();

  console.log('\nTest summary:');
  for (const r of results) {
    if (r.error) console.log(`${r.path} -> ERROR: ${r.error}`);
    else console.log(`${r.path} -> ${r.status} | ${r.body.replace(/\n/g, ' ')}...`);
  }
}

runTests().catch((e) => {
  console.error('Test script failed:', e);
  process.exit(1);
});
