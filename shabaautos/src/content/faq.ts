export interface FAQItem {
  question: string;
  /** Each item is a source paragraph; strings prefixed with "- " are source list items. */
  answer: string[];
}

export interface FAQCategory {
  name: string;
  questions: FAQItem[];
  note?: string[];
}

export const faqCategories: FAQCategory[] = [
  {
    name: 'General',
    questions: [
      {
        question: 'What is ShabaAutos?',
        answer: ['ShabaAutos is an automotive marketplace connecting buyers, sellers, renters, vehicle owners and automotive partners. Our services include vehicle sales, rentals, vehicle imports and third-party vehicle listings.'],
      },
      {
        question: 'Do I need an account to use ShabaAutos?',
        answer: ['You can browse available vehicles without an account. Some services, including listing vehicles, managing bookings, submitting import requests and accessing dealer features, may require registration.'],
      },
      {
        question: 'How can I contact ShabaAutos?',
        answer: ['You can contact our team through the contact details provided on the website or use the WhatsApp support option for assistance.'],
      },
    ],
  },
  {
    name: 'Buying a Car',
    questions: [
      {
        question: 'Can I buy vehicles directly from ShabaAutos?',
        answer: ['Yes. ShabaAutos may list vehicles offered directly by us as well as vehicles offered by verified dealers and third-party sellers.'],
      },
      {
        question: 'Are all vehicles on ShabaAutos owned by ShabaAutos?',
        answer: ['No. Some vehicles may belong to ShabaAutos, while others may be listed by dealers, businesses or private sellers. The relevant vehicle listing will identify the seller where applicable.'],
      },
      {
        question: 'Can I inspect a vehicle before buying?',
        answer: ['Yes. Buyers should inspect a vehicle or arrange an appropriate vehicle inspection before completing a purchase.'],
      },
      {
        question: 'Does ShabaAutos verify vehicles?',
        answer: ['ShabaAutos may provide or facilitate vehicle verification and inspection services on selected vehicles. Where verification has been completed, this should be clearly indicated on the listing.'],
      },
      {
        question: 'Does ShabaAutos provide vehicle finance?',
        answer: ["ShabaAutos may work with approved finance partners to provide financing options. Availability and eligibility will depend on the finance provider's requirements."],
      },
    ],
  },
  {
    name: 'Selling a Car',
    questions: [
      {
        question: 'Can I sell my car through ShabaAutos?',
        answer: ['Yes. Individuals, dealers and businesses can apply to list eligible vehicles on the ShabaAutos marketplace.'],
      },
      {
        question: 'Do I have to pay to list my vehicle?',
        answer: ['Listing charges may apply depending on the type of listing, seller category and promotional options selected. Any applicable fee will be shown before you confirm your listing.'],
      },
      {
        question: 'Does ShabaAutos charge a commission when my vehicle is sold?',
        answer: ['A service or transaction fee may apply to certain sales facilitated through ShabaAutos. Where applicable, the fee will be communicated before you agree to the service.'],
      },
      {
        question: 'Can I pay to promote my vehicle?',
        answer: ['Yes. Featured and priority listing options may be available to give eligible vehicles greater visibility across the platform.'],
      },
      {
        question: 'How long will my vehicle remain listed?',
        answer: ['The listing duration will depend on the listing package or membership plan selected. You will be informed of the applicable period before publication.'],
      },
    ],
  },
  {
    name: 'Dealer Membership',
    questions: [
      {
        question: 'Who can become a ShabaAutos Dealer Member?',
        answer: ['Vehicle dealers, dealerships and eligible automotive businesses can apply for dealer membership.'],
      },
      {
        question: 'Why should I become a Dealer Member?',
        answer: [
          'Dealer membership is designed for businesses that regularly sell vehicles and want to manage multiple listings through ShabaAutos.',
          'Depending on your plan, membership may include:',
          '- Multiple vehicle listings',
          '- Dealer profile',
          '- Dealer dashboard',
          '- Customer enquiries',
          '- Listing management',
          '- Featured listing opportunities',
          '- Verified dealer status where applicable',
          '- Listing and enquiry performance information',
          '- Priority support',
        ],
      },
      {
        question: 'How much does ShabaAutos Dealer Membership cost?',
        answer: ['ShabaAutos will offer different membership plans based on listing volume and available features. Current pricing will be displayed on the Membership page before subscription.'],
      },
      {
        question: 'Will dealers have their own dashboard?',
        answer: ['Yes. Registered dealer members will be able to access a dashboard to manage their profile, vehicles, listings, enquiries, membership and payments.'],
      },
      {
        question: 'Can I cancel my membership?',
        answer: ['Yes, subject to the applicable membership terms. Cancellation will normally prevent future renewal but will not necessarily result in a refund for an active subscription period.'],
      },
      {
        question: 'Can I upgrade or downgrade my membership?',
        answer: ['Where different membership tiers are available, members may be able to change their plan through their account or by contacting ShabaAutos.'],
      },
      {
        question: 'Does paying for membership automatically make me a verified dealer?',
        answer: ['No. Payment for membership and dealer verification are separate. ShabaAutos may require identity, business or other verification before awarding verified status.'],
      },
    ],
  },
  {
    name: 'Renting a Vehicle',
    questions: [
      {
        question: 'Can I rent vehicles through ShabaAutos?',
        answer: ['Yes. ShabaAutos provides access to vehicles available for short-term or longer rental, subject to availability and rental requirements.'],
      },
      {
        question: 'What do I need to rent a vehicle?',
        answer: ['Requirements may include valid identification, a valid driving licence, payment details and any additional documentation required for the selected vehicle.'],
      },
      {
        question: 'Is a security deposit required?',
        answer: ['A refundable security deposit may be required for certain vehicles. The amount and refund conditions will be explained before booking.'],
      },
      {
        question: 'Can someone else drive the rented vehicle?',
        answer: ['Only drivers approved under the rental agreement should drive the vehicle.'],
      },
      {
        question: 'What happens if the vehicle is damaged during the rental?',
        answer: ['Any accident or damage should be reported immediately. Liability will be determined according to the rental agreement, insurance arrangements and circumstances of the incident.'],
      },
    ],
  },
  {
    name: 'Vehicle Import',
    questions: [
      {
        question: 'Can ShabaAutos help me import a vehicle?',
        answer: ['Yes. ShabaAutos can assist customers with vehicle sourcing and the import process, subject to the specific service selected.'],
      },
      {
        question: 'Which countries can ShabaAutos import vehicles from?',
        answer: ['Available sourcing markets may vary. Contact ShabaAutos with the vehicle specification and preferred country so we can confirm available options.'],
      },
      {
        question: 'What does the import service fee cover?',
        answer: ['Depending on the service agreed, fees may cover sourcing assistance, vehicle verification, purchasing support, shipping coordination, documentation and other import-related services.'],
      },
      {
        question: 'Are shipping and customs charges included in the vehicle price?',
        answer: ['Not necessarily. Vehicle cost, shipping, customs duties, clearing and ShabaAutos service charges should be clearly identified in your quotation before you proceed.'],
      },
      {
        question: 'How long does vehicle importation take?',
        answer: ["Timescales depend on vehicle location, purchasing, shipping schedules, port processing, customs clearance and other factors outside ShabaAutos' direct control. An estimated timeframe will be provided for your transaction."],
      },
      {
        question: 'Can I track my imported vehicle?',
        answer: ['Where tracking information is available, ShabaAutos will provide relevant progress updates during the import process.'],
      },
    ],
  },
  {
    name: 'Payments and Fees',
    questions: [
      {
        question: 'Is it free to browse vehicles on ShabaAutos?',
        answer: ['Yes. Customers can browse available vehicles without paying a membership fee.'],
      },
      {
        question: 'Do buyers pay a membership subscription?',
        answer: ['Ordinary buyers do not need a paid membership simply to browse or enquire about vehicles. Charges may apply when purchasing additional services.'],
      },
      {
        question: 'What services may attract additional charges?',
        answer: ['Charges may apply for services including dealer membership, vehicle listings, featured listings, inspections, verification, rental bookings, import services and other optional services.'],
      },
      {
        question: 'How will I know what I am being charged?',
        answer: ['Applicable charges should be disclosed before you confirm a paid service or transaction.'],
      },
      {
        question: 'Are payments refundable?',
        answer: ['Refund eligibility depends on the service purchased and the circumstances of the cancellation. Please refer to the applicable cancellation and refund terms.'],
      },
    ],
  },
  {
    name: 'Verification and Safety',
    questions: [
      {
        question: 'How does ShabaAutos protect buyers?',
        answer: ['ShabaAutos may use seller verification, vehicle documentation checks, inspection services and other controls to improve marketplace trust. Buyers should still conduct appropriate checks before completing a transaction.'],
      },
      {
        question: 'How do I know whether a dealer is verified?',
        answer: ['Verified dealers may display a ShabaAutos verification indicator on their profile or listings.'],
      },
      {
        question: 'Should I pay a seller outside ShabaAutos?',
        answer: ['Customers should follow the payment process communicated by ShabaAutos. Be cautious of sellers requesting payments through unapproved channels.'],
      },
      {
        question: 'What should I do if I see a suspicious listing?',
        answer: ['Do not make payment. Report the listing to ShabaAutos immediately through the available support channel.'],
      },
    ],
  },
  {
    name: 'Still Need Help?',
    questions: [],
    note: [
      'Our team is available to help with buying, selling, renting, importing vehicles and dealer membership.',
      'Contact ShabaAutos or speak with us on WhatsApp.',
    ],
  },
];

export const faqSourceNotice = 'Fees, eligibility requirements and service availability may change. Applicable charges and terms will be shown before a customer enters into a paid service or transaction.';
