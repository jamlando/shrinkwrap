# Deploy ShrinkWrap to Vercel

Deploy the **client** (landing page + waitlist) to Vercel so you can share a live link.

## 1. Push your code to GitHub

If you haven’t already:

```bash
cd /Users/taylorlarson/shrinkWrap
git init
git add .
git commit -m "Initial commit: ShrinkWrap landing + waitlist"
```

Create a new repository on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/shrinkWrap.git
git branch -M main
git push -u origin main
```

(Replace `YOUR_USERNAME` and repo name with yours.)

## 2. Import the project in Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub is easiest).
2. Click **Add New…** → **Project**.
3. **Import** your `shrinkWrap` (or whatever you named it) GitHub repo.
4. **Configure the project:**
   - **Root Directory:** Click **Edit**, set to **`client`** (so Vercel builds the Vite app).
   - **Framework Preset:** Vite (should be auto-detected).
   - **Build Command:** `npm run build` (default).
   - **Output Directory:** `dist` (default).
   - **Install Command:** `npm install` (default).
5. **Environment variables:** Click **Environment Variables** and add your Firebase keys so the build and runtime can talk to Firebase. Add each of these (names must match exactly):

   | Name | Value (from your `.env.local`) |
   |------|--------------------------------|
   | `VITE_FIREBASE_API_KEY` | (your value) |
   | `VITE_FIREBASE_AUTH_DOMAIN` | (your value) |
   | `VITE_FIREBASE_PROJECT_ID` | (your value) |
   | `VITE_FIREBASE_STORAGE_BUCKET` | (your value) |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | (your value) |
   | `VITE_FIREBASE_APP_ID` | (your value) |
   | `VITE_FIREBASE_MEASUREMENT_ID` | (your value) |

   You can copy from `client/.env.local`. Add them for **Production** (and optionally Preview).

6. Click **Deploy**.

## 3. Allow your Vercel URL in Firebase (if you use Auth later)

When you add login, you’ll need to allow the Vercel domain in Firebase:

1. Firebase Console → **Authentication** → **Settings** → **Authorized domains**.
2. Add your Vercel URL (e.g. `shrinkwrap-xxx.vercel.app`).

For the waitlist-only MVP, Firestore works without this; add it when you enable sign-in.

## 4. After deploy

- Vercel will give you a URL like `https://shrinkwrap-xxx.vercel.app`.
- Use that link to test and share with friends.
- The waitlist form will write to your Firestore `waitlist` collection; you can see signups in Firebase Console → Firestore Database → `waitlist`.

## 5. Future updates

Push to `main` and Vercel will redeploy automatically:

```bash
git add .
git commit -m "Your change"
git push
```

## Optional: custom domain

In the Vercel project: **Settings → Domains** to add your own domain (e.g. `shrinkwrap.app`).
