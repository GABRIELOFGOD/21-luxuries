import { NextRequest, NextResponse } from 'next/server';

// Mock database - in production, connect to MongoDB
const orders = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    email: 'john@example.com',
    total: 1599.99,
    status: 'delivered' as const,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    items: 3,
  },
  {
    id: 'ORD002',
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    total: 899.99,
    status: 'shipped' as const,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    items: 2,
  },
  {
    id: 'ORD003',
    customerName: 'Michael Johnson',
    email: 'michael@example.com',
    total: 2499.99,
    status: 'processing' as const,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    items: 4,
  },
  {
    id: 'ORD004',
    customerName: 'Sarah Williams',
    email: 'sarah@example.com',
    total: 1299.99,
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
    items: 1,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let filteredOrders = orders;

    if (status) {
      filteredOrders = orders.filter(o => o.status === status);
    }

    return NextResponse.json(filteredOrders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
