export interface Course {
  id: number;
  title: string;
  description: string;
  provider: string;
  courseImg: string;
}

export interface User {
  id: number;
  name: string;
  enrolledCourses: number[];
  completedCourses: number[];
}

// For the body sent to /api/enroll
export interface EnrollActionRequest {
  courseId: number;
  action: 'enroll' | 'unenroll' | 'complete';
} 