/**
 * RUNI category copy. Same shape as KEAA's categoryPillars.js (intro, sections, faqs) so
 * CategoryPillar.jsx renders it unchanged. Every sentence is RUNI specific: stock, Eindhoven,
 * EU delivery, small quantities, custom on request. Facts: old runiindustries.eu and the
 * product data. Standards named only where the product data cites them.
 */
import { aluminiumIntro } from './aluminium.js';

export const categoryPillars = {
  'scaffolding-formworks': {
    intro:
      'Scaffolding and formwork parts are bought in a hurry. A contractor short of ledgers on a Monday cannot wait six weeks for a container. RUNI Industries holds the common system scaffold, frame, prop and coupler lines in its Eindhoven warehouse so they can be on a Dutch, Belgian or German site within days, and sources the rest to order through its manufacturing partners.',
    sections: [
      { heading: 'What we supply', body: 'Ringlock, Cuplock and HK system components, H frame and Euro frame access scaffolds, shoring towers, base jacks and U heads, adjustable steel props, fork heads and tripods for slab formwork, wall formwork clamps and panels, and scaffold couplers in European and British patterns. Every item listed under this category is a live line, either on the shelf in Eindhoven or available to order.' },
      { heading: 'Standards and finish', body: 'Props supplied to EN 1065, couplers to EN 74-1 or BS 1139 depending on the pattern, and hot dip galvanised finish to EN ISO 1461. Ask for the class and length when you request a quote for props; the two together define the item.' },
      { heading: 'Who buys from RUNI', body: 'Scaffolding contractors and rental fleets in the Benelux and Germany, formwork specialists, builders merchants, and site managers who need a mixed pallet rather than a full container. Small quantities are welcome; bulk and container orders are arranged direct from the factory.' },
      { heading: 'Why a European stockist', body: 'One invoice in euros with Dutch VAT, one delivery from Eindhoven, and someone to call in your time zone if the load is wrong. For repeat items we hold stock; for special lengths, colours or drawings we manage the manufacturing and the import so you do not have to.' },
    ],
    faqs: [
      { q: 'Do you deliver outside the Netherlands?', a: 'Yes. Deliveries go across the Benelux, Germany and the rest of Europe by road; full container loads can also ship direct from the factory to a European port.' },
      { q: 'Is there a minimum order?', a: 'No fixed minimum for stock items. Custom manufactured items have a minimum that depends on the item; ask when requesting a quote.' },
      { q: 'Will your parts fit our existing Ringlock or Cuplock stock?', a: 'Usually yes. Send the system, the dimensions and a photo of the connection with your enquiry and we confirm compatibility before quoting.' },
      { q: 'How quickly can you quote?', a: 'Stock items within one working day. Custom items after we have confirmed the specification with the manufacturer.' },
    ],
  },
  'livestock-housing-solutions': {
    intro:
      'Farm equipment is bought against a building programme, not a catalogue. RUNI Industries supplies cattle cubicles, headlocks, feed barriers, calf pens, sheep hurdles, pig penning, stable components and field gates to farms, agricultural dealers and shed builders across the Netherlands, Belgium and Germany, from stock in Eindhoven where the lines are standard and to order where a shed needs its own dimensions.',
    sections: [
      { heading: 'What we supply', body: 'Cattle cubicles and dividers, self locking headlocks and feed barriers, troughs and round feeders, calf pens and pail rings, sheep panels, headlocks, hay baskets and race sections, pig farrowing and gestation penning, stable partitions, and galvanised field and pasture gates with posts and fittings.' },
      { heading: 'Materials and finish', body: 'Heavy gauge steel, hot dip galvanised to EN ISO 1461 after welding so seams and cut ends are coated. Welds are dressed smooth at animal height. We do not quote load figures on range pages; the item pages and your enquiry carry those.' },
      { heading: 'Who buys from RUNI', body: 'Dairy and beef farms, agricultural dealers, shed builders and installers in the Benelux and Germany, and farm supply distributors elsewhere in Europe who need a European stock point rather than an Asian import of their own.' },
      { heading: 'Layout and quantities', body: 'Send the shed plan or the number of cubicle places and we work out the parts list. Standard cubicle, headlock and gate sizes are stocked; bespoke lengths and complete shed sets are manufactured to order and delivered as one consignment.' },
    ],
    faqs: [
      { q: 'Can you supply a complete cubicle house?', a: 'Yes. Send the shed dimensions and the number of places and we prepare a full parts list and quotation, including feed barriers and gates.' },
      { q: 'Are the headlocks self locking?', a: 'The main headlock range is self locking with a heifer safety option. Details are on each item page.' },
      { q: 'Which sizes of field gate do you stock?', a: 'Common metric widths are stocked in Eindhoven; other widths and adjustable gates are made to order.' },
      { q: 'Do you install?', a: 'No. We supply to farms and installers and can recommend installers in the Benelux on request.' },
    ],
  },
  'garden-hardware': {
    intro:
      'Post supports, ground anchors and post caps are the fast moving hardware lines for fencing, decking, pergola and timber frame trade. RUNI Industries supplies them to builders merchants, timber yards, fencing contractors and online retailers across Europe from Eindhoven stock, in trade quantities and, for larger customers, under their own label.',
    sections: [
      { heading: 'What we supply', body: 'Bolt down and concrete in post supports, adjustable post supports, spiral and bolt type ground anchors, ground plates, post caps and finials, and garden accessories, in the standard post sizes used across the Benelux, Germany and France.' },
      { heading: 'Materials and finish', body: 'Structural steel to EN 10025-2 for the post support ranges, hot dip galvanised to EN ISO 1461 or electro galvanised depending on the item. Finish is stated on each product page.' },
      { heading: 'Trade, wholesale and private label', body: 'Sold by the carton or the pallet to merchants and dealers. Larger customers can take own brand packaging and barcodes; ask for the private label option when you enquire.' },
      { heading: 'Why buy from a stockist', body: 'Seasonal demand peaks in spring. Holding stock in Eindhoven means merchants can reorder in March and have goods in April rather than June.' },
    ],
    faqs: [
      { q: 'Which post sizes do you cover?', a: 'The common European square and round timber post sizes. Each item page lists the internal dimensions; send yours if unsure.' },
      { q: 'Do you sell to consumers?', a: 'No. RUNI Industries supplies trade, wholesale and retail businesses. Consumers can buy the range through the retailers we supply.' },
      { q: 'Can we get our own brand on the packaging?', a: 'Yes, for regular volumes. Ask about private label when you request a quote.' },
    ],
  },
  'wood-connectors': {
    intro:
      'Joist hangers, angle brackets and perforated plates are bought by timber frame builders, roofers and merchants in volume and to a schedule. RUNI Industries supplies the common European connector patterns from Eindhoven stock and manufactures special sizes to order.',
    sections: [
      { heading: 'What we supply', body: 'Joist hangers in standard European widths, angle brackets and reinforced angle brackets, perforated plates and straps, and the fixings that go with them.' },
      { heading: 'Materials and finish', body: 'Zinc coated steel sheet to EN 10346 for pressed connectors; hot dip galvanised for heavier items. The grade and coating are stated per item.' },
      { heading: 'Who buys from RUNI', body: 'Timber frame manufacturers, roofing and carpentry contractors, builders merchants and DIY chains in the Benelux and Germany, and distributors elsewhere in Europe.' },
    ],
    faqs: [
      { q: 'Do you stock the full width range of joist hangers?', a: 'The common widths are stocked; less common widths and heavy duty types are made to order.' },
      { q: 'Are the connectors CE marked?', a: 'Ask per item when you enquire; we confirm the applicable declaration for each connector before quoting.' },
    ],
  },
  aluminium: {
    intro: aluminiumIntro,
    sections: [
      { heading: 'What we supply', body: 'Complete RALUTECH rolling towers in 75 × 250 cm and 150 × 250 cm, from 450 cm to 850 cm working height, each with a fixed parts list. Every frame, brace, deck, castor, ladder, toe board, stabiliser and clip is also available separately by article number. The RALUTECH Pro / Profi and R Telescopic systems complete the range.' },
      { heading: 'How the tower works', body: 'A plug-in system that mounts without tools. The forward-running construction lets one person build the tower up to 6 m working height, platforms with a hatch give a closed work surface, and the lockable castors let the tower be repositioned when required.' },
      { heading: 'Where it is used', body: 'Construction, maintenance, painting and installation work: any task at height that needs a safe, stable and movable working platform.' },
    ],
  },
};
