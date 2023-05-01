import {BACKEND_URL, removeTrailingSlash} from "./utils";


async function directoryLoader({request, params}) {
    const query_params = new URL(request.url).searchParams;

    let path = `${BACKEND_URL}/directory/${removeTrailingSlash(params["*"])}?${query_params.toString()}`;

    const response = await fetch(path);

    if (response.status !== 200) {
        throw {status: response.status, data: response.statusText};
    }

    return await response.json();
}


async function fileLoader({params}) {
    const path = `${BACKEND_URL}/download/${removeTrailingSlash(params["*"])}`;
    const name = params["*"].split("/").pop()

    const response = await fetch(path);

    if (response.status !== 200) {
        throw {status: response.status, data: response.statusText};
    }

    await response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const doc = document.createElement('a');
        doc.href = url;
        doc.download = name;
        document.body.appendChild(doc);
        doc.click();
        doc.remove();
        window.URL.revokeObjectURL(url);
    });

    return null;
}

export {directoryLoader, fileLoader};