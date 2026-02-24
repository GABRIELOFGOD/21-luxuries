import { NextRequest, NextResponse } from "next/server";
import { products, Product, updateProducts } from "../../../lib/store";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/products/[id] - Get a single product
export async function GET(request: NextRequest, { params }: RouteParams) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT /api/products/[id] - Update a product
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body: Partial<Product> = await request.json();
    const productIndex = products.findIndex((p) => p.id === params.id);

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updatedProduct = { ...products[productIndex], ...body };
    const newProducts = [...products];
    newProducts[productIndex] = updatedProduct;
    updateProducts(newProducts);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const productIndex = products.findIndex((p) => p.id === params.id);

  if (productIndex === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const newProducts = products.filter((p) => p.id !== params.id);
  const deletedProduct = products[productIndex];
  updateProducts(newProducts);

  return NextResponse.json(deletedProduct);
}
