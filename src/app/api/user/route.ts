import { NextResponse } from 'next/server';
import { User } from '@/types';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'user.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const userData: User = JSON.parse(fileData);

  return NextResponse.json(userData);
}
