import { NextRequest, NextResponse } from 'next/server';

// Mock database - in production, connect to MongoDB
let categories = [
  { id: '1', name: 'Men', description: 'Men\'s luxury collection' },
  { id: '2', name: 'Women', description: 'Women\'s luxury collection' },
  { id: '3', name: 'Accessories', description: 'Luxury accessories' },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const newCategory = {
      id: Date.now().toString(),
      name,
      description: description || '',
    };

    categories.push(newCategory);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
