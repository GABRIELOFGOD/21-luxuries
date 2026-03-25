import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/app/lib/cloudinary';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    const uploadedUrls: Array<{ url: string; publicId: string }> = [];

    for (const file of files) {
      try {
        const buffer = await file.arrayBuffer();
        const result = await uploadToCloudinary(
          Buffer.from(buffer),
          file.name,
          '21-luxury/products'
        );
        uploadedUrls.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      } catch (fileError) {
        console.error(`Error uploading file ${file.name}:`, fileError);
        // Continue with next file, collect all errors
      }
    }

    if (uploadedUrls.length === 0) {
      return NextResponse.json(
        { error: 'Failed to upload any files' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      images: uploadedUrls.map(u => u.url),
      details: uploadedUrls,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
