'use client';

import { useEffect, useState } from 'react';
import CourseCard from '@/components/CourseCard';
import { Course } from '@/types';

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      // GET the list of courses from /api/courses or wherever
      const res = await fetch('/api/courses');
      const data: Course[] = await res.json();
      setCourses(data);
    }
    fetchCourses();
  }, []);

  return (
    <>
      <h1>Online Learning Platform</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {courses.map(course => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            imageSrc={course.provider === "Binsi" ? "/logos/binsi.png" : "/logos/altSchool.png"}
          />
        ))}
      </div>
    </>
  );
}
