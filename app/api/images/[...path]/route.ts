import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

// Esta rota serve como fallback para imagens antigas que podem estar como URLs relativas
// No Vercel, essas imagens não funcionarão, mas novas imagens serão base64
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathArray } = await params;
    const fileName = pathArray.join("/");
    
    // Verificar se o arquivo existe localmente (apenas para desenvolvimento)
    const filePath = join(process.cwd(), "public", fileName);
    
    if (existsSync(filePath)) {
      const fileBuffer = await readFile(filePath);
      const contentType = getContentType(fileName);
      
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
    
    // Se não encontrar, retornar 404
    return NextResponse.json(
      { error: "Imagem não encontrada" },
      { status: 404 }
    );
  } catch (error: any) {
    console.error("Erro ao servir imagem:", error);
    return NextResponse.json(
      { error: "Erro ao servir imagem" },
      { status: 500 }
    );
  }
}

function getContentType(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase();
  const contentTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
  };
  return contentTypes[ext || ""] || "application/octet-stream";
}
