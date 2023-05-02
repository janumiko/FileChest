import {
    faFileAlt,
    faFileArchive,
    faFileAudio,
    faFileCode,
    faFileCsv,
    faFileExcel,
    faFileImage,
    faFilePdf,
    faFilePowerpoint,
    faFileVideo,
    faFileWord,
} from "@fortawesome/free-solid-svg-icons";


export const iconClassByExtension = {
    pdf: faFilePdf,
    tex: faFileCode,
    doc: faFileWord,
    docx: faFileWord,
    xls: faFileExcel,
    xlsx: faFileExcel,
    ppt: faFilePowerpoint,
    pptx: faFilePowerpoint,
    jpg: faFileImage,
    jpeg: faFileImage,
    png: faFileImage,
    gif: faFileImage,
    mp3: faFileAudio,
    mp4: faFileVideo,
    zip: faFileArchive,
    rar: faFileArchive,
    gz: faFileArchive,
    tar: faFileArchive,
    txt: faFileAlt,
    csv: faFileCsv,
    py: faFileCode,
    js: faFileCode,
    jsx: faFileCode,
    ts: faFileCode,
    tsx: faFileCode,
    html: faFileCode,
    css: faFileCode,
    json: faFileCode,
    md: faFileCode,
    yml: faFileCode,
    yaml: faFileCode,
    sql: faFileCode,
    sh: faFileCode,
    bat: faFileCode,
};

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export async function downloadFile(link, name) {
    const path = `${BACKEND_URL}${link}`
    const response = await fetch(path, {credentials: "include"});

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

export const BACKEND_URL = 'http://localhost:8000';