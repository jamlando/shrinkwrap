# Local demo build

Run a production-style build locally to demo the homepage (no Vercel, no Firebase env vars required).

From the project root:

```bash
cd client
npm run demo
```

This runs `npm run build` then `npm run preview`. Open **http://localhost:4173** in your browser.

- **With** `client/.env.local` (Firebase keys set): Waitlist form saves to Firestore.
- **Without** env vars: Homepage and UI work; waitlist shows “Sign up will be available soon” on submit.

To only build (no server): `npm run build`. To only serve an existing `dist/`: `npm run preview`.

## Firebase Auth debugging

### Connection diagnostic

Visit **http://localhost:5173/debug** (or your dev server URL) to run a Firebase connection diagnostic. It shows:

- Which env vars are loaded
- Your projectId and authDomain (verify they match the Firebase Console)
- A raw REST API test that hits the Identity Toolkit sign-up endpoint

If you see `CONFIGURATION_NOT_FOUND` even with Auth enabled in the console, verify the **projectId** in `.env.local` matches the project where you enabled Email/Password and Google sign-in.

### Firebase Auth Emulator (alternative testing)

To test auth without cloud configuration, use the Firebase Local Emulator Suite:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. From project root: `firebase init emulators` → choose only **Authentication**
3. Start emulators: `firebase emulators:start --only auth`
4. In `client/src/lib/firebase.ts`, after `getAuth(app)`, add:

   ```ts
   import { connectAuthEmulator } from 'firebase/auth';
   if (import.meta.env.DEV) {
     connectAuthEmulator(auth!, 'http://127.0.0.1:9099');
   }
   ```

5. Run the dev server. Sign-up and sign-in will use the local emulator instead of production Firebase.
