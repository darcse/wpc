import {revalidateTag} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

const ALLOWED_TYPES = new Set(['genre', 'artist', 'album', 'article'] as const)

type AllowedType = 'genre' | 'artist' | 'album' | 'article'

type WebhookPayload = {
  _type?: string
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) {
      return NextResponse.json(
        {message: 'Missing environment variable SANITY_REVALIDATE_SECRET'},
        {status: 500},
      )
    }

    const {isValidSignature, body} = await parseBody<WebhookPayload>(
      req,
      secret,
      true,
    )

    if (!isValidSignature) {
      return NextResponse.json(
        {message: 'Invalid signature', isValidSignature},
        {status: 401},
      )
    }

    const type = body?._type
    if (!type || !ALLOWED_TYPES.has(type as AllowedType)) {
      return NextResponse.json(
        {message: 'Bad Request: unsupported or missing _type', body},
        {status: 400},
      )
    }

    // JW: 발행 즉시 반영 — SWR('max')가 아니라 즉시 만료
    revalidateTag(type, {expire: 0})

    return NextResponse.json({revalidated: true, type})
  } catch (err: unknown) {
    console.error('revalidate-tag failed')
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({message}, {status: 500})
  }
}
