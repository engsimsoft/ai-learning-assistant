/**
 * Header Component
 * Top bar with menu button, app title, and panel controls
 */
import './Header.css';

export default function Header({
  leftSidebarOpen,
  onToggleLeftSidebar,
  rightSidebarOpen,
  onToggleRightSidebar
}) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={onToggleLeftSidebar}
          title={leftSidebarOpen ? 'Hide courses' : 'Show courses'}
          aria-label="Toggle left sidebar"
        >
          ☰
        </button>
        <h1 className="header-title">AI Learning Agent</h1>
      </div>

      <div className="header-right">
        <button
          className="canvas-button"
          onClick={() => {
            // Open Canvas in CENTER (ARTIFACT_ONLY mode)
            window.dispatchEvent(new CustomEvent('artifact:open', {
              detail: {
                type: 'markdown',
                title: 'New Canvas',
                source: 'manual'
              }
            }));
          }}
          title="Open Canvas (create artifacts)"
          aria-label="Open artifact canvas"
        >
          🎨
        </button>
        <button
          className="chat-button"
          onClick={onToggleRightSidebar}
          title={rightSidebarOpen ? 'Hide AI chat' : 'Show AI chat'}
          aria-label="Toggle right sidebar"
        >
          💬
        </button>
        <span className="version-badge">v3.0</span>
      </div>
    </header>
  );
}
