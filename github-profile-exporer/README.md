# GitHub User Getter

A React application that fetches and displays a GitHub user's profile and repositories using the public GitHub API.

## Built With

- React
- Axios
- TanStack Query (React Query)
- Vite

## Features

- Search any GitHub username
- Display user profile and public repository count
- List all public repositories with name and description
- Loading states for both user and repos
- Graceful error handling for 404 (user not found) and 403 (rate limit reached)
- Clear button to reset search
- Query caching with 5 minute stale time — same username loads instantly on repeat search

## Project Structure

```
src/
├── api/
│   ├── client.js        — Axios instance with interceptors
│   └── user.service.js  — GitHub API calls
├── components/
│   └── User.jsx         — Main component with search, profile and repos
├── App.jsx
└── main.jsx
```

## How It Works

- `client.js` creates an Axios instance pointing to `https://api.github.com`
- Request interceptor attaches a Bearer token from localStorage if available
- Response interceptor catches 404 and 403 errors and throws readable messages
- `UserService` exposes two methods — `getUser(username)` and `getUserRepos(username)`
- `User.jsx` uses two `useQuery` calls — one for the profile, one for repos
- Queries are disabled until the user submits a username via the Search button
- Errors and loading states render inline so the search input stays visible

## Error Handling

| Status | Message |
|---|---|
| 404 | User not found. Check the username and try again. |
| 403 | GitHub API rate limit reached. Please wait and try again. |

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Optionally set a custom base URL in a `.env` file:

```
VITE_API_BASE_URL=https://api.github.com
```
