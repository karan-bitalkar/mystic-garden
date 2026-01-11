

// export async function apiFetch(endpoint: string, options: RequestInit = {}) {
//   const res = await fetch(endpoint, {
//     headers: {
//       "Content-Type": "application/json",
//       ...(options.headers || {}),
//     },
//     ...options,
//   });

//   const data = await res.json().catch(() => ({}));
//   return { res, data };
// }

//api.ts
const API_URL =
  import.meta.env.VITE_API_URL || "http://13.60.231.82:5000";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  return { res, data };
}
