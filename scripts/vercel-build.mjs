import { rmSync } from 'node:fs';

// Vercel only deploys the Next.js site; the Expo app lives in /mobile locally.
if (process.env.VERCEL) {
  rmSync('mobile', { recursive: true, force: true });
}
