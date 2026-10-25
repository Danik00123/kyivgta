(function () {
  // Single-install guard
  try {
    if (window.__ugtaAntiCopyInstalled) return;
    window.__ugtaAntiCopyInstalled = true;
  } catch (e) {}

  function isEditableTarget(t) {
    if (!t) return false;
    var tag = String(t.tagName || '').toUpperCase();
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
    if (t.isContentEditable) return true;
    return false;
  }

  function inProtectedArea() {
    try {
      var p = String(window.location.pathname || '');
      if (p.indexOf('/uk/cabinet/') !== -1) return true;
      if (p === '/uk/' || p === '/uk/index.php') return true;
      return false;
    } catch (e) {
      return false;
    }
  }

  document.addEventListener(
    'contextmenu',
    function (e) {
      if (isEditableTarget(e.target)) return;
      e.preventDefault();
    },
    { passive: false, capture: true }
  );

  // Some browsers trigger DevTools on keyup; add fallback.
  document.addEventListener(
    'keyup',
    function (e) {
      if (isEditableTarget(e.target)) return;
      var key = String(e.key || '').toLowerCase();
      var ctrl = !!(e.ctrlKey || e.metaKey);
      var isF12 = key === 'f12';
      var isInspectCombo = ctrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 'k');
      var isAltInspectCombo = ctrl && e.altKey && (key === 'i' || key === 'j');
      if (isF12 || isInspectCombo || isAltInspectCombo) {
        try {
          e.preventDefault();
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        } catch (err) {}
        return false;
      }
    },
    { passive: false, capture: true }
  );

  document.addEventListener(
    'copy',
    function (e) {
      if (isEditableTarget(e.target)) return;
      try {
        e.preventDefault();
        if (e.clipboardData) {
          e.clipboardData.setData('text/plain', '');
        }
      } catch (err) {}
    },
    { passive: false }
  );

  document.addEventListener(
    'cut',
    function (e) {
      if (isEditableTarget(e.target)) return;
      try {
        e.preventDefault();
      } catch (err) {}
    },
    { passive: false }
  );

  document.addEventListener(
    'keydown',
    function (e) {
      if (isEditableTarget(e.target)) return;

      var key = String(e.key || '').toLowerCase();
      var ctrl = !!(e.ctrlKey || e.metaKey);

      var isF12 = key === 'f12';
      var isInspectCombo = ctrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 'k');
      var isAltInspectCombo = ctrl && e.altKey && (key === 'i' || key === 'j');

      if (isF12 || isInspectCombo || isAltInspectCombo) {
        try {
          e.preventDefault();
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        } catch (err) {}
        return false;
      }

      if (ctrl && (key === 'u' || key === 's' || key === 'p')) {
        e.preventDefault();
        return;
      }

      if (ctrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
        e.preventDefault();
        return;
      }

      if (ctrl && (key === 'a' || key === 'c' || key === 'x')) {
        e.preventDefault();
        return;
      }
    },
    { passive: false, capture: true }
  );

})();