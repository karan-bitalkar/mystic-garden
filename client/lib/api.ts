// // src/lib/api.ts
// export const API_URL = import.meta.env.VITE_API_URL;

// export async function apiFetch(endpoint: string, options: RequestInit = {}) {
//   if (!API_URL) throw new Error("VITE_API_URL is not defined in .env");

//   console.log(`Fetching: ${API_URL}${endpoint}`);

//   const res = await fetch(`${API_URL}${endpoint}`, {
//     headers: {
//       "Content-Type": "application/json",
//       ...(options.headers || {}),
//     },
//     ...options,
//   });

//   const data = await res.json().catch(() => ({}));
//   return { res, data };
// }

// src/lib/api.ts
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  return { res, data };
}
