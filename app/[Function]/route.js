import * as tidy from '../../tidy.js'

const parseBody = (body) => {
    try {
        const json = JSON.parse(body)
        if (Array.isArray(json)) {
            return json
        }
    } catch (error) {
        throw new Error("Body must be a JSON array");

    }

    return result
}

export async function GET(request, { params }) {
    // const { Function } = params
    // redirect(`/post/${id}`)

}

export async function POST(request, { params }) {
    const reqUrl = request.url
    const { searchParams } = new URL(reqUrl)
    const parameters = Object.fromEntries(searchParams)


    const { Function } = params
    const body = await request.json();
    const response = tidy[Function](body, parameters)

    return Response.json(response)
}