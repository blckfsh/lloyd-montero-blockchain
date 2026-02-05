import { FALLBACK_BACKEND_BASE_URL } from '@/app/lib/helpers/constant'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    if (!address) {
        return NextResponse.json({ error: 'Address is required' }, { status: 400 })
    }

    const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? FALLBACK_BACKEND_BASE_URL
    const response = await fetch(`${baseUrl}/ethereum/${address}`)

    const data = await response.json()
    if (!response.ok) {
        return NextResponse.json(
            { error: 'Failed to fetch balance', details: data },
            { status: response.status }
        )
    }

    return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { address } = body

    console.log('address', address)

    const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? FALLBACK_BACKEND_BASE_URL
    const response = await fetch(`${baseUrl}/ethereum`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
    });

    const data = await response.json()
    if (!response.ok) {
        return NextResponse.json(
            { error: 'Failed to fetch balance', details: data },
            { status: response.status }
        )
    }

    return NextResponse.json(data)
}