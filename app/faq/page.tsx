const faqs = [
  {
    question: '1. What documents are required to rent a self-drive car?',
    answer: 'A valid driving licence, Aadhaar card or another government-issued identity proof, and address verification may be required before vehicle handover. Ride Aura may request additional verification depending on the booking.'
  },
  {
    question: '2. What is the minimum age for booking?',
    answer: 'The customer should be legally eligible to drive in India and must carry an original valid driving licence during the rental period. Age and document checks are confirmed before handover.'
  },
  {
    question: '3. Is there a security deposit?',
    answer: 'Yes, a refundable security deposit may apply depending on the selected car, rental duration and verification. Deductions may apply for damage, challans, fuel shortage, late return or policy violations.'
  },
  {
    question: '4. How do I book a car?',
    answer: 'You can search cars on the website, submit the booking request form, or contact Ride Aura directly on WhatsApp. The team confirms availability, documents, payment and pickup details before final handover.'
  },
  {
    question: '5. Do you provide pickup and drop service?',
    answer: 'Pickup and drop service is available within Bhubaneswar. Extra charges may apply based on distance and location. Airport and railway station pickup support is available as per booking confirmation.'
  },
  {
    question: '6. Can I drive outside Bhubaneswar?',
    answer: 'Yes, cars can be used for Odisha trips including Puri, Konark, Chilika and other permitted destinations, subject to booking terms, kilometer limits and route approval where applicable.'
  },
  {
    question: '7. What is included in the rental price?',
    answer: 'Rental price normally covers vehicle usage for the selected time plan. Fuel, tolls, parking, state permits, traffic fines and extra kilometer or late return charges are generally paid by the customer unless specifically included.'
  },
  {
    question: '8. What is the fuel policy?',
    answer: 'Fuel is usually the customer responsibility unless a special package says otherwise. The vehicle should be returned as per the fuel level or fuel policy communicated during booking.'
  },
  {
    question: '9. What happens if I return the car late?',
    answer: 'Late return charges may apply. If you need more time, please contact Ride Aura before the scheduled return time. Extensions depend on vehicle availability and approval.'
  },
  {
    question: '10. What if the car is damaged or there is an accident?',
    answer: 'Inform Ride Aura immediately. The customer must cooperate with photos, videos, police reporting, insurance documentation and other claim requirements. Charges may apply as per damage, insurance and rental terms.'
  },
  {
    question: '11. Are there driving restrictions?',
    answer: 'Rash driving, racing, overloading, towing, commercial use, illegal activity, drunk driving and driving by an unauthorized person are not allowed. The customer must follow traffic laws and use the vehicle responsibly.'
  },
  {
    question: '12. What is the cancellation policy?',
    answer: 'Cancellation and refund depend on how early the booking is cancelled, vehicle allocation and payment terms. Convenience charges or non-refundable charges may be deducted where applicable.'
  },
  {
    question: '13. How can I contact Ride Aura?',
    answer: 'You can call +91 91140 30650 or +91 63716 00719, email booking@rideauraselfdrive.co.in, or visit Plot No-1155/3939, Soubhagya Nagar, Bank Colony, Near SBI ATM, Delta, Bhubaneswar, Odisha - 751003.'
  }
];

export default function FaqPage() {
  return (
    <main>
      <section className="section terms-hero">
        <div className="container">
          <span className="eyebrow">Ride Aura FAQ</span>
          <h1>Frequently Asked Questions</h1>
          <p>Everything customers should know before booking a Ride Aura self-drive car in Bhubaneswar and across Odisha.</p>
        </div>
      </section>
      <section className="section band">
        <div className="container">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details open={index === 0} key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <style>{`.terms-hero{background:linear-gradient(110deg,rgba(7,22,45,.94),rgba(7,22,45,.76)),linear-gradient(135deg,#fff8ec,#f5b846);color:#fff}.terms-hero h1{font-size:clamp(38px,5vw,62px);line-height:1;margin:12px 0}.terms-hero p{max-width:850px;color:#eef6ff;font-size:18px;line-height:1.65}`}</style>
    </main>
  );
}
