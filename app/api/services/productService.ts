import { Product } from "../models/Product";
import mongoose from "mongoose";

export async function getAllProducts() {
  return await Product.find();
}

export async function createProduct(productData: any) {
  const newProduct = new Product(productData);
  return await newProduct.save();
}

export async function updateProduct(id: string, updates: any) {
  return await Product.findByIdAndUpdate(id, updates, { new: true });
}

export async function deleteProduct(id: string) {
  try {
    console.log("🔍 [deleteProduct] ID recebido:", id);
    console.log("🔍 [deleteProduct] Tipo do ID:", typeof id);
    
    // Verificar se o ID é válido para MongoDB
    if (!id || typeof id !== 'string') {
      console.error("❌ [deleteProduct] ID inválido:", id);
      throw new Error("ID inválido");
    }

    // Verificar se o ID tem formato válido do MongoDB ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    console.log("🔍 [deleteProduct] ID é ObjectId válido?", isValidObjectId);
    
    if (!isValidObjectId) {
      console.error("❌ [deleteProduct] ID não é um ObjectId válido:", id);
      throw new Error("ID do produto inválido");
    }

    // Verificar se o produto existe antes de deletar
    const existingProduct = await Product.findById(id);
    console.log("🔍 [deleteProduct] Produto encontrado?", !!existingProduct);
    
    if (!existingProduct) {
      console.log("❌ [deleteProduct] Produto não encontrado com ID:", id);
      return false;
    }

    const result = await Product.findByIdAndDelete(id);
    console.log("✅ [deleteProduct] Produto deletado:", !!result);
    
    if (!result) {
      return false;
    }
    
    return true;
  } catch (error: any) {
    console.error("❌ [deleteProduct] Erro:", error);
    // Se for erro de validação, relança com mensagem mais clara
    if (error.message.includes("ID") || error.message.includes("invalid")) {
      throw new Error("ID do produto inválido ou não encontrado");
    }
    throw error;
  }
}
