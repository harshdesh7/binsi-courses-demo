'use client';
import { useEffect, useState } from 'react';
import { Course, User } from '@/types';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const { courseId } = params;
  const [course, setCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    async function fetchData() {
      const [coursesRes, userRes] = await Promise.all([
        fetch('/api/courses'),
        fetch('/api/user'),
      ]);

      const [coursesData, userData] = await Promise.all([
        coursesRes.json(),
        userRes.json(),
      ]);

      const foundCourse = (coursesData as Course[]).find(
        (c) => c.id === Number(courseId)
      );

      setCourse(foundCourse || null);
      setUser(userData as User);
      setLoading(false);
    }

    fetchData();
  }, [courseId]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found.</p>;
  if (!user) return <p>User not found.</p>;

  const isEnrolled = user.enrolledCourses.includes(course.id);
  const isCompleted = user.completedCourses.includes(course.id);

  const handleAction = async (actionType: 'enroll' | 'complete' | 'unenroll') => {
    setLoading(true);
    const response = await fetch('/api/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: course.id, action: actionType }),
    });
    const updatedUser = (await response.json()) as User;
    setUser(updatedUser);
    setLoading(false);
  };

  return (
    <>
      <h1>{course.title}</h1>
      <img 
        src={course.courseImg}
        alt={course.title}
        width={300}
        height={180}
        style={{ objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }}
      />
      <p>{course.description}</p>

      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: 'transparent'
      }}>
        <details style={{ margin: 0 }}>
          <summary style={{ 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            padding: '0.5rem',
            backgroundColor: 'transparent',
            borderRadius: '4px',
            listStyle: 'none'
          }}>
            Course Outline
          </summary>
          <ul style={{ 
            marginTop: '0.5rem',
            paddingLeft: '1.5rem',
            listStyleType: 'disc' 
          }}>
            <li>Introduction</li>
            <li>Core Topics</li>
            <li>Final Project</li>
          </ul>
        </details>
      </div>

      <div style={{ marginTop: '20px' }}>
        {!isEnrolled && !isCompleted && (
          <button onClick={() => handleAction('enroll')}>Enroll</button>
        )}

        {isEnrolled && (
          <>
            <button 
              onClick={() => handleAction('complete')}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                marginRight: '10px',
                cursor: 'pointer'
              }}
            >
              Complete
            </button>
            <button
              onClick={() => handleAction('unenroll')} 
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Unenroll
            </button>
          </>
        )}

        {isCompleted && (
          <p>You have completed this course.</p>
        )}
      </div>
    </>
  );
}
