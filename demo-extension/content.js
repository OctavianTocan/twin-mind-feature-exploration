// TwinMind Overlay Injection Extension - Content Script
(function () {
  "use strict";

  const MAX_RETRIES = 50;
  const RETRY_DELAY = 500;

  // --- Logging helpers ---
  const log = (...args) => console.log("[TwinMind Ext]", ...args);
  const warn = (...args) => console.warn("[TwinMind Ext]", ...args);
  const err = (...args) => console.error("[TwinMind Ext]", ...args);

  // --- Overlay helpers ---
  let cleanupFns = [];

  function removeOverlay() {
    const overlay = document.querySelector(".twinmind-overlay");
    if (!overlay) return;

    // Run cleanups
    cleanupFns.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        // ignore
      }
    });
    cleanupFns = [];

    overlay.remove();
    try {
      document.body.style.overflow = "";
    } catch (_) {}
    log("Overlay removed");
  }

  async function showOverlay(htmlFileName) {
    removeOverlay();

    const url = chrome.runtime.getURL(htmlFileName);
    log("Fetching overlay HTML:", url);

    let htmlText = "";
    try {
      const res = await fetch(url, { cache: "no-cache" });
      htmlText = await res.text();
    } catch (e) {
      err("Failed to fetch overlay HTML:", e);
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");

    // Extract stylesheets, styles and scripts from the fetched HTML
    const styleTags = Array.from(doc.querySelectorAll("style"));
    const linkStyleTags = Array.from(
      doc.querySelectorAll('link[rel="stylesheet"][href]')
    );
    const scriptTags = Array.from(doc.querySelectorAll("script"));
    const bodyEl = doc.body;

    // Remove background iframe and dark overlay from the source HTML (our extension provides backdrop)
    try {
      doc
        .querySelectorAll('iframe[src*="app.twinmind.com"]')
        .forEach((el) => el.remove());
      // Also remove our demo page helpers by class if present
      doc
        .querySelectorAll(".tm-preview-iframe, .bg-dimmed-overlay")
        .forEach((el) => el.remove());
      Array.from(doc.querySelectorAll("div")).forEach((el) => {
        const s = (el.getAttribute("style") || "")
          .replace(/\s+/g, " ")
          .toLowerCase();
        if (
          s.includes("position: fixed") &&
          s.includes("background: rgba(0, 0, 0, 0.35)")
        ) {
          el.remove();
        }
      });
    } catch (_) {}

    // Rewrite icon paths to extension URLs
    const iconsBase = chrome.runtime.getURL("icons/");
    let bodyHTML = bodyEl ? bodyEl.innerHTML : "";
    // Replace relative icon paths to extension icon URLs
    bodyHTML = bodyHTML.replace(
      /(src)\s*=\s*(["'])icons\/(.+?)\2/gi,
      (m, attr, q, rest) => `${attr}=${q}${iconsBase}${rest}${q}`
    );

    // Ensure Tailwind CDN is present
    const hasTailwind = !!document.querySelector(
      'script[src*="cdn.tailwindcss.com"]'
    );
    if (!hasTailwind) {
      const tw = document.createElement("script");
      tw.src = "https://cdn.tailwindcss.com";
      tw.defer = true;
      document.head.appendChild(tw);
      log("Injected Tailwind CDN");
    }

    // Always include the shared stylesheet from the extension for consistency
    try {
      const sharedHref = chrome.runtime.getURL("styles/site.css");
      const existing = Array.from(
        document.querySelectorAll('link[rel="stylesheet"]')
      ).some((l) => (l.getAttribute("href") || "").includes("styles/site.css"));
      if (!existing) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = sharedHref;
        document.head.appendChild(link);
        log("Injected shared stylesheet:", sharedHref);
        cleanupFns.push(() => {
          try {
            link.remove();
          } catch (_) {}
        });
      }
    } catch (e) {
      warn("Failed to inject shared stylesheet", e);
    }

    // Create overlay elements
    const overlay = document.createElement("div");
    overlay.className = "twinmind-overlay";
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "10000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });

    const backdrop = document.createElement("div");
    backdrop.className = "twinmind-backdrop";
    Object.assign(backdrop.style, {
      position: "absolute",
      inset: "0",
      background: "rgba(0,0,0,0.5)",
    });

    const contentWrap = document.createElement("div");
    contentWrap.className = "twinmind-overlay-content";
    Object.assign(contentWrap.style, {
      position: "relative",
      zIndex: "10001",
      width: "100%",
      height: "100%",
      overflow: "auto",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
    });

    // Add page styles from source HTML scoped inside overlay container
    styleTags.forEach((s) => {
      const styleEl = document.createElement("style");
      styleEl.textContent = s.textContent || "";
      contentWrap.appendChild(styleEl);
    });

    // Inline any external link stylesheets referenced by the fetched HTML
    for (const l of linkStyleTags) {
      const href = l.getAttribute("href") || "";
      try {
        // Resolve to extension URL if relative
        const resolved = href.startsWith("http")
          ? href
          : chrome.runtime.getURL(href.replace(/^\/?/, ""));
        const cssRes = await fetch(resolved, { cache: "no-cache" });
        const cssText = await cssRes.text();
        const inline = document.createElement("style");
        inline.textContent = cssText;
        contentWrap.appendChild(inline);
        log("Inlined stylesheet from", href);
      } catch (e) {
        warn("Failed to inline stylesheet", href, e);
      }
    }

    // Insert body markup
    const inner = document.createElement("div");
    inner.innerHTML = bodyHTML;
    contentWrap.appendChild(inner);

    overlay.appendChild(backdrop);
    overlay.appendChild(contentWrap);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    // Replace service icons with extension URLs; fallback to emoji if not packaged
    const emojiMap = new Map([
      ["google-drive", "📁"],
      ["onedrive", "☁️"],
      ["outlook", "📧"],
      ["gmail", "✉️"],
      ["google-calendar", "📅"],
    ]);
    const serviceImgs = overlay.querySelectorAll('img[src*="icons/"]');
    serviceImgs.forEach((img) => {
      const orig = img.getAttribute("src") || "";
      const file = orig.split("/").pop() || "";
      const key = file.replace(/\.png$/i, "").toLowerCase();
      const runtimeIconUrl = chrome.runtime.getURL(`icons/${file}`);
      img.src = runtimeIconUrl;
      img.onerror = () => {
        const span = document.createElement("span");
        span.textContent = emojiMap.get(key) || "🔗";
        span.setAttribute("role", "img");
        span.setAttribute("aria-label", img.getAttribute("alt") || key);
        span.style.fontSize = "1.25rem";
        span.style.width = "1.5rem";
        span.style.height = "1.5rem";
        span.style.display = "inline-flex";
        span.style.alignItems = "center";
        span.style.justifyContent = "center";
        img.replaceWith(span);
      };
    });

    // Backdrop click closes overlay
    const onBackdrop = () => removeOverlay();
    backdrop.addEventListener("click", onBackdrop);
    cleanupFns.push(() => backdrop.removeEventListener("click", onBackdrop));

    // ESC to close
    const onKey = (e) => {
      if (e.key === "Escape") removeOverlay();
    };
    document.addEventListener("keydown", onKey, true);
    cleanupFns.push(() => document.removeEventListener("keydown", onKey, true));

    // Wire up Back/Save buttons inside overlay content
    const buttonCandidates = Array.from(overlay.querySelectorAll("button"));
    buttonCandidates.forEach((btn) => {
      const txt = (btn.textContent || "").trim().toLowerCase();
      if (txt === "back" || txt === "save") {
        const onClick = (e) => {
          e.preventDefault();
          removeOverlay();
        };
        btn.addEventListener("click", onClick);
        cleanupFns.push(() => btn.removeEventListener("click", onClick));
      }
    });

    // Execute inline scripts from the source page so interactions work.
    // If the script registers DOMContentLoaded, run its body immediately.
    scriptTags.forEach((s) => {
      const src = s.getAttribute("src");
      if (src) {
        const scriptEl = document.createElement("script");
        scriptEl.src = src.startsWith("http")
          ? src
          : chrome.runtime.getURL(src.replace(/^\/?/, ""));
        contentWrap.appendChild(scriptEl);
        return;
      }
      const code = (s.textContent || "").trim();
      if (!code) return;
      let toRun = code;
      // Try to unwrap DOMContentLoaded pattern
      const dclMatch = code.match(
        /document\.addEventListener\(\s*["']DOMContentLoaded["']\s*,\s*\(\)\s*=>\s*\{([\s\S]*)\}\s*\)\s*;?/
      );
      if (dclMatch && dclMatch[1]) {
        toRun = `(function(){${dclMatch[1]}})();`;
      }
      const runner = document.createElement("script");
      runner.textContent = toRun;
      contentWrap.appendChild(runner);
    });

    log("Overlay shown for", htmlFileName);
  }

  // --- Menu detection and injection ---
  function describeEl(el) {
    if (!el) return "null";
    const cls = (el.className || "")
      .toString()
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 5)
      .join(".");
    return `<${el.tagName.toLowerCase()}${cls ? "." + cls : ""}${
      el.id ? "#" + el.id : ""
    }>`;
  }

  function findMenuContainer() {
    log("Attempting to locate TwinMind personalization menu…");

    const strategies = [
      {
        name: "ARIA role menu",
        fn: () => document.querySelector('[role="menu"]'),
      },
      {
        name: "Data-testid profile-menu",
        fn: () => document.querySelector('[data-testid="profile-menu"]'),
      },
      {
        name: "Common class selectors",
        fn: () =>
          document.querySelector(
            '.profile-menu, .user-menu, .dropdown-menu, .menu-dropdown, nav[role="navigation"] .menu'
          ),
      },
      {
        name: "Text match: Personalization",
        fn: () => {
          const all = Array.from(document.querySelectorAll("*"));
          const item = all.find(
            (n) =>
              (n.textContent || "").trim().toLowerCase() === "personalization"
          );
          return item ? item.closest('[role="menu"], ul, nav, div') : null;
        },
      },
      {
        name: "Text match: Sign out",
        fn: () => {
          const all = Array.from(document.querySelectorAll("*"));
          const item = all.find((n) => /sign\s*out/i.test(n.textContent || ""));
          return item ? item.closest('[role="menu"], ul, nav, div') : null;
        },
      },
    ];

    for (const s of strategies) {
      try {
        const el = s.fn();
        log(
          `Menu detection [${s.name}]:`,
          el ? `FOUND ${describeEl(el)}` : "not found"
        );
        if (el) return el;
      } catch (e) {
        warn(`Menu detection error in [${s.name}]`, e);
      }
    }

    // Fallback: any visible floating list that appears after click
    const candidates = Array.from(
      document.querySelectorAll('[role="menu"], ul, nav')
    ).filter(
      (el) =>
        el.children &&
        el.children.length >= 2 &&
        el.getBoundingClientRect().height > 0
    );
    const fallback = candidates.find(Boolean) || null;
    log(
      "Menu detection [fallback]:",
      fallback ? `FOUND ${describeEl(fallback)}` : "not found"
    );
    return fallback;
  }

  function cloneMenuItemPrototype(menu) {
    // Prefer an item that contains the text "Personalization"
    let proto = Array.from(menu.children || []).find((el) =>
      /personalization/i.test(el.textContent || "")
    );
    if (!proto) {
      // Search deeper if not a direct child
      proto = Array.from(menu.querySelectorAll("*")).find((el) =>
        /personalization/i.test(el.textContent || "")
      );
    }
    return proto || null;
  }

  function makeCleanCloneWithText(proto, text) {
    // Deep clone to preserve styling structure; event listeners are not cloned
    let clone = proto.cloneNode(true);
    // Replace existing node with a fresh clone to ensure no stray listeners
    const fresh = clone.cloneNode(true);
    clone.replaceWith(fresh);
    clone = fresh;

    // Attempt to replace the label text inside the clone
    let replaced = false;
    const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    for (const tn of textNodes) {
      const content = (tn.nodeValue || "").trim();
      if (!content) continue;
      // If the prototype had a specific label like "Personalization", prefer replacing that
      if (/personalization/i.test(content) || !replaced) {
        tn.nodeValue = text;
        replaced = true;
        break;
      }
    }
    if (!replaced) {
      // Fallback: append a span with the label
      const span = document.createElement("span");
      span.textContent = text;
      clone.appendChild(span);
    }

    // Accessibility: ensure it behaves like a menuitem/button
    if (!clone.hasAttribute("role")) clone.setAttribute("role", "menuitem");
    clone.setAttribute("tabindex", "0");

    // Remove attributes that might trigger app handlers
    clone.removeAttribute("href");
    clone.setAttribute("data-twinmind-injected", "true");
    return clone;
  }

  function injectMenuItems() {
    const menu = findMenuContainer();
    if (!menu) {
      log("Menu not found; will retry");
      return false;
    }

    if (menu.querySelector('[data-twinmind-injected="true"]')) {
      log("Injected items already present; skipping");
      return true;
    }

    const proto = cloneMenuItemPrototype(menu);
    if (!proto) {
      err("Cannot clone menu item - TwinMind menu structure may have changed");
      return false;
    }

    const connectorsItem = makeCleanCloneWithText(proto, "🔗 Connectors");
    const dictionaryItem = makeCleanCloneWithText(proto, "📝 Dictionary");

    const onActivate = (file) => (e) => {
      e.preventDefault();
      e.stopPropagation();
      showOverlay(file);
    };
    connectorsItem.addEventListener("click", onActivate("connectors.html"));
    dictionaryItem.addEventListener("click", onActivate("dictionary.html"));
    const onKey = (file) => (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        showOverlay(file);
      }
    };
    connectorsItem.addEventListener("keydown", onKey("connectors.html"));
    dictionaryItem.addEventListener("keydown", onKey("dictionary.html"));

    // Append at the end of the menu for visibility
    menu.appendChild(connectorsItem);
    menu.appendChild(dictionaryItem);

    log("Injected TwinMind items into menu:", describeEl(menu));
    return true;
  }

  // --- Orchestration with retries and observation ---
  async function main() {
    // Print a short inspection guide once
    log("Menu injection started. If items do not appear:");
    log("1) Click your profile picture (top-left).");
    log("2) When menu opens, right-click Personalization → Inspect.");
    log(
      "3) In Elements, find the container wrapping all menu items (div/ul/nav)."
    );
    log(
      "4) Note its role/id/classes; the extension tries multiple selectors and logs which matched."
    );
    let retries = 0;

    const tryInject = () => {
      const success = injectMenuItems();
      if (!success && retries < MAX_RETRIES) {
        retries += 1;
        log(`Retrying menu injection (${retries}/${MAX_RETRIES})…`);
        setTimeout(tryInject, RETRY_DELAY);
      }
    };

    // Kick off initial attempt a bit after load to let app render
    setTimeout(tryInject, 800);

    // Re-try when user opens profile area
    document.addEventListener(
      "click",
      (e) => {
        const t = e.target;
        if (
          t &&
          t.closest(
            '[data-testid="profile"], .profile, [aria-label*="profile" i], .user-avatar, button, [role="button"]'
          )
        ) {
          setTimeout(tryInject, 500);
        }
      },
      true
    );

    // Watch for DOM mutations that might add the menu
    const observer = new MutationObserver(() => {
      setTimeout(tryInject, 300);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();
