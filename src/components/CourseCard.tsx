// src/components/CourseCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CourseCardProps {
  id: number;           // <-- add an 'id' prop to link to /courses/:id
  title: string;
  description: string;
  imageSrc: string;     // Path or URL to the course image
}

export default function CourseCard({
  id,
  title,
  description,
  imageSrc,
}: CourseCardProps) {
  return (
    <Link 
      href={`/courses/${id}`}  // Link to /courses/<id>
      style={{ 
        textDecoration: 'none', 
        color: 'inherit' 
      }}
    >
      <div style={{
        border: '1px solid #ccc',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '4px',
        maxWidth: '300px',
        cursor: 'pointer' // Show a pointer cursor on hover
      }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <Image
            src={imageSrc}
            alt={title}
            width={300}
            height={180}
            style={{ objectFit: 'cover', borderRadius: '4px' }}
          />
        </div>
        <h2 style={{ fontWeight: 'bold', margin: '0 0 0.5rem' }}>
          {title}
        </h2>
        <p style={{ margin: 0 }}>
          {description}
        </p>
      </div>
    </Link>
  );
}
