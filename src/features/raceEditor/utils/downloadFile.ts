function triggerDownload(filename: string, blob: Blob): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    // Defer cleanup: some browsers (WebKit) cancel the download if the object
    // URL is revoked in the same tick as the click.
    setTimeout(() => {
        anchor.remove();
        URL.revokeObjectURL(url);
    }, 0);
}

export function downloadText(filename: string, text: string): void {
    triggerDownload(filename, new Blob([text], { type: 'text/plain;charset=utf-8' }));
}
