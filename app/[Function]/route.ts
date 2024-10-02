import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import * as tidy from '../../tidy'
import { NextRequest } from 'next/server'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

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
    fullJoin: '#fullJoin',
    groupBy: '#groupBy',
    innerJoin: '#innerJoin',
    leftJoin: '#leftJoin',
    map: '#map',
    mutate: '#mutate',
    mutateWithSummary: '#mutateWithSummary',
    pick: '#pick',
    rename: '#rename',
    replaceNully: '#replaceNully',
    select: '#select',
    slice: '#slice',
    sliceHead: '#sliceHead',
    sliceMax: '#sliceMax',
    sliceMin: '#sliceMin',
    sliceSample: '#sliceSample',
    sliceTail: '#sliceTail',
    summarize: '#summarize',
    summarizeAll: '#summarizeAll',
    summarizeAt: '#summarizeAt',
    summarizeIf: '#summarizeIf',
    tally: '#tally',
    total: '#total',
    totalAll: '#totalAll',
    totalAt: '#totalAt',
    totalIf: '#totalIf',
    transmute: '#transmute',
    when: '#when',
}

const DOCURL = 'https://pbeshai.github.io/tidy/docs/api/tidy/'

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const { Function } = params
    const anchor = DOCS[Function]
    const url = DOCURL + anchor

    redirect(url)
}

export async function POST(request: NextRequest, { params }: { params: Params }) {
    const headersList = headers()
    if (headersList.get('content-type') !== 'application/json') {
        throw new Error('Content type must be application/json')
    }
    let body = await request.json()
    const isArray = Array.isArray(body)
    if (!isArray) {
        body = [body]
    }
    const parameters = Object.fromEntries(request.nextUrl.searchParams)
    const { Function } = params as { [key: string]: keyof typeof tidy }

    let response = tidy[Function](body, parameters)
    if (!isArray) {
        response = response[0]
    }

    return Response.json(response)
}
