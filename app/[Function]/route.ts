import { redirect } from 'next/navigation'
import * as tidy from '../../tidy'
import { NextRequest, NextResponse } from 'next/server'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { env } from 'process'
import { NextURL } from 'next/dist/server/web/next-url'

const allowedDomain = env.ALLOWED_DOMAIN as string

const DOCS: { [key: string]: string } = {
    addItems: '#additems--addrows',
    addRows: '#additems--addrows',
    arrange: '#arrange--sort',
    sort: '#arrange--sort',
    complete: '#complete',
    count: '#count',
    debug: '#debug',
    distinct: '#distinct',
    expand: '#expand',
    fill: '#fill',
    filter: '#filter',
    fullJoin: '#fulljoin',
    groupBy: '#groupby',
    innerJoin: '#innerjoin',
    leftJoin: '#leftjoin',
    map: '#map',
    mutate: '#mutate',
    mutateWithSummary: '#mutatewithsummary',
    pick: '#pick',
    rename: '#rename',
    replaceNully: '#replacenully',
    select: '#select',
    slice: '#slice',
    sliceHead: '#slicehead',
    sliceMax: '#slicemax',
    sliceMin: '#slicemin',
    sliceSample: '#slicesample',
    sliceTail: '#slicetail',
    summarize: '#summarize',
    summarizeAll: '#summarizeall',
    summarizeAt: '#summarizeat',
    summarizeIf: '#summarizeif',
    tally: '#tally',
    total: '#total',
    totalAll: '#totalall',
    totalAt: '#totalat',
    totalIf: '#totalif',
    transmute: '#transmute',
    when: '#when',
}

const DOCURL = 'https://pbeshai.github.io/tidy/docs/api/tidy/'

const getBody = async (request: NextRequest): Promise<any> => {
    let result

    if (request.headers.get('x-fetch')) {
        const call = request.headers.get('x-fetch')!
        const method = call.substring(0, call.indexOf(' '))
        const url = new NextURL(call.substring(call.indexOf(' ') + 1, call.length))
        let body
        if (request.headers.get('x-accept') === 'plain/text') {
            body = await request.text()
        } else {
            body = JSON.stringify(await request.json())
        }
        const headers = new Headers(request.headers)
        headers.delete('x-fetch')
        headers.delete('x-accept')
        headers.delete('x-username')
        headers.delete('x-total-count')
        headers.delete('content-length')
        const response = await fetch(url, {
            headers,
            method,
            body,
        })
        result = await response.json()
    } else {
        result = await request.json()
    }

    return result
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const { Function } = params
    const anchor = DOCS[Function]
    const url = DOCURL + anchor

    redirect('url')
}

export async function POST(request: NextRequest, { params }: { params: Params }) {
    try {
        const username = request.headers.get('x-username')
        if (!username || !username.includes(allowedDomain)) {
            return new NextResponse()
        }

        if (request.headers.get('content-type') !== 'application/json') {
            throw new Error('Content type must be application/json')
        }
        let body = await getBody(request)
        const isArray = Array.isArray(body)
        if (!isArray) {
            body = [body]
        }
        const parameters = Object.fromEntries(request.nextUrl.searchParams)
        const { Function } = params as { [key: string]: keyof typeof tidy }

        let response = await tidy[Function](body, parameters)
        if (!isArray) {
            response = response[0]
        }

        let nextResponse
        if (request.headers.get('x-accept') === 'text/plain') {
            nextResponse = new NextResponse(JSON.stringify(response))
        } else {
            nextResponse = NextResponse.json(response)
        }
        nextResponse.headers.set('X-Total-Count', response.length)

        return nextResponse
    } catch (error) {
        return NextResponse.json({ error: (error as any).message }, { status: 500 })
    }
}
