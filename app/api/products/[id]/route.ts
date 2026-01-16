import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../config/db";
import * as productService from "../../services/productService";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const updated = await productService.updateProduct(id, body);
    
    if (!updated) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json(
      { error: "ID inválido ou erro na atualização" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    console.log("🔍 Tentando deletar produto com ID:", id);
    
    if (!id) {
      return NextResponse.json(
        { error: "ID do produto é obrigatório" },
        { status: 400 }
      );
    }

    const deleted = await productService.deleteProduct(id);
    
    console.log("✅ Resultado da deleção:", deleted);
    
    if (!deleted) {
      console.log("❌ Produto não encontrado com ID:", id);
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }
    
    console.log("✅ Produto deletado com sucesso:", id);
    // Retorna 200 com mensagem de sucesso ao invés de 204 para melhor compatibilidade
    return NextResponse.json(
      { message: "Produto deletado com sucesso", id },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("❌ Erro ao deletar produto:", err);
    return NextResponse.json(
      { error: err.message || "Erro ao deletar produto" },
      { status: 500 }
    );
  }
}
