/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_BASE_URL: string;
    VITE_OPENAI_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
