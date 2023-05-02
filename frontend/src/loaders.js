import {BACKEND_URL} from "./utils";


async function directoryLoader({request, params}) {
    const query_params = new URL(request.url).searchParams;

    let path = `${BACKEND_URL}/directory/${params["*"]}?${query_params.toString()}`;

    const response = await fetch(path, {credentials: "include"});

    if (response.status !== 200) {
        throw {status: response.status, data: response.statusText};
    }

    return await response.json();
}

export {directoryLoader};