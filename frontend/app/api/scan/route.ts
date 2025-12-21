import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('📦 [FE route] body:', body);

    const backendRes = await fetch('http://localhost:3000/api/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    return NextResponse.json(data, {
      status: backendRes.status,
    });
  } catch (err) {
    console.error('❌ [FE route] error:', err);
    return NextResponse.json(
      { message: 'Error scanning URL' },
      { status: 500 },
    );
  }
}