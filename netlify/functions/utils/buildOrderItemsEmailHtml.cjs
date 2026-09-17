/**
 * Shared HTML builders for order confirmation / dispatch emails.
 * Works in Node (server.js + Netlify functions).
 */

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toTitleCase(value) {
  return String(value || "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function normalizeColorName(raw, imagePath) {
  if (raw == null && !imagePath) return null;
  const s = String(raw || "").trim();

  if (imagePath) {
    const filename = String(imagePath)
      .split("/")
      .pop()
      .replace(/\.(webp|png|jpg|jpeg)$/i, "")
      .toLowerCase();
    let colorPart = filename
      .replace(/^economycase/i, "")
      .replace(/^businessclasscase/i, "")
      .replace(/^firstclasscase/i, "")
      .replace(/^smartcase/i, "")
      .replace(/^premiumcase/i, "")
      .replace(/^firstclass/i, "");
    const colorMap = {
      lightpink: "Light Pink",
      lightblue: "Light Blue",
      jeansblue: "Jeans Blue",
      darkblue: "Dark Blue",
      darkgreen: "Dark Green",
      darkbrown: "Dark Brown",
      lightbrown: "Light Brown",
      lightgray: "Light Gray",
      lightgrey: "Light Grey",
      pink: "Pink",
      red: "Red",
      blue: "Blue",
      brown: "Brown",
      black: "Black",
      white: "White",
      green: "Green",
      gray: "Gray",
      grey: "Grey",
      purple: "Purple",
      orange: "Orange",
      yellow: "Yellow",
      beige: "Beige",
      cream: "Cream",
      navy: "Navy",
      burgundy: "Burgundy",
    };
    if (colorMap[colorPart]) return colorMap[colorPart];
  }

  if (!s) return null;
  const hex = s.toLowerCase().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1].toLowerCase();
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const map = {
      "000000": "Black",
      ffffff: "White",
      ff0000: "Red",
      "00ff00": "Green",
      "0000ff": "Blue",
      ffc0cb: "Pink",
      a52a2a: "Brown",
      "808080": "Grey",
      ffa500: "Orange",
      "800080": "Purple",
    };
    return map[h] || null;
  }

  if (/^(rgb|rgba|hsl|hsla)\(/i.test(s)) return null;
  const cleaned = s.replace(/[^a-zA-Z\s-]/g, " ").replace(/\s+/g, " ").trim();
  return cleaned ? toTitleCase(cleaned) : null;
}

function makeAbsoluteUrl(url, websiteUrl) {
  if (!url) return null;
  const value = String(url).trim();
  if (!value || value.startsWith("data:")) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const base = String(websiteUrl || "https://thehappycase.store").replace(/\/$/, "");
  if (value.startsWith("/")) return `${base}${value}`;
  return `${base}/${value}`;
}

function getItemImageUrl(item, websiteUrl) {
  const raw =
    item.design_image ||
    item.designImage ||
    item.case_image ||
    item.caseImage ||
    item.image ||
    null;
  return makeAbsoluteUrl(raw, websiteUrl);
}

function getItemPins(item) {
  const pins = item.pinsDetails || item.pins || [];
  return Array.isArray(pins) ? pins : [];
}

function groupPins(pins) {
  const groups = new Map();
  for (const pin of pins) {
    if (!pin || typeof pin !== "object") continue;
    const name = pin.name || "Charm";
    const src = pin.src || pin.image || "";
    const key = `${name}|${src}`;
    if (!groups.has(key)) {
      groups.set(key, { name, src, count: 0, price: pin.price || 0 });
    }
    groups.get(key).count += 1;
  }
  return Array.from(groups.values());
}

function formatGBP(value) {
  return `£${Number(value || 0).toFixed(2)}`;
}

function getItemPrice(item) {
  const quantity = item.quantity || 1;
  if (item.total_price !== undefined) return parseFloat(item.total_price) || 0;
  if (item.unit_price !== undefined) return (parseFloat(item.unit_price) || 0) * quantity;
  if (item.totalPrice !== undefined) return (parseFloat(item.totalPrice) || 0) * quantity;
  if (item.price !== undefined) return (parseFloat(item.price) || 0) * quantity;
  return 0;
}

/**
 * Build rich HTML rows for order items (case/design image, details, charm thumbs).
 */
function buildOrderItemsEmailHtml(items, websiteUrl) {
  const itemsToDisplay = Array.isArray(items) ? items : [];
  if (itemsToDisplay.length === 0) {
    return `<tr><td style="padding:12px 14px;color:#475569;">(No items provided)</td><td></td></tr>`;
  }

  return itemsToDisplay
    .map((item) => {
      const name = escapeHtml(item.caseName || item.name || item.title || "Custom Case");
      const qty = item.quantity ?? 1;
      const caseImage = item.case_image || item.caseImage || item.image || null;
      const colorName = normalizeColorName(
        item.color || item.caseColor || item.colour || item.case_colour,
        caseImage
      );
      const customText = String(item.customText || item.custom_text || "").trim();
      const itemImageUrl = getItemImageUrl(item, websiteUrl);
      const pins = groupPins(getItemPins(item));
      const price = formatGBP(getItemPrice(item));

      const detailParts = [`Qty: ${qty}`];
      if (colorName) detailParts.push(`Color: ${escapeHtml(colorName)}`);
      if (item.caseType || item.case_type) {
        detailParts.push(`Style: ${escapeHtml(toTitleCase(item.caseType || item.case_type))}`);
      }
      if (customText) detailParts.push(`Name on case: &quot;${escapeHtml(customText)}&quot;`);

      const charmsHtml =
        pins.length > 0
          ? `<div style="margin-top:10px;">
              <div style="font-size:12px;font-weight:700;color:#334155;margin-bottom:6px;">Charms (${pins.reduce((s, p) => s + p.count, 0)})</div>
              <table role="presentation" style="border-collapse:collapse;">
                <tr>
                  ${pins
                    .map((pin) => {
                      const charmImg = makeAbsoluteUrl(pin.src, websiteUrl);
                      return `<td style="padding:0 8px 0 0;vertical-align:top;text-align:center;width:64px;">
                        ${
                          charmImg
                            ? `<img src="${escapeHtml(charmImg)}" alt="${escapeHtml(pin.name)}" width="48" height="48" style="width:48px;height:48px;object-fit:contain;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;display:block;margin:0 auto 4px;" />`
                            : `<div style="width:48px;height:48px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;margin:0 auto 4px;"></div>`
                        }
                        <div style="font-size:11px;color:#475569;line-height:1.3;max-width:60px;word-break:break-word;">
                          ${escapeHtml(pin.name)}${pin.count > 1 ? ` ×${pin.count}` : ""}
                        </div>
                      </td>`;
                    })
                    .join("")}
                </tr>
              </table>
            </div>`
          : "";

      return `<tr>
        <td style="padding:14px;border-bottom:1px solid #dbeafe;vertical-align:top;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tr>
              ${
                itemImageUrl
                  ? `<td style="width:92px;vertical-align:top;padding-right:12px;">
                      <img src="${escapeHtml(itemImageUrl)}" alt="${name}" width="80" height="100" style="width:80px;height:100px;object-fit:contain;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;display:block;" />
                    </td>`
                  : ""
              }
              <td style="vertical-align:top;">
                <div style="font-weight:700;color:#0f172a;font-size:15px;">${name}</div>
                <div style="color:#475569;font-size:13px;margin-top:4px;line-height:1.5;">
                  ${detailParts.join(" • ")}
                </div>
                ${charmsHtml}
              </td>
            </tr>
          </table>
        </td>
        <td style="padding:14px;border-bottom:1px solid #dbeafe;text-align:right;white-space:nowrap;font-weight:700;color:#0f172a;vertical-align:top;">
          ${price}
        </td>
      </tr>`;
    })
    .join("");
}

module.exports = {
  buildOrderItemsEmailHtml,
  makeAbsoluteUrl,
  getItemImageUrl,
  escapeHtml,
  formatGBP,
};
