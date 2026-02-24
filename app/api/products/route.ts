import { NextRequest, NextResponse } from "next/server";
import { products, Product, updateProducts } from "../../lib/store";

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (type) {
    filteredProducts = filteredProducts.filter((p) => p.type === type);
  }

  if (offset) {
    const offsetNum = parseInt(offset);
    filteredProducts = filteredProducts.slice(offsetNum);
  }

  if (limit) {
    const limitNum = parseInt(limit);
    filteredProducts = filteredProducts.slice(0, limitNum);
  }

  return NextResponse.json(filteredProducts);
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body: Omit<Product, "id"> = await request.json();

    const newProduct: Product = {
      ...body,
      id: `product_${Date.now()}`,
    };

    // Update the products array
    updateProducts([...products, newProduct]);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
