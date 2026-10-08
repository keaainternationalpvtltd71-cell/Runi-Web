/**
 * The form -> API mapping. Run with Node's built-in runner:
 *
 *     npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { enquiryFormRequest, inquiryPageRequest } from './enquiryRequest.js';

const form = (over = {}) => ({
  name: ' Jan de Vries ', company: 'Bouw BV', email: 'jan@bouw.nl ', country: 'Netherlands', phone: '',
  subject: 'Ringlock ledgers', categories: [], product: '', quantity: '', deliveryTo: '',
  destinationPort: '', volume: '', message: 'Do you have 200 in stock?', ...over,
});

test('the contact tab posts to /api/contact with its subject', () => {
  const { path, body } = enquiryFormRequest('contact', form(), [], '');
  assert.equal(path, '/api/contact');
  assert.equal(body.subject, 'Ringlock ledgers');
  assert.equal(body.name, 'Jan de Vries');
  assert.equal(body.email, 'jan@bouw.nl');
  assert.equal(body.message, 'Do you have 200 in stock?');
  assert.equal(body.category, '');
  assert.equal('type' in body, false);
});

test('the product-page form names the product in the message', () => {
  const { body } = enquiryFormRequest('contact', form({ product: 'Ringlock ledger 2.07 m (RL-207)' }), [], '');
  assert.equal(body.message, 'Product: Ringlock ledger 2.07 m (RL-207)\n\nDo you have 200 in stock?');
});

test('the RFQ tab posts to /api/rfq as rfq, subject and extras on top of the message', () => {
  const { path, body } = enquiryFormRequest(
    'product', form({ quantity: '200 pcs', deliveryTo: 'Utrecht, NL' }), ['quantity', 'deliveryTo'], '+31 612345678',
  );
  assert.equal(path, '/api/rfq');
  assert.equal(body.type, 'rfq');
  assert.equal(body.phone, '+31 612345678');
  assert.equal('subject' in body, false);
  assert.equal(body.message,
    'Subject: Ringlock ledgers\nQuantity: 200 pcs\nDelivery address: Utrecht, NL\n\nDo you have 200 in stock?');
});

test('the export tab posts to /api/rfq as export and leaves empty extras out', () => {
  const { path, body } = enquiryFormRequest('export', form({ destinationPort: 'Gdańsk' }), ['destinationPort', 'volume'], '');
  assert.equal(path, '/api/rfq');
  assert.equal(body.type, 'export');
  assert.equal(body.message, 'Subject: Ringlock ledgers\nDestination port: Gdańsk\n\nDo you have 200 in stock?');
});

test('the first category routes the lead; several are all listed in the message', () => {
  const one = enquiryFormRequest('contact', form({ categories: ['Aluminium Solutions'] }), [], '').body;
  assert.equal(one.category, 'Aluminium Solutions');
  assert.equal(one.message, 'Do you have 200 in stock?');

  const two = enquiryFormRequest('contact', form({ categories: ['Scaffolding', 'Aluminium Solutions'] }), [], '').body;
  assert.equal(two.category, 'Scaffolding');
  assert.equal(two.message, 'Product categories: Scaffolding, Aluminium Solutions\n\nDo you have 200 in stock?');
});

test('the QR page posts to /api/contact with its inquiry type as the subject', () => {
  const f = { name: 'Ana', company: '', email: 'ana@example.com', phone: '+32 470 12 34 56', country: 'Belgium', inquiryType: 'Request a quote', message: ' Props, 50 pcs ' };
  const { path, body } = inquiryPageRequest(f);
  assert.equal(path, '/api/contact');
  assert.equal(body.subject, 'Request a quote (QR inquiry page)');
  assert.equal(body.message, 'Props, 50 pcs');
  assert.equal(inquiryPageRequest({ ...f, inquiryType: '' }).body.subject, 'QR inquiry page');
});
