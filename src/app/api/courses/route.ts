import { NextResponse } from 'next/server';
import { Course } from '@/types';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'courses.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const courses: Course[] = JSON.parse(fileData);

  return NextResponse.json(courses);
}
