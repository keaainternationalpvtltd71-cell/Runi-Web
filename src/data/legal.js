/**
 * Legal pages, structured the same way as the reference set: an eyebrow, a titled document,
 * H3 sections and a "last updated" line.
 *
 * The wording describes what THIS build actually does, checked against the source rather than
 * copied across: no cookies and no browser storage are set anywhere in the app; Google
 * Analytics only loads when VITE_GA_ID is populated (it is empty, so nothing loads today);
 * the Contact page embeds a Google Map directly; enquiry submissions POST to RUNI's own
 * endpoint; product imagery and the certification marks are delivered by Cloudinary; fonts
 * are served from the site itself, so no font provider receives visitor data.
 */

export const LAST_UPDATED = 'September 2026';

export const legalDocs = {
  'privacy-policy': {
    title: 'Privacy Policy for runiindustries.eu',
    sections: [
      {
        heading: 'Who We Are',
        body: 'RUNI Industries B.V. (Park Forum 1005, 5657 HJ Eindhoven, The Netherlands) is the controller of personal data collected through this website. You can reach us about any privacy matter at info@runiindustries.eu.',
      },
      {
        heading: 'Information We Collect',
        body: 'We collect the information you give us directly: your name, company, email address, phone number and the content of your message when you send an enquiry, request a quotation, or apply for a role. We do not ask for, and ask that you do not send, confidential or special-category information through these forms.',
      },
      {
        heading: 'How We Use Your Information, and On What Basis',
        body: 'Information submitted through our forms is used only to answer your enquiry, prepare quotations, fulfil orders and assess job applications. We rely on the steps necessary to enter into or perform a contract where you are requesting a quotation or placing an order, and on our legitimate interest in responding to business enquiries addressed to us. Where we ask for consent, you may withdraw it at any time.',
      },
      {
        heading: 'Cookies and Local Storage',
        body: 'This website sets no cookies of its own and stores nothing in your browser: no advertising cookies, no tracking pixels, and no local or session storage. Our Contact page embeds a Google Map, which loads from Google and therefore shares your IP address with Google. If we enable website analytics in future, this policy and the cookie policy will be updated and consent will be requested before anything is set.',
      },
      {
        heading: 'Third Parties and International Transfers',
        body: 'We do not sell or rent your personal information. Data may be shared with our logistics, freight and customs partners strictly to fulfil an order you have placed, and with our manufacturing partners where an item is produced to your specification. This website relies on Cloudinary, which delivers our product imagery and certification marks, and on Google, which provides the optional map on the Contact page. Enquiries are sent to our own application backend. Fonts and stylesheets are served from our own servers, so no font provider receives your data. Where information is transferred outside the European Economic Area, we rely on appropriate safeguards such as the European Commission’s Standard Contractual Clauses.',
      },
      {
        heading: 'How Long We Keep It',
        body: 'Enquiry and quotation records are kept for as long as needed to serve the commercial relationship and to meet our legal and tax obligations under Dutch law, and are then deleted. Job applications are kept for the duration of the recruitment process unless you ask us to hold them on file.',
      },
      {
        heading: 'Your Rights',
        body: 'You have the right to access, correct, erase, restrict or object to our processing of your personal data, the right to data portability, and the right to withdraw consent at any time without affecting processing already carried out. To exercise any of these, write to info@runiindustries.eu. You also have the right to complain to the Dutch supervisory authority, the Autoriteit Persoonsgegevens, or to the authority in your country of residence.',
      },
      {
        heading: 'Contact',
        body: 'For any privacy-related question, contact us at info@runiindustries.eu or write to RUNI Industries B.V., Park Forum 1005, 5657 HJ Eindhoven, The Netherlands.',
      },
    ],
  },

  'cookie-policy': {
    title: 'Cookie Policy for runiindustries.eu',
    sections: [
      {
        heading: 'What This Policy Covers',
        body: 'This policy explains the cookies and browser storage this website uses. In short: we set none. There are no advertising or tracking cookies, no analytics tool is running, and nothing you do here is used to profile you.',
      },
      {
        heading: 'What We Store, and Why',
        body: 'This site stores nothing in your browser. It sets no cookies, and uses neither local storage nor session storage. Navigating the catalogue, searching, filtering a category and sending an enquiry all work without anything being written to your device.',
      },
      {
        heading: 'Optional: Google Maps',
        body: 'Our Contact page embeds a Google Map so you can find the Eindhoven warehouse. That map is loaded from Google, and loading it shares your IP address with Google under Google’s own terms. If you would rather not load it, the same address is printed in text beside the map and in the footer of every page.',
      },
      {
        heading: 'If This Changes',
        body: 'If we add website analytics or any other non-essential technology, we will ask for your consent before it is set, list it here, and give you a way to withdraw that consent.',
      },
      {
        heading: 'Contact',
        body: 'For any question about cookies or storage on this site, contact us at info@runiindustries.eu.',
      },
    ],
  },

  terms: {
    title: 'Terms & Conditions for runiindustries.eu',
    sections: [
      {
        heading: 'Use of Website',
        body: 'This website and its content are provided by RUNI Industries B.V. for general information about our products and services. By using this site you agree to use it only for lawful purposes.',
      },
      {
        heading: 'Product Specifications',
        body: 'All product specifications, dimensions, finishes and standards shown on this site are provided for reference. Items are supplied against the specification confirmed on your quotation and order acknowledgement, which prevails over anything published here. We reserve the right to update designs and specifications without prior notice in line with engineering improvements.',
      },
      {
        heading: 'Quotations & Orders',
        body: 'Quotations are subject to confirmation and to our terms of sale current at the time of order. Stock availability, lead times and prices communicated through this website are indicative until confirmed in writing. Orders are accepted only once we have acknowledged them.',
      },
      {
        heading: 'Delivery and Documentation',
        body: 'Deliveries are made on the incoterms stated on the order acknowledgement. Certificates of conformity, mill certificates and test reports are supplied on request with the consignment.',
      },
      {
        heading: 'Intellectual Property',
        body: 'The content, layout and imagery of this website are the property of RUNI Industries B.V. or are used with permission, and may not be reproduced without our written consent.',
      },
      {
        heading: 'Governing Law',
        body: 'These terms are governed by Dutch law. Disputes arising from them are subject to the jurisdiction of the competent court in the Netherlands.',
      },
      {
        heading: 'Contact',
        body: 'Questions about these terms can be sent to info@runiindustries.eu.',
      },
    ],
  },
};
