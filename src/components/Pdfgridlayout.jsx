import { useState, useEffect, useRef } from "react";

const ROWS = 3;
const COLS = 2;
const TOTAL_CELLS = ROWS * COLS;

function cellKey(row, col) {
  return `${row}-${col}`;
}

function buildEmptyPage() {
  return { images: {} };
}

function buildPageFromDefaults(defaults = []) {
  const page = buildEmptyPage();
  
  defaults.forEach(({ url, row, col }) => {
    if (row >= 1 && row <= ROWS && col >= 1 && col <= COLS) {
      page.images[cellKey(row, col)] = { id: crypto.randomUUID(), url };
    }
  });
  return page;
}

// ─── GridCell ────────────────────────────────────────────────────────────────

function GridCell({ row, col, imageData, onImageDrop, onImageClick, onRemove }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => onImageDrop(row, col, ev.target.result);
      reader.readAsDataURL(file);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => onImageDrop(row, col, ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`grid-cell ${dragging ? "drag-over" : ""} ${imageData ? "has-image" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !imageData && inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />

      {imageData ? (
        <div className="cell-preview">
          <img
            src={imageData.url}
            alt={`Celda ${row},${col}`}
            onClick={(e) => { e.stopPropagation(); onImageClick(imageData.url); }}
          />
          <button className="cell-remove-btn" onClick={(e) => { e.stopPropagation(); onRemove(row, col); }} title="Eliminar imagen">✕</button>
          <button className="cell-change-btn" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }} title="Cambiar imagen">✎</button>
        </div>
      ) : (
        <div className="cell-empty">
          <span className="cell-icon">⊞</span>
          <span className="cell-label">F{row} · C{col}</span>
          <span className="cell-hint">clic o arrastra</span>
        </div>
      )}
    </div>
  );
}

// ─── PageSheet ───────────────────────────────────────────────────────────────

function PageSheet({ pageIndex, pageData, totalPages, onImageDrop, onRemoveImage, onRemovePage }) {
  const [lightbox, setLightbox] = useState(null);
  const filled = Object.keys(pageData.images).length;

  const cells = [];
  for (let r = 1; r <= ROWS; r++) {
    for (let c = 1; c <= COLS; c++) {
      const key = cellKey(r, c);
      cells.push(
        <GridCell
          key={key}
          row={r}
          col={c}
          imageData={pageData.images[key] || null}
          onImageDrop={(row, col, url) => onImageDrop(pageIndex, row, col, url)}
          onImageClick={setLightbox}
          onRemove={(row, col) => onRemoveImage(pageIndex, row, col)}
        />
      );
    }
  }

  return (
    <div className="page-wrapper">
      <div className="page-meta">
        <div className="page-meta-left">
          <span className="page-number">Hoja {pageIndex + 1}</span>
          <span className="page-fill">{filled}/{TOTAL_CELLS} imágenes</span>
        </div>
        {totalPages > 1 && (
          <button className="page-delete-btn" onClick={() => onRemovePage(pageIndex)} title="Eliminar hoja">
            <span>✕</span> Eliminar hoja
          </button>
        )}
      </div>

      <div className="page-sheet">
        <div className="sheet-grid">{cells}</div>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Vista ampliada" />
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * PdfGridLayout
 *
 * Props:
 *   defaultPages?: Array<Array<{ url: string, row: number, col: number }>>
 *
 * Example:
 *   <PdfGridLayout
 *     defaultPages={[
 *       [{ url: "https://...", row: 1, col: 1 }],
 *       [{ url: "https://...", row: 2, col: 2 }],
 *     ]}
 *   />
 */
export default function PdfGridLayout({ title = 'Filmer', defaultPages = [] }) {
  const [pages, setPages] = useState([buildEmptyPage()])

  // Sincroniza cuando defaultPages llega de forma asíncrona (API / useEffect del padre)
  useEffect(() => {

    const handlePages = (params) => setPages(params)

    if (defaultPages && defaultPages.length > 0) {
      handlePages(defaultPages.map(buildPageFromDefaults));
    }
  }, [defaultPages]);

  const addPage = () => setPages((prev) => [...prev, buildEmptyPage()]);

  const removePage = (idx) => {
    if (pages.length === 1) return;
    setPages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleImageDrop = (pageIdx, row, col, url) => {
    setPages((prev) =>
      prev.map((page, i) =>
        i !== pageIdx ? page : {
          ...page,
          images: { ...page.images, [cellKey(row, col)]: { id: crypto.randomUUID(), url } },
        }
      )
    );
  };

  const handleRemoveImage = (pageIdx, row, col) => {
    setPages((prev) =>
      prev.map((page, i) => {
        if (i !== pageIdx) return page;
        const next = { ...page.images };
        delete next[cellKey(row, col)];
        return { ...page, images: next };
      })
    );
  };



  return (
    <>
      <style>{CSS}</style>
      <div className="pdf-grid-root">
        <header className="toolbar">
          <span className="toolbar-title">
            {title}
            <span className="toolbar-count">{pages.length} {pages.length === 1 ? "hoja" : "hojas"}</span>
          </span>
          <button className="add-btn" onClick={addPage}>+ Nueva hoja</button>
        </header>

        <div className="pages-list">
          {pages.map((page, idx) => (
            <PageSheet
              key={idx}
              pageIndex={idx}
              pageData={page}
              totalPages={pages.length}
              onImageDrop={handleImageDrop}
              onRemoveImage={handleRemoveImage}
              onRemovePage={removePage}
            />
          ))}

          <button className="add-page-bottom" onClick={addPage}>
            <span className="add-page-icon">+</span>
            <span>Agregar nueva hoja</span>
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pdf-grid-root {
    --bg: #eceae5;
    --surface: #f5f3ef;
    --card: #ffffff;
    --border: #d8d4cc;
    --border-light: #e8e4dc;
    --accent: #1a46d4;
    --accent-light: #dce6ff;
    --danger: #d93025;
    --danger-light: #fde8e6;
    --text: #18160f;
    --muted: #7a7770;
    --shadow-sheet: 0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06);

    /*font-family: 'DM Sans', sans-serif;*/
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: var(--text);
    box-shadow: 0 1px 8px rgba(0,0,0,0.06);
    margin-bottom: 10px;
  }

  /* ── Toolbar ── */
  .toolbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--card);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 32px;
    box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  }
  .toolbar-title {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -.01em;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .toolbar-count {
    font-size: 12px;
    font-weight: 500;
    color: var(--muted);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2px 10px;
    font-family: 'DM Mono', monospace;
  }
  .add-btn {
    padding: 8px 18px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background .15s, transform .1s;
  }
  .add-btn:hover { background: #1338b0; }
  .add-btn:active { transform: scale(.97); }

  /* ── Pages list ── */
  .pages-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36px 24px 60px;
  }

  /* ── Page wrapper ── */
  .page-wrapper {
    width: 100%;
    max-width: 620px;
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;
  }

  .page-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2px 10px;
  }
  .page-meta-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .page-number {
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
  }
  .page-fill {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    background: var(--surface);
    border: 1px solid var(--border-light);
    border-radius: 20px;
    padding: 2px 9px;
  }

  .page-delete-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border: 1.5px solid var(--border);
    border-radius: 7px;
    background: transparent;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all .15s;
  }
  .page-delete-btn:hover {
    border-color: var(--danger);
    color: var(--danger);
    background: var(--danger-light);
  }

  .page-sheet {
    background: var(--card);
    border-radius: 10px;
    box-shadow: var(--shadow-sheet);
    overflow: hidden;
    border: 1px solid var(--border-light);
    aspect-ratio: 210 / 297;
    display: flex;
    flex-direction: column;
  }

  .sheet-grid {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 1fr);
    gap: 1px;
    background: var(--border-light);
    min-height: 0;
  }

  /* ── Grid Cell ── */
  .grid-cell {
    background: var(--surface);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: background .12s;
  }
  .grid-cell:hover { background: var(--accent-light); }
  .grid-cell.drag-over {
    background: var(--accent-light);
    outline: 3px dashed var(--accent);
    outline-offset: -3px;
  }
  .grid-cell.has-image { cursor: default; }

  .cell-empty {
    width: 100%; height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 12px;
    user-select: none;
  }
  .cell-icon { font-size: 20px; color: var(--border); transition: color .12s; }
  .grid-cell:hover .cell-icon { color: var(--accent); }
  .cell-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--muted);
  }
  .cell-hint { font-size: 10px; color: var(--border); transition: color .12s; }
  .grid-cell:hover .cell-hint { color: var(--accent); }

  .cell-preview { width: 100%; height: 100%; position: relative; }
  .cell-preview img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    cursor: zoom-in;
  }

  .cell-remove-btn, .cell-change-btn {
    position: absolute;
    top: 6px;
    border: none;
    border-radius: 6px;
    width: 26px; height: 26px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .15s;
    line-height: 1;
  }
  .cell-preview:hover .cell-remove-btn,
  .cell-preview:hover .cell-change-btn { opacity: 1; }
  .cell-remove-btn { right: 6px; background: var(--danger); color: #fff; }
  .cell-remove-btn:hover { background: #b52119; }
  .cell-change-btn { right: 38px; background: rgba(0,0,0,.52); color: #fff; }
  .cell-change-btn:hover { background: rgba(0,0,0,.72); }

  /* ── Add page bottom ── */
  .add-page-bottom {
    width: 100%;
    max-width: 620px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 18px;
    border: 2px dashed var(--border);
    border-radius: 10px;
    background: transparent;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all .15s;
  }
  .add-page-bottom:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-light);
  }
  .add-page-icon {
    width: 26px; height: 26px;
    border-radius: 50%;
    background: var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 1;
    transition: background .15s, color .15s;
  }
  .add-page-bottom:hover .add-page-icon { background: var(--accent); color: #fff; }

  /* ── Lightbox ── */
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.88);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    cursor: zoom-out;
    padding: 24px;
  }
  .lightbox img {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0,0,0,.5);
    object-fit: contain;
  }
  .lightbox-close {
    position: absolute;
    top: 20px; right: 24px;
    background: rgba(255,255,255,.15);
    border: none;
    color: #fff;
    font-size: 18px;
    width: 38px; height: 38px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .15s;
  }
  .lightbox-close:hover { background: rgba(255,255,255,.28); }
`;