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
  {
    id: '2',
    name: 'Classic Tailored Suit',
    price: 1299,
    category: 'men',
    description: 'Perfectly tailored suit for business and formal events',
    stock: 30,
    images: ['/work/Merlin-Fashion-master/images/products-img/men/suit1.jpg'],
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let filteredProducts = products;

    if (category) {
      filteredProducts = products.filter(p => p.category === category);
    }

    return NextResponse.json(filteredProducts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      price,
      category,
      description,
      stock,
      images,
    } = body;

    if (!name || !price || !category || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      price: parseFloat(price),
      category,
      description,
      stock: parseInt(stock) || 0,
      images: images || [],
    };

    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
