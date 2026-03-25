import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Category from '@/app/models/Category';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const categories = await Category.find({ isActive: true })
      .sort({ name: 1 })
      .select('name description image')
      .lean();

    return NextResponse.json(categories || []);
  } catch (error) {
    console.error('Error fetching public categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
