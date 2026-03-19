import { NextRequest, NextResponse } from 'next/server';

// Mock database - in production, connect to MongoDB
let categories = [
  { id: '1', name: 'Men', description: 'Men\'s luxury collection' },
  { id: '2', name: 'Women', description: 'Women\'s luxury collection' },
  { id: '3', name: 'Accessories', description: 'Luxury accessories' },
];

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const categoryIndex = categories.findIndex(c => c.id === params.id);

    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    categories[categoryIndex] = {
      ...categories[categoryIndex],
      ...body,
    };

    return NextResponse.json(categories[categoryIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryIndex = categories.findIndex(c => c.id === params.id);

    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const deletedCategory = categories.splice(categoryIndex, 1);

    return NextResponse.json(deletedCategory[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
