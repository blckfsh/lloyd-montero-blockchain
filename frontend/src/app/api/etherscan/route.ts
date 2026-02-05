import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const TransactionSchema = z.object({
  address: z.string().min(1, 'address is required'),
  chainid: z.string().regex(/^\d+$/, 'chainid must be a number'),
  startblock: z.string().regex(/^\d+$/, 'startblock must be a number').default('1'),
  endblock: z.string().regex(/^\d+$/, 'endblock is required'),
  page: z.string().regex(/^\d+$/, 'page must be a number').default('1'),
  offset: z.string().regex(/^\d+$/, 'offset must be a number').default('10'),
  sort: z.enum(['asc', 'desc']).default('desc'),
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const parsed = TransactionSchema.safeParse({
    address: searchParams.get('address') ?? undefined,
    chainid: searchParams.get('chainid') ?? undefined,
    startblock: searchParams.get('startblock') ?? undefined,
    endblock: searchParams.get('endblock') ?? undefined,
    page: searchParams.get('page') ?? undefined,
    offset: searchParams.get('offset') ?? undefined,
    sort: searchParams.get('sort') ?? undefined,
  })

  console.log(parsed.data);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', details: parsed.error.flatten },
      { status: 400 }
    )
  }

  const apiUrl = process.env.NEXT_PUBLIC_ETHERSCAN_BASE_URL
  if (!apiUrl) {
    return NextResponse.json(
      { error: 'NEXT_PUBLIC_ETHERSCAN_BASE_URL is not configured' },
      { status: 500 }
    )
  }

  const url = new URL(apiUrl)
  url.searchParams.set('module', 'account')
  url.searchParams.set('action', 'txlist')
  url.searchParams.set('chainid', parsed.data.chainid)
  url.searchParams.set('address', parsed.data.address)
  url.searchParams.set('startblock', parsed.data.startblock)
  url.searchParams.set('endblock', parsed.data.endblock)
  url.searchParams.set('page', parsed.data.page)
  url.searchParams.set('offset', parsed.data.offset)
  url.searchParams.set('sort', parsed.data.sort)
  url.searchParams.set('apikey', process.env.ETHERSCAN_API_KEY ?? '')

  console.log("url", url.toString());
  console.log("process.env.ETHERSCAN_API_KEY", process.env.ETHERSCAN_API_KEY);
  
  const response = await fetch(url.toString())
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 502 })
  }

  const data = await response.json()
  const status = typeof data?.status === 'string' ? data.status : undefined
  const result = data?.result

  if (status === '0') {
    const resultText = typeof result === 'string' ? result : ''
    if (resultText.toLowerCase().includes('no transactions')) {
      return NextResponse.json({ result: [] })
    }

    return NextResponse.json(
      { error: 'Etherscan returned an error', details: data },
      { status: 502 }
    )
  }

  if (!Array.isArray(result)) {
    return NextResponse.json(
      { error: 'Unexpected Etherscan response', details: data },
      { status: 502 }
    )
  }

  return NextResponse.json({ result })
}

