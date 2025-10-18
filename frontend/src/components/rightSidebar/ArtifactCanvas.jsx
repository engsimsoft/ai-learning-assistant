/**
 * ArtifactCanvas Component (Canvas MVP + Artifact System)
 * - Modes: markdown, code, images, plot, calculator
 * - Features:
 *   - Markdown: editor + preview
 *   - Code: HTML/CSS/JS editors + sandboxed iframe preview
 *   - Images: paste/upload preview, prepare for backend save
 *   - Plot: Interactive charts with Plotly.js
 *   - Calculator: Math calculations with Math.js
 * - Integrations:
 *   - Listens to window event "canvas:add" with detail:
 *     { type: 'markdown'|'code'|'images'|'plot'|'calculator', title?, config?, ... }
 *   - Save to backend: POST /artifacts
 */

import { useEffect, useRef, useState } from 'react';
import { API_URL } from '../../config';
import InteractivePlot from '../artifacts/InteractivePlot';
import Calculator from '../artifacts/Calculator';
import { getTemplatesByCategory, getTemplateConfig } from '../../templates/artifactTemplates';
import './ArtifactCanvas.css';

const MODES = ['markdown', 'code', 'images', 'plot', 'calculator'];

function buildHtmlDoc(html, css, js) {
  // Minimal assembly of HTML document for iframe srcdoc (no external deps)
  // NOTE: MVP — полноценный санитайзинг добавить следующим шагом (DOMPurify или серверная очистка).
  const safeHtml = html || '';
  const safeCss = css || '';
  const safeJs = js || '';
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Canvas Preview</title>
<style>
  html, body { margin: 0; padding: 12px; font-family: sans-serif; }
  ${safeCss}
</style>
</head>
<body>
${safeHtml}
<script>
${safeJs}
</script>
</body>
</html>`;
}

export default function ArtifactCanvas() {
  const [mode, setMode] = useState('markdown');

  // Common fields
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('canvas');
  const [tags, setTags] = useState([]);

  // Markdown
  const [markdown, setMarkdown] = useState('# Canvas\n\nНапишите здесь ваши заметки или описание демонстрации.');

  // Code editors
  const [html, setHtml] = useState('<button id="btn">Click me</button>\n<div id="out"></div>');
  const [css, setCss] = useState('#btn { padding: 8px 12px; }\n#out { margin-top: 12px; color: #2563eb; }');
  const [js, setJs] = useState(`document.getElementById('btn').addEventListener('click', () => {
  const out = document.getElementById('out');
  out.textContent = 'Clicked at ' + new Date().toLocaleTimeString();
});`);
  const [srcDoc, setSrcDoc] = useState('');

  // Images
  const [images, setImages] = useState([]);

  // Plot config (for InteractivePlot)
  const [plotConfig, setPlotConfig] = useState({
    title: 'Sample Chart: y = x²',
    data: [{
      x: [0, 1, 2, 3, 4, 5],
      y: [0, 1, 4, 9, 16, 25],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'y = x²',
      line: { color: '#667eea' }
    }],
    layout: {
      title: 'Sample Chart: y = x²',
      xaxis: { title: 'X' },
      yaxis: { title: 'Y' }
    }
  });

  // Calculator config (for Calculator component)
  const [calculatorConfig, setCalculatorConfig] = useState({
    inputs: [
      {
        name: 'a',
        label: 'Value A',
        min: 0,
        max: 100,
        default: 10,
        step: 1,
        unit: ''
      },
      {
        name: 'b',
        label: 'Value B',
        min: 0,
        max: 100,
        default: 20,
        step: 1,
        unit: ''
      }
    ],
    formulas: [
      {
        name: 'sum',
        expression: 'a + b',
        label: 'Sum (a + b)',
        unit: ''
      },
      {
        name: 'product',
        expression: 'a * b',
        label: 'Product (a × b)',
        unit: ''
      },
      {
        name: 'power',
        expression: 'a^2 + b^2',
        label: 'Sum of squares (a² + b²)',
        unit: ''
      }
    ]
  });

  // UI state
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState(null); // { ok: boolean, id?: string, error?: string }

  const iframeRef = useRef(null);

  // Handle external "Send to Canvas" / "Open in Canvas" events
  useEffect(() => {
    const handler = (evt) => {
      const custom = evt; // CustomEvent expected
      const detail = custom?.detail;
      if (!detail || !detail.type) return;

      setMode(detail.type);
      if (detail.title) setTitle(detail.title);
      if (detail.source) setSource(detail.source);
      if (detail.tags) setTags(detail.tags);

      if (detail.type === 'markdown' && detail.markdown) {
        setMarkdown(detail.markdown);
      } else if (detail.type === 'code') {
        if (detail.html) setHtml(detail.html);
      } else if (detail.type === 'images' && Array.isArray(detail.images) && detail.images.length) {
        setImages((prev) => [...prev, ...detail.images]);
      }
    };

    window.addEventListener('canvas:add', handler);
    return () => window.removeEventListener('canvas:add', handler);
  }, []);

  // Paste handler (mainly for Images mode)
  useEffect(() => {
    const handlePaste = (e) => {
      if (mode !== 'images') return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (it.type && it.type.startsWith('image/')) {
          e.preventDefault();
          const file = it.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const base64 = event?.target?.result;
              if (typeof base64 === 'string') {
                setImages((prev) => [...prev, base64]);
              }
            };
            reader.readAsDataURL(file);
          }
        }
      }
    };
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [mode]);

  const onUploadImages = (files) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e?.target?.result;
        if (typeof base64 === 'string') {
          setImages((prev) => [...prev, base64]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRun = () => {
    if (mode !== 'code') return;
    // Build srcdoc for iframe
    const doc = buildHtmlDoc(html, css, js);
    setSrcDoc(doc);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = doc;
    }
  };

  const normalizeTitle = () => {
    if (title && title.trim()) return title.trim();
    if (mode === 'markdown') {
      const firstLine = (markdown || '').split('\n')[0].replace(/^#\s*/, '').trim();
      if (firstLine) return firstLine;
    }
    return `Canvas Artifact (${new Date().toLocaleString()})`;
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveResult(null);
      const payload = {
        title: normalizeTitle(),
        type: mode,
        source,
        tags
      };

      if (mode === 'markdown') {
        payload.content_markdown = markdown;
      } else if (mode === 'code') {
        payload.content_markdown = markdown && markdown.trim().length > 0 ? markdown : 'Code artifact';
        payload.html = buildHtmlDoc(html, css, js);
      } else if (mode === 'images') {
        payload.content_markdown = 'Images artifact';
        payload.images = images;
      }

      const res = await fetch(`${API_URL}/artifacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Save failed');
      }

      const data = await res.json();
      setSaveResult({ ok: true, id: data.id });
    } catch (e) {
      setSaveResult({ ok: false, error: String(e && e.message ? e.message : e) });
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    if (mode === 'markdown') {
      setMarkdown('');
    } else if (mode === 'code') {
      setHtml('');
      setCss('');
      setJs('');
      setSrcDoc('');
    } else if (mode === 'images') {
      setImages([]);
    }
  };

  const renderToolbar = () => (
    <div className="canvas-toolbar">
      <div className="canvas-left">
        <input
          className="canvas-title"
          placeholder="Название артефакта (опционально)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="canvas-source"
          placeholder="Источник (lesson/chat/canvas)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          className="canvas-tags"
          placeholder="Теги (через запятую)"
          value={tags.join(', ')}
          onChange={(e) =>
            setTags(
              (e.target.value || '')
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
        />
      </div>
      <div className="canvas-right">
        {mode === 'code' && (
          <button className="btn-run" onClick={handleRun} title="Run code in sandbox">
            ▶ Run
          </button>
        )}
        <button className="btn-clear" onClick={handleClear}>Clear</button>
        <button className="btn-save" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save Artifact'}
        </button>
      </div>
    </div>
  );

  const renderTabs = () => {
    const tabLabels = {
      markdown: 'Markdown',
      code: 'Code',
      images: 'Images',
      plot: 'Plot',
      calculator: 'Calculator'
    };

    // Get templates for current mode
    const templates = mode === 'plot'
      ? getTemplatesByCategory('plots')
      : mode === 'calculator'
      ? getTemplatesByCategory('calculators')
      : [];

    const handleTemplateSelect = (templateId) => {
      const config = getTemplateConfig(templateId);
      if (!config) return;

      if (mode === 'plot') {
        setPlotConfig(config);
      } else if (mode === 'calculator') {
        setCalculatorConfig(config);
      }
    };

    return (
      <div className="canvas-tabs">
        {MODES.map((m) => (
          <button
            key={m}
            className={`canvas-tab ${mode === m ? 'active' : ''}`}
            onClick={() => setMode(m)}
          >
            {tabLabels[m]}
          </button>
        ))}

        {templates.length > 0 && (
          <div className="canvas-template-selector">
            <label htmlFor="template-select" style={{ fontSize: '12px', color: '#999' }}>
              Template:
            </label>
            <select
              id="template-select"
              className="canvas-template-dropdown"
              onChange={(e) => handleTemplateSelect(e.target.value)}
              defaultValue=""
            >
              <option value="">Choose template...</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  const renderMarkdown = () => (
    <div className="canvas-split">
      <textarea
        className="canvas-textarea"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Markdown..."
      />
      <div className="canvas-preview">
        {/* Simple markdown preview (MVP): preserve line breaks */}
        <div style={{ whiteSpace: 'pre-wrap' }}>{markdown}</div>
      </div>
    </div>
  );

  const renderCode = () => (
    <div className="canvas-code-grid">
      <div className="canvas-code-editors">
        <label className="canvas-code-label">HTML</label>
        <textarea className="canvas-textarea code" value={html} onChange={(e) => setHtml(e.target.value)} />

        <label className="canvas-code-label">CSS</label>
        <textarea className="canvas-textarea code" value={css} onChange={(e) => setCss(e.target.value)} />

        <label className="canvas-code-label">JS</label>
        <textarea className="canvas-textarea code" value={js} onChange={(e) => setJs(e.target.value)} />
      </div>
      <div className="canvas-preview">
        <iframe
          ref={iframeRef}
          className="canvas-iframe"
          sandbox="allow-scripts allow-modals"
          srcDoc={srcDoc}
          title="Canvas Preview"
        />
      </div>
    </div>
  );

  const renderImages = () => (
    <div className="canvas-images">
      <div className="canvas-images-actions">
        <label className="btn-upload">
          Upload Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => onUploadImages(e.target.files)}
            style={{ display: 'none' }}
          />
        </label>
        <span className="hint">или вставьте изображение из буфера Ctrl+V / Cmd+V</span>
      </div>
      {images.length > 0 ? (
        <div className="canvas-image-grid">
          {images.map((img, i) => (
            <div key={i} className="canvas-image-item">
              <img src={img} alt={`img-${i}`} />
              <button className="remove" onClick={() => removeImage(i)}>×</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="canvas-images-empty">Нет изображений</div>
      )}
    </div>
  );

  return (
    <div className="artifact-canvas">
      {renderTabs()}
      {renderToolbar()}

      {mode === 'markdown' && renderMarkdown()}
      {mode === 'code' && renderCode()}
      {mode === 'images' && renderImages()}
      {mode === 'plot' && (
        <InteractivePlot
          config={plotConfig}
          onUpdate={setPlotConfig}
        />
      )}
      {mode === 'calculator' && (
        <Calculator
          config={calculatorConfig}
          onUpdate={setCalculatorConfig}
        />
      )}

      {saveResult && (
        <div className={`save-result ${saveResult.ok ? 'ok' : 'err'}`}>
          {saveResult.ok
            ? `Сохранено: id=${saveResult.id}`
            : `Ошибка сохранения: ${saveResult.error}`}
        </div>
      )}
    </div>
  );
}