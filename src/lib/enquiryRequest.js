/**
 * Turns the site's form state into the request the enquiry API expects. Kept apart from the
 * components so the mapping can be tested with plain Node (enquiryRequest.test.mjs).
 *
 *   Contact tab (and the product-page form)  -> POST /api/contact
 *   RFQ tab                                   -> POST /api/rfq   type "rfq"
 *   Export tab                                -> POST /api/rfq   type "export"
 *   /inquiry QR page                          -> POST /api/contact
 *
 * The API stores one `category`, and routes the lead to a rep by that exact name, so the FIRST
 * ticked category is sent as the category and, when more than one was ticked, the full list goes
 * into the message. /api/rfq has no subject field, so the RFQ and Export tabs carry the subject,
 * product and their extra inputs as labelled lines at the top of the message.
 */

const EXTRA_LABELS = {
  quantity: 'Quantity',
  deliveryTo: 'Delivery address',
  destinationPort: 'Destination port',
  volume: 'Volume',
};

const line = (label, value) => (String(value ?? '').trim() ? `${label}: ${String(value).trim()}` : null);

function withHeader(lines, message) {
  const head = lines.filter(Boolean);
  const body = String(message ?? '').trim();
  return head.length ? `${head.join('\n')}\n\n${body}` : body;
}

/**
 * @param kind   'contact' | 'product' | 'export' (EnquiryForm's TABS[].kind)
 * @param f      EnquiryForm state
 * @param fields the extra inputs the active tab shows (TABS[].fields)
 * @param phone  the phone number as it should be sent (dial code already added), or ''
 * @returns { path, body } without `meta`, which the caller adds
 */
export function enquiryFormRequest(kind, f, fields, phone) {
  const cats = f.categories || [];
  const allCats = cats.length > 1 ? line('Product categories', cats.join(', ')) : null;
  const common = {
    name: f.name.trim(),
    email: f.email.trim(),
    company: f.company.trim(),
    phone,
    country: f.country.trim(),
    category: cats[0] || '',
  };

  if (kind === 'contact') {
    return {
      path: '/api/contact',
      body: { ...common, subject: f.subject.trim(), message: withHeader([line('Product', f.product), allCats], f.message) },
    };
  }

  const extras = (fields || []).map((k) => line(EXTRA_LABELS[k] || k, f[k]));
  return {
    path: '/api/rfq',
    body: {
      ...common,
      type: kind === 'export' ? 'export' : 'rfq',
      message: withHeader([line('Subject', f.subject), line('Product', f.product), ...extras, allCats], f.message),
    },
  };
}

/** The standalone /inquiry page (printed QR code). Its "Inquiry type" becomes the subject. */
export function inquiryPageRequest(f) {
  const type = f.inquiryType.trim();
  return {
    path: '/api/contact',
    body: {
      name: f.name.trim(),
      email: f.email.trim(),
      company: f.company.trim(),
      phone: f.phone.trim(),
      country: f.country.trim(),
      subject: type ? `${type} (QR inquiry page)` : 'QR inquiry page',
      category: '',
      message: f.message.trim(),
    },
  };
}
