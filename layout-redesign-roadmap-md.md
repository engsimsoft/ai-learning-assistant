# AI Learning Agent - Layout Redesign Roadmap

**Document Version:** 1.0  
**Date:** 2025-10-18  
**For:** Claude Code Implementation  
**Project:** AI Learning Agent v2.0 → v3.0

---

## Executive Summary

This document describes a complete redesign of the layout system to solve the main UX problem: **Canvas/Artifacts are cramped in the sidebar (400-800px)**.

**New Approach:** Dynamic CENTER container that can show:
- Lesson only
- Lesson + Artifact (split view)
- Artifact only

**Key Benefits:**
- ✅ Artifacts get maximum space (up to full screen)
- ✅ Context-aware layout (adapts to user workflow)
- ✅ Lesson + Artifact visible simultaneously
- ✅ Smooth transitions between states

---

## Table of Contents

1. [Current Problems](#1-current-problems)
2. [New Layout Architecture](#2-new-layout-architecture)
3. [User Scenarios](#3-user-scenarios)
4. [Panel Behavior Logic](#4-panel-behavior-logic)
5. [Visual State Diagrams](#5-visual-state-diagrams)
6. [Technical Implementation Plan](#6-technical-implementation-plan)
7. [Components to Modify](#7-components-to-modify)
8. [Implementation Checklist](#8-implementation-checklist)
9. [Testing Scenarios](#9-testing-scenarios)

---

## 1. Current Problems

### Problem A: Canvas is cramped
- Canvas is a **tab** inside RIGHT sidebar (400-800px)
- When working with Canvas, you lose access to Chat
- Code editors are too small for comfortable work
- Preview iframe is tiny

### Problem B: Tab switching
- Can't use Chat + Canvas at the same time
- Have to keep switching tabs (Chat → Canvas → Chat)
- Lose context when switching

### Problem C: Layout rigidity
- 3-panel layout doesn't adapt to user workflow
- No way to maximize Canvas for serious work

---

## 2. New Layout Architecture

### Core Concept: Dynamic CENTER Container

```
┌──────────┬─────────────────────────────┬─────────────┐
│   LEFT   │          CENTER             │    RIGHT    │
│ (lessons)│    (dynamic content)        │  (AI chat)  │
│  280px   │         (fluid)             │  400-800px  │
└──────────┴─────────────────────────────┴─────────────┘
```

**CENTER can show 3 states:**
1. **Lesson only** (default)
2. **Lesson + Artifact** (split view, resizable)
3. **Artifact only** (full CENTER width)

**Panels can be hidden:**
- LEFT can hide (show lessons tree or not)
- RIGHT can hide (show chat or not)
- Lesson (in CENTER) can hide when Artifact is open

---

## 3. User Scenarios

### Scenario 1: Student reading lesson (default)

```
┌──────────┬─────────────────────────────┬─────────────┐
│   LEFT   │          CENTER             │    RIGHT    │
│          │                             │             │
│ Lessons  │         Lesson              │   AI Chat   │
│  Tree    │       (Markdown)            │             │
│          │                             │             │
│  ✓ Open  │        100%                 │   ✓ Open    │
└──────────┴─────────────────────────────┴─────────────┘
```

**State:**
- LEFT: Open (lessons tree)
- CENTER: Lesson 100%
- RIGHT: Open (chat)

---

### Scenario 2: Artifact opened from LESSON (via link)

**Trigger:** Student clicks artifact link in lesson Markdown

```
┌──────────┬──────────────┬──────────────┬─────────────┐
│   LEFT   │   CENTER     │   CENTER     │    RIGHT    │
│          │              │              │             │
│ Lessons  │   Lesson     │   Artifact   │   (hidden)  │
│  Tree    │ (reference)  │  (working)   │             │
│          │              │              │             │
│  ✓ Open  │     40%      │     60%      │   ✗ Hidden  │
└──────────┴──────────────┴──────────────┴─────────────┘
                    ↕ resizable handle
```

**State:**
- LEFT: Open (can switch lessons)
- CENTER: Lesson 40% | Artifact 60% (split, resizable)
- RIGHT: Hidden (not needed, focus on studying demo)

**Logic:**
- Lesson remains visible (context/reference)
- Artifact gets more space (60% by default)
- User can drag split handle to adjust
- Chat auto-hides (focus on learning)

---

### Scenario 3: Artifact created by AI

**Trigger:** AI generates artifact in chat → artifact opens

```
┌──────────┬─────────────────────────────┬─────────────┐
│   LEFT   │          CENTER             │    RIGHT    │
│          │                             │             │
│ (hidden) │        Artifact             │   AI Chat   │
│          │       (full width)          │             │
│          │                             │             │
│ ✗ Hidden │         100%                │   ✓ Open    │
└──────────┴─────────────────────────────┴─────────────┘
```

**State:**
- LEFT: Hidden (not needed, working with AI)
- CENTER: Artifact 100%
- RIGHT: Open (continue dialog with AI)

**Logic:**
- User is in dialog with AI → LEFT not needed
- Artifact gets maximum space
- Chat remains for asking AI to modify artifact
- In chat message: link to artifact (can reopen later)

---

## 4. Panel Behavior Logic

### 4.1 Opening Artifacts

| Trigger | LEFT | CENTER | RIGHT | Notes |
|---------|------|--------|-------|-------|
| **Link in lesson** | ✓ Open | Lesson 40% \| Artifact 60% | ✗ Hidden | Split view, chat auto-hides |
| **AI creates artifact** | ✗ Hidden | Artifact 100% | ✓ Open | Chat stays for dialog |

### 4.2 Closing Artifacts

**From Scenario 2 (artifact from lesson):**
```
[LEFT: open] [CENTER: lesson | artifact] [RIGHT: hidden]
                      ↓ Click [×] Close
[LEFT: open] [CENTER: lesson 100%] [RIGHT: hidden]
```
- Artifact closes
- Lesson expands to full CENTER
- Chat remains hidden (user didn't ask for it)

**From Scenario 3 (artifact from AI):**
```
[LEFT: hidden] [CENTER: artifact 100%] [RIGHT: open]
                      ↓ Click [×] Close
[LEFT: hidden] [CENTER: last lesson 100%] [RIGHT: open]
```
- Artifact closes
- Show last opened lesson in CENTER
- Chat remains open (dialog continues)
- LEFT remains hidden

### 4.3 Showing Hidden Panels

**Show LEFT when hidden:**
- Click `[☰]` button in Header (top-left)
- LEFT appears, other panels adjust width proportionally

**Show RIGHT when hidden:**
- Click `[💬]` button in Header (top-right)
- RIGHT appears, other panels adjust width proportionally

**Show Lesson when hidden:**
- Click `[📄 Show Lesson]` button in Artifact toolbar
- CENTER splits: Lesson 40% | Artifact 60%

### 4.4 Conflict Resolution

**Situation: Artifact from lesson (chat hidden) → User clicks [💬]**

```
Before: [LEFT: open] [CENTER: lesson | artifact] [RIGHT: hidden]
Click [💬]: [LEFT: open] [CENTER: lesson | artifact] [RIGHT: open]
```

**Result:** All three panels visible, each takes less space

**Logic:** If space is tight, user can manually close what they don't need

---

## 5. Visual State Diagrams

### State Machine for CENTER

```
                    ┌─────────────────┐
                    │  LESSON_ONLY    │
                    │  (lesson 100%)  │
                    └────────┬────────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                                   │
     Open artifact                       Open artifact
     from lesson                         from AI
           │                                   │
           ▼                                   ▼
┌──────────────────────┐            ┌─────────────────┐
│  LESSON_ARTIFACT     │            │  ARTIFACT_ONLY  │
│  (lesson | artifact) │◄───────────┤  (artifact 100%)│
└──────────┬───────────┘  Hide      └────────┬────────┘
           │              lesson              │
           │                                  │
           └──────────────┬───────────────────┘
                          │
                    Close artifact
                          │
                          ▼
                    ┌─────────────────┐
                    │  LESSON_ONLY    │
                    └─────────────────┘
```

### All Possible Layout Combinations

```
1. Default (reading lesson):
   [LEFT ✓] [CENTER: Lesson 100%] [RIGHT ✓]

2. Artifact from lesson:
   [LEFT ✓] [CENTER: Lesson 40% | Artifact 60%] [RIGHT ✗]

3. Artifact from AI:
   [LEFT ✗] [CENTER: Artifact 100%] [RIGHT ✓]

4. User opened LEFT in Scenario 3:
   [LEFT ✓] [CENTER: Artifact smaller] [RIGHT ✓]

5. User opened RIGHT in Scenario 2:
   [LEFT ✓] [CENTER: Lesson | Artifact smaller] [RIGHT ✓]

6. User hid lesson in Scenario 2:
   [LEFT ✓] [CENTER: Artifact 100%] [RIGHT ✗]

7. Fullscreen artifact (all hidden):
   [LEFT ✗] [CENTER: Artifact 100%] [RIGHT ✗]
```

---

## 6. Technical Implementation Plan

### Phase 1: Refactor CENTER Container (Priority: HIGH)

**Goal:** Make CENTER dynamic - can show lesson, artifact, or both

**Steps:**
1. Create new state management for CENTER
2. Implement 3 states: `LESSON_ONLY`, `LESSON_ARTIFACT`, `ARTIFACT_ONLY`
3. Add resize handle between lesson and artifact
4. Smooth transitions (CSS grid + transitions)

**Files to modify:**
- `frontend/src/components/layout/Layout.jsx`
- Create new: `frontend/src/components/center/CenterContainer.jsx`
- Modify: `frontend/src/components/center/LessonViewer.jsx`

### Phase 2: Extract Artifact from RIGHT Sidebar (Priority: HIGH)

**Goal:** Move Artifact from tab in RIGHT sidebar → independent component in CENTER

**Steps:**
1. Remove Canvas tab from `ClaudeAISidebar.jsx`
2. Create standalone `ArtifactViewer.jsx` component
3. Implement event system for opening artifacts
4. Add artifact toolbar (close, show lesson, fullscreen)

**Files to modify:**
- `frontend/src/components/rightSidebar/ClaudeAISidebar.jsx` (remove Canvas tab)
- Create new: `frontend/src/components/center/ArtifactViewer.jsx`
- Modify: `frontend/src/components/rightSidebar/ArtifactCanvas.jsx` (reuse logic)

### Phase 3: Auto-hide/show Logic (Priority: MEDIUM)

**Goal:** Panels auto-hide/show based on scenario

**Steps:**
1. Implement panel visibility state machine
2. Add logic for Scenario 1 (hide RIGHT when artifact from lesson)
3. Add logic for Scenario 2 (hide LEFT when artifact from AI)
4. Smooth panel transitions

**Files to modify:**
- `frontend/src/components/layout/Layout.jsx`
- Add state management for panel visibility

### Phase 4: Panel Control Buttons (Priority: MEDIUM)

**Goal:** Add buttons to show/hide panels

**Steps:**
1. Add `[☰]` button in Header (show LEFT)
2. Add `[💬]` button in Header (show RIGHT)
3. Add `[📄 Show Lesson]` in Artifact toolbar
4. Add `[×]` close button in Artifact toolbar

**Files to modify:**
- `frontend/src/components/layout/Header.jsx`
- `frontend/src/components/center/ArtifactViewer.jsx`

### Phase 5: Artifact Links in Markdown (Priority: LOW)

**Goal:** Support artifact links in lesson Markdown

**Steps:**
1. Implement custom Markdown syntax: `[Demo](artifact:some-id)`
2. Parse links and render clickable
3. Load artifact on click

**Files to modify:**
- `frontend/src/components/center/LessonViewer.jsx`
- Backend: artifact loading endpoint

### Phase 6: State Persistence (Priority: LOW)

**Goal:** Remember panel sizes and states

**Steps:**
1. Save panel widths to localStorage
2. Save CENTER split ratio (lesson/artifact)
3. Restore on page load

**Files to modify:**
- `frontend/src/components/layout/Layout.jsx`
- `frontend/src/utils/layoutStorage.js` (new file)

---

## 7. Components to Modify

### 7.1 New Components

```
frontend/src/components/center/
├── CenterContainer.jsx         # NEW: Dynamic container (lesson/artifact/both)
├── ArtifactViewer.jsx          # NEW: Standalone artifact viewer
└── ResizeHandle.jsx            # NEW: Drag handle for lesson/artifact split
```

### 7.2 Modified Components

```
frontend/src/components/layout/
├── Layout.jsx                  # MODIFY: Add CENTER state management
└── Header.jsx                  # MODIFY: Add [☰] and [💬] buttons

frontend/src/components/center/
└── LessonViewer.jsx            # MODIFY: Can be hidden/resized

frontend/src/components/rightSidebar/
├── ClaudeAISidebar.jsx         # MODIFY: Remove Canvas tab
└── ArtifactCanvas.jsx          # MODIFY: Reuse in ArtifactViewer
```

### 7.3 New State Management

```javascript
// Layout state
{
  leftSidebar: {
    visible: true,
    width: 280
  },
  center: {
    state: 'LESSON_ONLY' | 'LESSON_ARTIFACT' | 'ARTIFACT_ONLY',
    lessonWidth: 40,        // % when split
    artifactWidth: 60,      // % when split
    currentLesson: 'lesson-1.1.md',
    currentArtifact: {
      id: 'artifact-123',
      type: 'code' | 'markdown' | 'images',
      source: 'lesson' | 'ai'
    }
  },
  rightSidebar: {
    visible: true,
    width: 400
  }
}
```

---

## 8. Implementation Checklist

### Phase 1: CENTER Refactor ✅ ЗАВЕРШЕН (2025-10-18)
- [X] Create `CenterContainer.jsx` with 3 states
- [X] Implement state machine (LESSON_ONLY → LESSON_ARTIFACT → ARTIFACT_ONLY)
- [X] Add CSS Grid layout for CENTER
- [X] Add smooth transitions (300ms ease-out)
- [X] Create `ResizeHandle.jsx` for lesson/artifact split
- [X] Implement drag-to-resize logic
- [X] Set bounds (min 30%, max 70% for each side)
- [X] Test all 3 states render correctly

### Phase 2: Extract Artifact ✅ ЗАВЕРШЕН (2025-10-18)
- [X] Remove Canvas tab from `ClaudeAISidebar.jsx`
- [X] Create `ArtifactViewer.jsx` component
- [X] Move artifact logic from `ArtifactCanvas.jsx` to new component
- [X] Add artifact toolbar (close, show lesson)
- [X] Implement event system: `window.dispatchEvent('artifact:open')`
- [X] Handle 2 types of opens: from lesson, from AI
- [X] Test artifact opens in CENTER

### Phase 3: Auto-hide Logic ✅ ЗАВЕРШЕН (2025-10-18)
- [X] Implement panel visibility state
- [X] Scenario 1 logic: artifact from lesson → hide RIGHT
- [X] Scenario 2 logic: artifact from AI → hide LEFT
- [X] Smooth panel hide/show transitions
- [X] Test all scenarios work correctly

### Phase 4: Control Buttons ✅ ЗАВЕРШЕН (2025-10-18)
- [X] Add `[☰]` button in Header (top-left) - was already present
- [X] Add `[💬]` button in Header (top-right)
- [X] Add `[📄 Show Lesson]` in Artifact toolbar
- [X] Add `[×]` close button in Artifact toolbar
- [X] Handle button clicks → show/hide panels
- [X] Test conflict resolution (all 3 panels visible)

### Phase 5: Artifact Links ⏸️ ОТЛОЖЕНО (Low Priority)
- [ ] Define Markdown syntax: `[Demo](artifact:id)`
- [ ] Parse custom links in LessonViewer
- [ ] Render as clickable buttons/links
- [ ] Load artifact on click
- [ ] Open in CENTER with correct scenario logic
- [ ] Test links work in lessons

**Note:** Отложено на будущее. Текущий функционал "Open in Canvas" достаточен.

### Phase 6: State Persistence 🔄 ЧАСТИЧНО РЕАЛИЗОВАНО
- [X] Save panel widths to localStorage (уже было)
- [ ] Save CENTER split ratio
- [ ] Save last opened lesson
- [X] Restore state on page load (частично)
- [ ] Handle missing/invalid saved state
- [ ] Test persistence across page reloads

**Note:** Базовый persistence для sidebars работает. CENTER split persistence можно добавить позже.

---

## 9. Testing Scenarios

### Test 1: Default State
1. Open app
2. Verify: LEFT open, CENTER shows lesson, RIGHT open
3. All panels visible and functional

### Test 2: Artifact from Lesson
1. Click artifact link in lesson
2. Verify: LEFT stays open, CENTER splits (lesson 40% | artifact 60%), RIGHT auto-hides
3. Drag resize handle → verify split adjusts smoothly
4. Click [💬] → verify RIGHT appears, all 3 panels visible
5. Click [×] on artifact → verify artifact closes, lesson expands

### Test 3: Artifact from AI
1. Ask AI to create demo
2. Verify: LEFT auto-hides, CENTER shows artifact 100%, RIGHT stays open
3. In chat: verify link to artifact appears
4. Click [☰] → verify LEFT appears, artifact shrinks
5. Click [×] on artifact → verify artifact closes, last lesson appears

### Test 4: Show/Hide Buttons
1. Click [☰] when LEFT hidden → verify LEFT appears
2. Click [💬] when RIGHT hidden → verify RIGHT appears
3. Click [📄 Show Lesson] when lesson hidden → verify CENTER splits
4. Test all combinations work correctly

### Test 5: Edge Cases
1. Open artifact from lesson → manually hide LEFT → close artifact
   - Verify: LEFT stays hidden (user preference)
2. Open artifact from AI → manually show LEFT → close artifact
   - Verify: LEFT stays visible (user preference)
3. Rapidly switch between artifacts
   - Verify: no flashing, smooth transitions
4. Resize during transitions
   - Verify: no layout breaks

### Test 6: State Persistence
1. Resize panels to custom widths
2. Open artifact and adjust split
3. Reload page
4. Verify: all sizes restored correctly

---

## 10. Success Criteria

### Must Have ✅
- [x] CENTER can show lesson, artifact, or both
- [x] Artifact gets significantly more space than before (60%+ vs 400-800px)
- [x] Panels auto-hide/show based on scenario
- [x] Smooth transitions (no janky reflows)
- [x] User can manually override auto-hide (show any panel)
- [x] Artifact closes properly in all scenarios

### Should Have 🔄
- [X] Resize handle between lesson and artifact
- [X] Panel sizes persist across page reloads (для sidebars)
- [ ] Artifact links work in Markdown lessons (отложено на Phase 5)

### Nice to Have 🎯
- [ ] Keyboard shortcuts (Cmd+B for LEFT, Cmd+\ for RIGHT)
- [ ] Animations for panel transitions
- [ ] Artifact history (recently opened artifacts)

---

## 11. Notes for Claude Code

### Design Philosophy
- **Context-aware layout:** The interface adapts to user workflow, not the other way around
- **Progressive disclosure:** Show what's needed, hide what's not
- **User control:** Auto-behavior is smart, but user can always override
- **Smooth UX:** No jarring transitions, everything feels natural

### Technical Approach
- **CSS Grid over Flexbox:** Better for complex layouts, smoother transitions
- **State machine:** Clear states prevent bugs
- **Event-driven:** Components communicate via events, not tight coupling
- **localStorage for persistence:** Remember user preferences

### Code Quality
- Keep components small and focused
- Use TypeScript if possible (or JSDoc for type hints)
- Add comments for complex state transitions
- Write helper functions for readability

### Testing Priority
Focus testing on:
1. State transitions (most complex)
2. Edge cases (rapid clicks, conflicts)
3. Persistence (localStorage)

---

## 12. Future Enhancements (Post-MVP)

### Phase 7: Advanced Features
- Drag-and-drop to rearrange panels
- Multiple artifacts open (tabs in CENTER?)
- Artifact presets (save/load layouts)
- Keyboard navigation (arrow keys to switch lessons)

### Phase 8: Mobile/Tablet
- Responsive breakpoints (< 1600px)
- Touch gestures for panels
- Fullscreen-first approach for small screens

---

## Document End

**Next Steps:**
1. Review this document
2. Confirm approach with product owner
3. Start implementation with Phase 1
4. Iterate based on testing feedback

**Questions?** Ask before starting implementation!

---

**Prepared by:** Claude AI (Sonnet 4.5)  
**For:** Claude Code Agent  
**Project:** AI Learning Agent v3.0