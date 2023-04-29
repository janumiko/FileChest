import {
    faFilePdf,
    faFileCode,
    faFileWord,
    faFileExcel,
    faFilePowerpoint,
    faFileImage,
    faFileAudio,
    faFileVideo,
    faFileArchive,
    faFileAlt,
    faFileCsv,
    faFileLines,
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

export const removeTrailingSlash = (path) => 
{
    while (path.at(-1) === "/") {
        path = path.slice(0, -1);
    }
    return path;
}