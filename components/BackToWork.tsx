'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function BackToWork() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const href = filter ? `/work?filter=${filter}` : '/work';

  return (
    <Link
      href={href}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '12px',
        letterSpacing: '1.5px',
        color: '#8a8a8a',
        textDecoration: 'none',
      }}
    >
      [back to work]
    </Link>
  );
}
