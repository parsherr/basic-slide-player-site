const url = 'slide.pdf';
let pdfDoc = null;
let currentPage = 1;
let startX;

pdfjsLib.getDocument(url).promise.then(function(pdf) {
    pdfDoc = pdf;
    renderPage(currentPage);
});

function renderPage(num) {
    pdfDoc.getPage(num).then(function(page) {
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
}

document.getElementById('prev-button').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});

document.getElementById('next-button').addEventListener('click', function() {
    if (currentPage < pdfDoc.numPages) {
        currentPage++;
        renderPage(currentPage);
    }
});

document.getElementById('fullscreen-button').addEventListener('click', function() {
    if (pdfViewer.requestFullscreen) {
        pdfViewer.requestFullscreen();
    } else if (pdfViewer.mozRequestFullScreen) { // Firefox
        pdfViewer.mozRequestFullScreen();
    } else if (pdfViewer.webkitRequestFullscreen) { // Chrome, Safari ve Opera
        pdfViewer.webkitRequestFullscreen();
    } else if (pdfViewer.msRequestFullscreen) { // IE/Edge
        pdfViewer.msRequestFullscreen();
    }
});

// Dokunmatik kontrolleri kaldırıyorum
// canvas.addEventListener('mousedown', function(event) {
//     startX = event.clientX;
// });
// 
// canvas.addEventListener('mousemove', function(event) {
//     if (startX) {
//         event.preventDefault();
//     }
// });
// 
// canvas.addEventListener('mouseup', function(event) {
//     const endX = event.clientX;
//     if (startX > endX + 50) {
//         // Sağdan sola kaydırma
//         if (currentPage < pdfDoc.numPages) {
//             currentPage++;
//             renderPage(currentPage);
//         }
//     } else if (startX < endX - 50) {
//         // Soldan sağa kaydırma
//         if (currentPage > 1) {
//             currentPage--;
//             renderPage(currentPage);
//         }
//     }
// });

canvas.addEventListener('click', function() {
    setTimeout(() => {
        if (currentPage < pdfDoc.numPages) {
            currentPage++;
        } else {
            currentPage = 1; // Son sayfadan sonra ilk sayfaya dön
        }
        renderPage(currentPage);
    }, 300);
}); 