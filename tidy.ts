import * as tidyjs from '@tidyjs/tidy'
import {
    tidy,
    asc,
    desc,
    fixedOrder,
    pivotWider,
    pivotLonger,
    fullSeq,
    fullSeqDate,
    fullSeqDateISOString,
    vectorSeq,
    vectorSeqDate,
    rate,
    cumsum,
    roll,
    lag,
    lead,
    rowNumber,
    sum,
    min,
    max,
    mean,
    meanRate,
    median,
    deviation,
    variance,
    n,
    nDistinct,
    first,
    last,
    everything,
    startsWith,
    endsWith,
    contains,
    matches,
    numRange,
    negate,
    TMath,
} from '@tidyjs/tidy'

const TIDYFNS =
    'asc,desc,fixedOrder,pivotWider,pivotLonger,fullSeq,fullSeqDate,fullSeqDateISOString,vectorSeq,vectorSeqDate,rate,cumsum,roll,lag,lead,rowNumber,sum,min,max,mean,meanRate,median,deviation,variance,n,nDistinct,first,last,everything,startsWith,endsWith,contains,matches,numRange,negate,TMath,'
type tidyFn = (data: any[], parameters: { [key: string]: any }) => any

const parseTidyFunctionCall = (param: string): any => {
    const expression = `return ${param}`
    const fn = new Function(TIDYFNS, expression)

    return fn(
        asc,
        desc,
        fixedOrder,
        pivotWider,
        pivotLonger,
        fullSeq,
        fullSeqDate,
        fullSeqDateISOString,
        vectorSeq,
        vectorSeqDate,
        rate,
        cumsum,
        roll,
        lag,
        lead,
        rowNumber,
        sum,
        min,
        max,
        mean,
        meanRate,
        median,
        deviation,
        variance,
        n,
        nDistinct,
        first,
        last,
        everything,
        startsWith,
        endsWith,
        contains,
        matches,
        numRange,
        negate,
        TMath
    )
}

const parseParam = (param: any): object => {
    let result

    try {
        result = eval(param)
    } catch (error) {
        try {
            result = JSON.parse(param)
        } catch (error) {
            result = parseTidyFunctionCall(param)
        }
    }

    return result
}

export const addItems: tidyFn = (data, parameters) => {
    let { itemsToAdd } = parameters
    itemsToAdd = parseParam(itemsToAdd)

    if (itemsToAdd) {
        return tidy(data, tidyjs.addItems(itemsToAdd))
    } else {
        throw new Error('itemsToAdd parameter is missing')
    }
}

export const addRows = addItems

export const sort: tidyFn = (data, parameters) => {
    let { comparators } = parameters
    comparators = parseParam(comparators)

    if (comparators) {
        return tidy(data, tidyjs.sort(comparators))
    } else {
        throw new Error('comparators parameter is missing')
    }
}

export const arrange = sort

export const complete: tidyFn = (data, parameters) => {
    let { expandKeys, replaceNullySpec } = parameters
    expandKeys = parseParam(expandKeys)
    replaceNullySpec = parseParam(replaceNullySpec)

    if (expandKeys && replaceNullySpec) {
        return tidy(data, tidyjs.complete(expandKeys, replaceNullySpec))
    } else {
        throw new Error('expandKeys or replaceNullySpec parameters are missing')
    }
}

export const count: tidyFn = (data, parameters) => {
    let { groupKeys, options } = parameters
    groupKeys = parseParam(groupKeys)
    options = parseParam(options)

    if (groupKeys && options) {
        return tidy(data, tidyjs.count(groupKeys, options))
    } else {
        throw new Error('groupKeys or options parameters are missing')
    }
}

export const debug: tidyFn = (data, parameters) => {
    let { label, options } = parameters
    label = parseParam(label)
    options = parseParam(options)

    return tidy(data, tidyjs.debug(label, options))
}

export const distinct: tidyFn = (data, parameters) => {
    let { keys } = parameters
    keys = parseParam(keys)

    if (keys) {
        return tidy(data, tidyjs.distinct(keys))
    } else {
        throw new Error('keys parameter is missing')
    }
}

export const expand: tidyFn = (data, parameters) => {
    let { expandKeys } = parameters
    expandKeys = parseParam(expandKeys)

    if (expandKeys) {
        return tidy(data, tidyjs.expand(expandKeys))
    } else {
        throw new Error('expandKeys parameter is missing')
    }
}

export const fill: tidyFn = (data, parameters) => {
    let { keys } = parameters
    keys = parseParam(keys)

    if (keys) {
        return tidy(data, tidyjs.fill(keys))
    } else {
        throw new Error('keys parameter is missing')
    }
}

export const filter: tidyFn = (data, parameters) => {
    let { filterFn } = parameters
    filterFn = parseParam(filterFn)

    if (filterFn) {
        return tidy(data, tidyjs.filter(filterFn))
    } else {
        throw new Error('filterFn parameter is missing')
    }
}

export const fullJoin: tidyFn = (data, parameters) => {
    let { itemsToJoin, options } = parameters
    itemsToJoin = parseParam(itemsToJoin)
    options = parseParam(options)

    if (itemsToJoin && options) {
        return tidy(data, tidyjs.fullJoin(itemsToJoin, options))
    } else {
        throw new Error('itemsToJoin or options parameters are missing')
    }
}

export const groupBy: tidyFn = (data, parameters) => {
    let { groupKeys, fns, options } = parameters
    groupKeys = parseParam(groupKeys)
    fns = parseParam(fns)
    options = parseParam(options)

    if (groupKeys && fns) {
        return tidy(data, tidyjs.groupBy(groupKeys, fns, options))
    } else {
        throw new Error('groupKeys or fns parameters are missing')
    }
}

export const innerJoin: tidyFn = (data, parameters) => {
    let { itemsToJoin, options } = parameters
    itemsToJoin = parseParam(itemsToJoin)
    options = parseParam(options)

    if (itemsToJoin && options) {
        return tidy(data, tidyjs.innerJoin(itemsToJoin, options))
    } else {
        throw new Error('itemsToJoin or options parameters are missing')
    }
}

export const leftJoin: tidyFn = (data, parameters) => {
    let { itemsToJoin, options } = parameters
    itemsToJoin = parseParam(itemsToJoin)
    options = parseParam(options)

    if (itemsToJoin && options) {
        return tidy(data, tidyjs.leftJoin(itemsToJoin, options))
    } else {
        throw new Error('itemsToJoin or options parameters are missing')
    }
}

export const map: tidyFn = (data, parameters) => {
    let { mapFn } = parameters
    mapFn = parseParam(mapFn)

    if (mapFn) {
        return tidy(data, tidyjs.map(mapFn))
    } else {
        throw new Error('mapFn parameter is missing')
    }
}

export const mutate: tidyFn = (data, parameters) => {
    let { mutateSpec } = parameters
    mutateSpec = parseParam(mutateSpec)

    if (mutateSpec) {
        return tidy(data, tidyjs.mutate(mutateSpec))
    } else {
        throw new Error('mutateSpec parameter is missing')
    }
}

export const mutateWithSummary: tidyFn = (data, parameters) => {
    let { mutateSummarySpec } = parameters
    mutateSummarySpec = parseParam(mutateSummarySpec)

    if (mutateSummarySpec) {
        return tidy(data, tidyjs.mutateWithSummary(mutateSummarySpec))
    } else {
        throw new Error('mutateSpec parameter is missing')
    }
}

export const rename: tidyFn = (data, parameters) => {
    let { renameSpec } = parameters
    renameSpec = parseParam(renameSpec)

    if (renameSpec) {
        return tidy(data, tidyjs.rename(renameSpec))
    } else {
        throw new Error('renameSpec parameter is missing')
    }
}

export const replaceNully: tidyFn = (data, parameters) => {
    let { replaceNullySpec } = parameters
    replaceNullySpec = parseParam(replaceNullySpec)

    if (replaceNullySpec) {
        return tidy(data, tidyjs.replaceNully(replaceNullySpec))
    } else {
        throw new Error('replaceNullySpec parameter is missing')
    }
}

export const select: tidyFn = async (data, parameters) => {
    let { selectKeys } = parameters
    selectKeys = parseParam(selectKeys)

    if (selectKeys) {
        return tidy(data, tidyjs.select(selectKeys))
    } else {
        throw new Error('selectKeys parameter is missing')
    }
}

export const pick = select

export const slice: tidyFn = (data, parameters) => {
    let { start, end } = parameters
    start = parseParam(start)
    end = parseParam(end)

    if (start && end) {
        return tidy(data, tidyjs.slice(start, end))
    } else {
        throw new Error('start or end parameters are missing')
    }
}

export const sliceHead: tidyFn = (data, parameters) => {
    let { n } = parameters
    n = parseParam(n)

    if (n) {
        return tidy(data, tidyjs.sliceHead(n))
    } else {
        throw new Error('n parameter is missing')
    }
}

export const sliceTail: tidyFn = (data, parameters) => {
    let { n } = parameters
    n = parseParam(n)

    if (n) {
        return tidy(data, tidyjs.sliceTail(n))
    } else {
        throw new Error('n parameter is missing')
    }
}

export const sliceMin: tidyFn = (data, parameters) => {
    let { n, orderBy } = parameters
    n = parseParam(n)
    orderBy = parseParam(orderBy)

    if (n && orderBy) {
        return tidy(data, tidyjs.sliceMin(n, orderBy))
    } else {
        throw new Error('n or orderBy parameters are missing')
    }
}

export const sliceMax: tidyFn = (data, parameters) => {
    let { n, orderBy } = parameters
    n = parseParam(n)
    orderBy = parseParam(orderBy)

    if (n && orderBy) {
        return tidy(data, tidyjs.sliceMax(n, orderBy))
    } else {
        throw new Error('n or orderBy parameters are missing')
    }
}

export const sliceSample: tidyFn = (data, parameters) => {
    let { n, options } = parameters
    n = parseParam(n)
    options = parseParam(options)

    if (n) {
        return tidy(data, tidyjs.sliceSample(n, options))
    } else {
        throw new Error('n parameter is missing')
    }
}

export const summarize: tidyFn = (data, parameters) => {
    let { summarizeSpec, options } = parameters
    summarizeSpec = parseParam(summarizeSpec)
    options = parseParam(options)

    if (summarizeSpec && options) {
        return tidy(data, tidyjs.summarize(summarizeSpec, options))
    } else {
        throw new Error('summarizeSpec or options parameters are missing')
    }
}

export const summarizeAll: tidyFn = (data, parameters) => {
    let { summaryFn } = parameters
    summaryFn = parseParam(summaryFn)

    if (summaryFn) {
        return tidy(data, tidyjs.summarizeAll(summaryFn))
    } else {
        throw new Error('summaryFn parameter is missing')
    }
}

export const summarizeAt: tidyFn = (data, parameters) => {
    let { keys, summaryFn } = parameters
    keys = parseParam(keys)
    summaryFn = parseParam(summaryFn)

    if (keys && summaryFn) {
        return tidy(data, tidyjs.summarizeAt(keys, summaryFn))
    } else {
        throw new Error('keys or summaryFn parameters are missing')
    }
}

export const summarizeIf: tidyFn = (data, parameters) => {
    let { predicateFn, summaryFn } = parameters
    predicateFn = parseParam(predicateFn)
    summaryFn = parseParam(summaryFn)

    if (predicateFn && summaryFn) {
        return tidy(data, tidyjs.summarizeIf(predicateFn, summaryFn))
    } else {
        throw new Error('predicateFn or summaryFn parameters are missing')
    }
}

export const tally: tidyFn = (data, parameters) => {
    let { options } = parameters
    options = parseParam(options)

    if (options) {
        return tidy(data, tidyjs.tally(options))
    } else {
        throw new Error('options parameter is missing')
    }
}

export const total: tidyFn = (data, parameters) => {
    let { summarizeSpec, mutateSpec } = parameters
    summarizeSpec = parseParam(summarizeSpec)
    mutateSpec = parseParam(mutateSpec)

    if (summarizeSpec && mutateSpec) {
        return tidy(data, tidyjs.total(summarizeSpec, mutateSpec))
    } else {
        throw new Error('summarizeSpec or mutateSpec parameters are missing')
    }
}

export const totalAll: tidyFn = (data, parameters) => {
    let { summaryFn, mutateSpec } = parameters
    summaryFn = parseParam(summaryFn)
    mutateSpec = parseParam(mutateSpec)

    if (summaryFn && mutateSpec) {
        return tidy(data, tidyjs.totalAll(summaryFn, mutateSpec))
    } else {
        throw new Error('summaryFn or mutateSpec parameters are missing')
    }
}

export const totalAt: tidyFn = (data, parameters) => {
    let { keys, summaryFn, mutateSpec } = parameters
    keys = parseParam(keys)
    summaryFn = parseParam(summaryFn)
    mutateSpec = parseParam(mutateSpec)

    if (keys && summaryFn && mutateSpec) {
        return tidy(data, tidyjs.totalAt(keys, summaryFn, mutateSpec))
    } else {
        throw new Error('keys or summaryFn or mutateSpec parameters are missing')
    }
}

export const totalIf: tidyFn = (data, parameters) => {
    let { predicateFn, summaryFn, mutateSpec } = parameters
    predicateFn = parseParam(predicateFn)
    summaryFn = parseParam(summaryFn)
    mutateSpec = parseParam(mutateSpec)

    if (predicateFn && summaryFn && mutateSpec) {
        return tidy(data, tidyjs.totalIf(predicateFn, summaryFn, mutateSpec))
    } else {
        throw new Error('predicateFn or summaryFn or mutateSpec parameters are missing')
    }
}

export const transmute: tidyFn = (data, parameters) => {
    let { mutateSpec } = parameters
    mutateSpec = parseParam(mutateSpec)

    if (mutateSpec) {
        return tidy(data, tidyjs.transmute(mutateSpec))
    } else {
        throw new Error('mutateSpec parameter is missing')
    }
}

export const when: tidyFn = (data, parameters) => {
    let { predicate, fns } = parameters
    predicate = parseParam(predicate)
    fns = parseParam(fns)

    if (predicate && fns) {
        return tidy(data, tidyjs.when(predicate, fns))
    } else {
        throw new Error('predicate or fns parameters are missing')
    }
}
