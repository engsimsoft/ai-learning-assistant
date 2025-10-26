/**
 * ArtifactViewer Component
 * Clean viewer for artifacts (like Claude.ai)
 * - Shows title and artifact content
 * - [</>] button to toggle code view
 * - No tabs, no editing, no save buttons
 */
import { useState } from 'react';
import InteractivePlot from '../artifacts/InteractivePlot';
import Calculator from '../artifacts/Calculator';
import ReactArtifact from '../artifacts/ReactArtifact';
import './ArtifactViewer.css';

export default function ArtifactViewer({
  artifact,
  onClose,
  showLessonButton = false
}) {
  const [showCode, setShowCode] = useState(false);

  const handleShowLesson = () => {
    window.dispatchEvent(new CustomEvent('center:showLesson'));
  };

  const toggleCode = () => {
    setShowCode(!showCode);
  };

  // Render artifact content based on type
  const renderArtifactContent = () => {
    if (!artifact || !artifact.type) {
      return <div className="artifact-empty">No artifact loaded</div>;
    }

    const { type, config, html, markdown, images } = artifact;

    switch (type) {
      case 'plot':
        return config ? (
          <InteractivePlot
            config={config}
            onUpdate={() => {}} // Read-only
          />
        ) : (
          <div className="artifact-empty">No plot data available</div>
        );

      case 'calculator':
        return config ? (
          <Calculator
            config={config}
            onUpdate={() => {}} // Read-only
          />
        ) : (
          <div className="artifact-empty">No calculator data available</div>
        );

      case 'code':
        return html ? (
          <iframe
            className="artifact-code-iframe"
            srcDoc={html}
            sandbox="allow-scripts"
            title="Artifact Preview"
          />
        ) : (
          <div className="artifact-empty">No HTML content available</div>
        );

      case 'markdown':
        return markdown ? (
          <div className="artifact-markdown" style={{ padding: '20px', whiteSpace: 'pre-wrap' }}>
            {markdown}
          </div>
        ) : (
          <div className="artifact-empty">No markdown content available</div>
        );

      case 'images':
        return images && images.length > 0 ? (
          <div className="artifact-images">
            {images.map((img, idx) => (
              <img key={idx} src={img} alt={`Artifact ${idx}`} style={{ maxWidth: '100%' }} />
            ))}
          </div>
        ) : (
          <div className="artifact-empty">No images available</div>
        );

      case 'react-component':
        return config ? (
          <ReactArtifact
            componentId={config.id}
            props={config.props || {}}
          />
        ) : (
          <div className="artifact-empty">No React component configuration available</div>
        );

      default:
        return <div className="artifact-empty">Unknown artifact type: {type}</div>;
    }
  };

  // Render code view (for code toggle button)
  const renderCodeView = () => {
    if (!artifact) return null;

    const { type, config, html } = artifact;

    if (type === 'plot' || type === 'calculator' || type === 'react-component') {
      return (
        <pre className="artifact-code-view">
          <code>{JSON.stringify(config, null, 2)}</code>
        </pre>
      );
    }

    if (type === 'code' && html) {
      return (
        <pre className="artifact-code-view">
          <code>{html}</code>
        </pre>
      );
    }

    return <div className="artifact-empty">No code available</div>;
  };

  return (
    <div className="artifact-viewer">
      {/* Simple Toolbar: Title + Buttons */}
      <div className="artifact-viewer-toolbar">
        <div className="artifact-viewer-toolbar-left">
          <span className="artifact-viewer-title">
            {artifact?.title || 'Artifact'}
          </span>
        </div>

        <div className="artifact-viewer-toolbar-right">
          {/* Code toggle button */}
          {(artifact?.type === 'plot' || artifact?.type === 'calculator' || artifact?.type === 'code' || artifact?.type === 'react-component') && (
            <button
              className="btn-toggle-code"
              onClick={toggleCode}
              title={showCode ? 'Hide code' : 'Show code'}
            >
              {'</>'}
            </button>
          )}

          {/* Show Lesson button */}
          {showLessonButton && (
            <button
              className="btn-show-lesson"
              onClick={handleShowLesson}
              title="Show lesson alongside artifact"
            >
              📄 Show Lesson
            </button>
          )}

          {/* Close button */}
          <button
            className="btn-close-artifact"
            onClick={onClose}
            title="Close artifact"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Artifact Content */}
      <div className="artifact-viewer-content">
        {showCode ? renderCodeView() : renderArtifactContent()}
      </div>
    </div>
  );
}
