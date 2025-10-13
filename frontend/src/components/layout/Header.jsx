/**
 * Header Component
 * Top bar with menu button and app title
 */
import './Header.css';

export default function Header({ leftSidebarOpen, onToggleLeftSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={onToggleLeftSidebar}
          title={leftSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          aria-label="Toggle left sidebar"
        >
          ☰
        </button>
        <h1 className="header-title">AI Learning Agent</h1>
      </div>

      <div className="header-right">
        <span className="version-badge">v2.0</span>
      </div>
    </header>
  );
}
