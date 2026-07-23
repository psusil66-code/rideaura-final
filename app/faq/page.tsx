const faqs = [
  {
    question: '1. What documents are required to rent a self-drive car or bike?',
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
    question: '4. How do I book a car or bike?',
    answer: 'You can search vehicles on the website, submit the booking request form, or contact Ride Aura directly on WhatsApp. The team confirms availability, documents, payment and pickup details before final handover.'
  },
  {
    question: '5. Do you provide pickup and drop service?',
    answer: 'Pickup and drop service is available within Bhubaneswar. Extra charges may apply based on distance and location. Airport and railway station pickup support is available as per booking confirmation.'
  },
  {
    question: '6. Can I drive outside Bhubaneswar?',
    answer: 'Yes, cars and bikes can be used for Odisha trips including Puri, Konark, Chilika and other permitted destinations, subject to booking terms, kilometer limits and route approval where applicable.'
  },
  {
    question: '7. What is included in the rental price?',
    answer: 'Rental price normally covers vehicle usage for the selected time plan. Fuel, tolls, parking, state permits, traffic fines and extra kilometer or late return charges are generally paid by the customer unless specifically included.'
  },
  {
    question: '7A. What is the minimum booking duration?',
    answer: 'The minimum booking duration for Ride Aura cars and bikes is 12 hours. Customers should select pickup and return timing accordingly before submitting a booking request.'
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
  },
  {
    question: '14. Are there kilometre limits?',
    answer: 'Kilometre limits may depend on the selected rental plan, car category and booking duration. Any extra kilometre charges, if applicable, will be communicated by Ride Aura before confirmation.'
  },
  {
    question: '15. Can I extend my booking?',
    answer: 'Yes, booking extension can be requested before the scheduled return time. Extension approval depends on car availability, payment confirmation and Ride Aura approval.'
  },
  {
    question: '16. Who can drive the vehicle?',
    answer: 'Only the renter or a verified authorised driver approved for the booking may drive the vehicle. Sub-letting or allowing an unauthorised person to drive may lead to deposit forfeiture and additional liability.'
  },
  {
    question: '17. Which activities are not allowed?',
    answer: 'The vehicle must not be used for racing, towing, taxi service, commercial goods carrying, product promotion, illegal activity, drunk driving, drug-influenced driving or any activity prohibited by law or Ride Aura terms.'
  },
  {
    question: '18. Are pets, arms or banned substances allowed?',
    answer: 'No. Customers are not allowed to carry arms, ammunitions, banned drugs or pets in Ride Aura vehicles. Penalties may apply if prohibited items or misuse are found.'
  },
  {
    question: '19. Are there restricted travel areas?',
    answer: 'Phulbani, Koraput and Malkangiri belts in Odisha are restricted areas for Ride Aura bookings. A booking for these restricted areas may be treated as cancelled.'
  },
  {
    question: '20. Who pays traffic fines or challans?',
    answer: 'The customer is responsible for traffic fines, parking fines, toll violations, e-challans and penalties during the rental period. Ride Aura may recover such amounts even if the challan is received later.'
  },
  {
    question: '21. Is smoking or drinking allowed inside the vehicle?',
    answer: 'No. Smoking, drinking and drugs are not allowed inside Ride Aura vehicles. Cleaning charges or penalties may apply if smell, stains, prohibited items or related evidence are found.'
  },
  {
    question: '22. What should I check before taking delivery?',
    answer: 'Customers should check the car condition, fuel level, documents, photos/videos, accessories and existing damage before handover. Any concern should be reported to Ride Aura immediately.'
  },
  {
    question: '23. What happens if I miss pickup time?',
    answer: 'If the customer does not collect the vehicle within the permitted pickup window and does not inform Ride Aura, the booking may be treated as a no-show and applicable charges may apply.'
  },
  {
    question: '24. Can Ride Aura cancel or change a booking?',
    answer: 'Ride Aura may offer an alternate vehicle or cancel/refund where a car becomes unavailable due to breakdown, maintenance, accident, documentation issue, safety concern or unavoidable operational reason.'
  }
];

export default function FaqPage() {
  return (
    <main>
      <section className="section terms-hero">
        <div className="container">
          <span className="eyebrow">Ride Aura FAQ</span>
          <h1>Frequently Asked Questions</h1>
          <p>Everything customers should know before booking a Ride Aura self-drive car or bike in Bhubaneswar and across Odisha.</p>
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
