'use client';
import { useEffect, useState } from 'react';
import { Course, User } from '@/types';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/user'),
      fetch('/api/courses'),
    ])
      .then(([userRes, coursesRes]) => 
        Promise.all([userRes.json(), coursesRes.json()])
      )
      .then(([userData, coursesData]) => {
        setUser(userData as User);
        setCourses(coursesData as Course[]);
      });
  }, []);

  if (!user || courses.length === 0) {
    return <div>Loading...</div>;
  }

  const getCourseTitle = (id: number): string => {
    const found = courses.find(course => course.id === id);
    return found ? found.title : 'Unknown';
  };

  return (
    <>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>

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
            Enrolled Courses
          </summary>
          {user.enrolledCourses.length > 0 ? (
            <ul style={{ 
              marginTop: '0.5rem',
              paddingLeft: '1.5rem',
              listStyleType: 'disc' 
            }}>
              {user.enrolledCourses.map(cid => (
                <li key={cid}>{getCourseTitle(cid)}</li>
              ))}
            </ul>
          ) : (
            <p style={{ marginTop: '0.5rem' }}>No courses enrolled yet.</p>
          )}
        </details>
      </div>

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
            Completed Courses
          </summary>
          {user.completedCourses.length > 0 ? (
            <ul style={{ 
              marginTop: '0.5rem',
              paddingLeft: '1.5rem',
              listStyleType: 'disc' 
            }}>
              {user.completedCourses.map(cid => (
                <li key={cid}>{getCourseTitle(cid)}</li>
              ))}
            </ul>
          ) : (
            <p style={{ marginTop: '0.5rem' }}>No courses completed yet.</p>
          )}
        </details>
      </div>
    </>
  );
}
