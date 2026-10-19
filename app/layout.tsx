import type { Metadata } from 'next';
import './styles.css';
export const metadata: Metadata = { title: 'Executive Notes', description: 'A private workspace for executive notes and decisions.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
