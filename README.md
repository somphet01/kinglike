# Kinglike Mattress Website

Premium black and gold mattress storefront prototype for Kinglike.

## Pages

- `index.html` - customer storefront
- `admin.html` - local admin dashboard for products and promotion

## Features

- Responsive storefront
- Product listing, filters, search, wishlist, and cart drawer
- Product detail modal
- Local admin dashboard
- Product and promotion data saved in browser `localStorage`
- Optional local sync server for sharing admin updates with real mobile devices
- Prices displayed in Lao kip

## Local Preview

For admin updates to show on other devices, run the included sync server:

```text
npm run dev
```

Then visit:

```text
http://127.0.0.1:4173/
```

Admin:

```text
http://127.0.0.1:4173/admin.html
```

On a real phone, open the computer's LAN IP address instead of `127.0.0.1`, for example:

```text
http://192.168.1.20:4173/
```

## GitHub Pages Data Updates

GitHub Pages is static hosting, so the admin page cannot write product updates directly to GitHub from the browser.

To make phone users see admin changes on the GitHub Pages link:

1. Open `admin.html`.
2. Add/edit products and upload images.
3. Go to `DATA BACKUP`.
4. Click `Export for GitHub Pages`.
5. Replace `data/store.json` in the repo with the downloaded `store.json`.
6. Commit and push to GitHub.

The storefront reads `data/store.json` automatically on GitHub Pages.

## Note

This is a front-end prototype. Without the included sync server, admin data is saved only in the current browser. A production version should connect to a real database and authentication system.
