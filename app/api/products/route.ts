import { NextRequest, NextResponse } from "next/server";
import connectDB from "../config/db";
import * as productService from "../services/productService";

export async function GET() {
  try {
    await connectDB();
    const products = await productService.getAllProducts();
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validar campos obrigatórios
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Nome e preço são obrigatórios" },
        { status: 400 }
      );
    }

    // Remover _id se existir (será gerado pelo MongoDB)
    const { _id, ...productData } = body;
    
    const product = await productService.createProduct(productData);
    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    console.error("Erro ao criar produto:", err);
    return NextResponse.json(
      { error: err.message || "Erro ao criar produto" },
      { status: 400 }
    );
  }
}
