'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import WorkSection from '@/components/WorkSection';

function WorkPageContent() {
  const searchParams = useSearchParams();
  return <WorkSection initialFilter={searchParams.get('filter') ?? undefined} />;
}

export default function WorkPage() {
  return (
    <Suspense>
      <WorkPageContent />
    </Suspense>
  );
}
