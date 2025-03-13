import { NextResponse } from 'next/server';
import { EnrollActionRequest, User } from '@/types';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const body = (await request.json()) as EnrollActionRequest;
  const { courseId, action } = body;

  if (!courseId || !action) {
    return NextResponse.json({ message: 'courseId or action missing' }, { status: 400 });
  }

  // Read user data from JSON
  const userPath = path.join(process.cwd(), 'src', 'data', 'user.json');
  const userFileData = fs.readFileSync(userPath, 'utf-8');
  const userData: User = JSON.parse(userFileData);

  switch (action) {
    case 'enroll':
      if (!userData.enrolledCourses.includes(courseId)) {
        userData.enrolledCourses.push(courseId);
      }
      break;
    case 'unenroll':
      userData.enrolledCourses = userData.enrolledCourses.filter(id => id !== courseId);
      break;
    case 'complete':
      if (!userData.completedCourses.includes(courseId)) {
        userData.completedCourses.push(courseId);
      }
      // Optionally remove from enrolledCourses
      userData.enrolledCourses = userData.enrolledCourses.filter(id => id !== courseId);
      break;
    default:
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  }

  // Write updated userData to JSON
  fs.writeFileSync(userPath, JSON.stringify(userData, null, 2), 'utf-8');

  return NextResponse.json(userData);
}
