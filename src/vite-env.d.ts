/// <reference types="vite/client" />

// vite-imagetools: allow ?format=webp (and other query params) on image imports
declare module '*?format=webp' {
  const src: string;
  export default src;
}
