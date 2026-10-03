import sanitizeHtml from "sanitize-html";

/** Allow-list for rich text: no scripts, no inline event handlers, no inline styles. */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "a", "hr"],
  allowedAttributes: { a: ["href", "title", "target", "rel"] },
  allowedSchemes: ["https", "http", "mailto"],
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, rel: "noopener noreferrer", ...(attribs.target ? { target: "_blank" } : {}) },
    }),
  },
};

export function sanitizeRich(html: string): string {
  return sanitizeHtml(html, OPTIONS);
}

/** Strip all markup: for fields that must be plain text. */
export function stripTags(text: string): string {
  return sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} });
}
