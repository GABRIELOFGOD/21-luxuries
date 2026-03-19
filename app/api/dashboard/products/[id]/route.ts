import { NextRequest, NextResponse } from 'next/server';

// Mock database - in production, connect to MongoDB
let products = [
  {
    id: '1',
    name: 'Luxury Silk Blouse',
    price: 299,
    category: 'women',
    description: 'Elegant silk blouse perfect for any occasion',
    stock: 50,
    images: ['/work/Merlin-Fashion-master/images/products-img/women/blouse1.jpg'],
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = products.find(p => p.id === params.id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const productIndex = products.findIndex(p => p.id === params.id);

    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    products[productIndex] = {
      ...products[productIndex],
      ...body,
    };

    return NextResponse.json(products[productIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productIndex = products.findIndex(p => p.id === params.id);

    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const deletedProduct = products.splice(productIndex, 1);

    return NextResponse.json(deletedProduct[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
