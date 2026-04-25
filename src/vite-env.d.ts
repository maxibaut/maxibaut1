/// <reference types="vite/client" />

// vite-imagetools: allow ?format=webp (and other query params) on image imports
declare module '*?format=webp' {
  const src: string;
  export default src;
}

declare module '*&format=webp&quality=80' {
  const src: string;
  export default src;
}

declare module '*&as=srcset' {
  const src: string;
  export default src;
}

// Catch-all for any vite-imagetools query string starting with ?w=
declare module '*&format=webp&quality=80&as=srcset' {
  const src: string;
  export default src;
}

declare module '*&format=avif&quality=70&as=srcset' {
  const src: string;
  export default src;
}
