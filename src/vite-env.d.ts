/// <reference types="vite/client" />

// React 18 renders the lowercase DOM attribute; React 19 types only know fetchPriority.
import 'react';

declare module 'react' {
  interface ImgHTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}
