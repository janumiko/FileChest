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

export const removeTrailingSlash = (path) => {
    if (path.length === 0) {
        return path;
    }

    for (var i = path.length - 1; i >= 0; i--) {
        if (path.at(i) !== "/") {
            return path.slice(0, i + 1);
        }
    }

    return "";
}
