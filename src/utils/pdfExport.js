import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const COLORS = {
    foundational: [37, 99, 235],   // blue
    active_development: [22, 163, 74],   // green
    emerging: [124, 58, 237],   // purple
};

const LABELS = {
    foundational: 'Research Already Done',
    active_development: 'Ongoing Research',
    emerging: 'Future Scope',
};

function addCategorySection(doc, topic, category, startY, useTable = false) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const contentW = pageWidth - margin * 2;
    const accent = COLORS[category.category] || [99, 102, 241];
    let y = startY;

    // ── Section heading bar
    doc.setFillColor(...accent);
    doc.rect(margin, y, contentW, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(LABELS[category.category] || category.label, margin + 4, y + 7);
    y += 16;

    // ── Overview bullets
    if (category.overview && category.overview.length > 0) {
        doc.setTextColor(...accent);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Key Insights', margin, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40, 40, 40);
        category.overview.forEach((bullet) => {
            const lines = doc.splitTextToSize(`• ${bullet}`, contentW - 4);
            if (y + lines.length * 4.5 > 280) { doc.addPage(); y = margin; }
            doc.text(lines, margin + 2, y);
            y += lines.length * 4.5 + 1.5;
        });
        y += 4;
    }

    // ── Papers
    if (category.papers && category.papers.length > 0) {
        if (y + 14 > 280) { doc.addPage(); y = margin; }
        doc.setTextColor(...accent);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');

        if (useTable) {
            doc.text('Referenced Papers (Literature Review)', margin, y);
            y += 5;

            const tableBody = category.papers.map((paper, idx) => {
                const authorYear = `${paper.authors || 'Unknown'} ${paper.year ? `(${paper.year})` : ''}`;
                const summary = paper.summary || 'N/A';
                const link = paper.url || 'No Link Available';
                return [
                    (idx + 1).toString(),
                    paper.paper_title,
                    authorYear,
                    summary,
                    link
                ];
            });

            autoTable(doc, {
                startY: y,
                head: [['#', 'Title', 'Authors & Year', 'Key Findings / Summary', 'Link']],
                body: tableBody,
                theme: 'grid',
                headStyles: {
                    fillColor: accent,
                    textColor: [255, 255, 255],
                    fontStyle: 'bold'
                },
                bodyStyles: {
                    fontSize: 8,
                    cellPadding: 3
                },
                columnStyles: {
                    0: { cellWidth: 10 },
                    1: { cellWidth: 40 },
                    2: { cellWidth: 35 },
                    3: { cellWidth: 'auto' },
                    4: { cellWidth: 30 }
                },
                didDrawCell: function (data) {
                    if (data.section === 'body' && data.column.index === 4) {
                        const cellText = data.cell.raw;
                        if (cellText && cellText !== 'No Link Available') {
                            const x = data.cell.x;
                            const y = data.cell.y;
                            const w = data.cell.width;
                            const h = data.cell.height;

                            // Paint white background over default text
                            doc.setFillColor(255, 255, 255);
                            doc.rect(x + 1, y + 1, w - 2, h - 2, 'F');

                            // Draw the text
                            doc.setTextColor(37, 99, 235);
                            doc.setFont('helvetica', 'bold');
                            doc.text('View PDF ↗', x + 2, y + 5);

                            // Add invisible clickable link area
                            try {
                                doc.link(x + 1, y + 1, w - 2, h - 2, { url: cellText });
                            } catch (e) {
                                console.error('Error adding PDF link:', e);
                            }
                        }
                    }
                }
            });

            y = (doc.lastAutoTable && doc.lastAutoTable.finalY) ? doc.lastAutoTable.finalY + 10 : y + 20;
        } else {
            doc.text('Referenced Papers', margin, y);
            y += 5;
            category.papers.forEach((paper, idx) => {
                if (y + 22 > 280) { doc.addPage(); y = margin; }
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(20, 20, 20);
                const titleLines = doc.splitTextToSize(`${idx + 1}. ${paper.paper_title}`, contentW - 4);
                doc.text(titleLines, margin + 2, y);
                y += titleLines.length * 4.5;
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 100, 100);
                doc.setFontSize(8.5);
                const meta = [paper.year, paper.authors].filter(Boolean).join(' · ');
                if (meta) { doc.text(meta, margin + 4, y); y += 4; }
                if (paper.summary) {
                    doc.setTextColor(60, 60, 60);
                    const sLines = doc.splitTextToSize(paper.summary, contentW - 4);
                    doc.text(sLines, margin + 4, y);
                    y += sLines.length * 4 + 1;
                }
                if (paper.url) {
                    doc.setTextColor(...accent);
                    doc.textWithLink('View paper ↗', margin + 4, y, { url: paper.url });
                    y += 4;
                }
                y += 3;
            });
        }
    }

    return y + 8; // return next Y position
}

/** Export ALL 3 categories in one PDF */
export function exportAllCategoriesPDF(topic, categories) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;

    // Cover header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 36, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Smart Research Report', margin, 14);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Topic: ${topic}`, margin, 22);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, 29);

    let y = 44;
    categories.forEach((cat, i) => {
        if (i > 0 && y > 60) { doc.addPage(); y = 15; }
        y = addCategorySection(doc, topic, cat, y, true);
    });

    const safeName = topic.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(`${safeName}_full_report.pdf`);
}

/** Export a SINGLE category detail page */
export function exportCategoryPDF(topic, category) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const accent = COLORS[category.category] || [99, 102, 241];

    // Header
    doc.setFillColor(...accent);
    doc.rect(0, 0, pageWidth, 32, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(LABELS[category.category] || category.label, margin, 14);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Topic: ${topic}`, margin, 22);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, 28);

    addCategorySection(doc, topic, category, 40, false);
    const safeName = topic.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(`${safeName}_${category.category}.pdf`);
}
