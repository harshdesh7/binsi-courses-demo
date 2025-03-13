'use client';
import Link from 'next/link';
import React from 'react';

export default function NavigationBar() {
  return (
    <nav style={{ padding: '1rem 0', borderBottom: '1px solid #ccc' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>
        Home
      </Link>
      <Link href="/profile">
        Profile
      </Link>
    </nav>
  );
}
