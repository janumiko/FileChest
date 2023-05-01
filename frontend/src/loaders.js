import {BACKEND_URL, removeTrailingSlash} from "./utils";


async function directoryLoader({request, params}) {
    const query_params = new URL(request.url).searchParams;

    let path = `${BACKEND_URL}/directory/${removeTrailingSlash(params["*"])}?${query_params.toString()}`;
    console.log('path', path);
    const response = await fetch(path);

    if (response.status !== 200) {
        throw {status: response.status, data: response.statusText};
    }

    return await response.json();
}


async function fileLoader({params}) {
    const fileLink = `${BACKEND_URL}/download/${removeTrailingSlash(params["*"])}`;
    const fileName = params["*"].split("/").pop()

    return await fetch(fileLink).then(res => res.blob()).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const doc = document.createElement('a');
        doc.href = url;
        doc.download = fileName;
        document.body.appendChild(doc);
        doc.click();
        doc.remove();
        window.URL.revokeObjectURL(url);
        return url;
    });
}

export {directoryLoader, fileLoader};