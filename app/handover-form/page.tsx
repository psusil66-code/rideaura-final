'use client';

const checklistItems = [
  'RC Book / Smart Card',
  'Insurance Copy',
  'Pollution Certificate',
  'Fitness / Permit if applicable',
  'FASTag status',
  'Spare Wheel',
  'Jack and Tool Kit',
  'First Aid Kit',
  'Floor Mats',
  'Vehicle Key',
  'Spare Key if provided'
];

const conditionAreas = [
  'Front bumper / grille',
  'Bonnet',
  'Windshield / glass',
  'Left side body',
  'Right side body',
  'Rear bumper / boot',
  'Tyres and wheel caps',
  'Interior seats',
  'Dashboard / controls',
  'Lights / indicators'
];

const photoItems = [
  'Front side photo',
  'Rear side photo',
  'Left side photo',
  'Right side photo',
  'Odometer photo',
  'Fuel meter photo',
  'Existing scratch/dent close-up',
  'Customer handover photo'
];

const terms = [
  'Customer has checked vehicle condition, documents, fuel level, odometer reading and accessories before taking delivery.',
  'Customer accepts responsibility for traffic fines, challans, tolls, parking, fuel, late return charges, damage and misuse during the rental period.',
  'Vehicle must not be used for racing, towing, commercial activity, taxi service, carrying goods, illegal activity, drunk driving or drug-influenced driving.',
  'Smoking, drinking, banned substances, arms, ammunition and pets are not allowed inside the vehicle.',
  'Only the verified renter or authorised approved driver may drive the vehicle.',
  'Restricted areas and route rules shared by Ride Aura must be followed.',
  'Customer agrees to return the vehicle on the agreed date/time and in the same condition, subject to normal use.'
];

function Line({ label, wide = false }: { label: string; wide?: boolean }) {
  return <label className={wide ? 'handover-line wide' : 'handover-line'}><span>{label}</span><input /></label>;
}

export default function HandoverFormPage() {
  return (
    <main className="handover-page">
      <div className="handover-actions">
        <a href="/admin" className="btn dark">Back to Admin</a>
        <button className="btn" type="button" onClick={() => window.print()}>Print Form</button>
      </div>

      <section className="handover-sheet">
        <header className="handover-head">
          <div>
            <h1>Ride Aura Vehicle Handover Form</h1>
            <p>Self-drive car and bike rental handover checklist</p>
          </div>
          <div className="handover-brand">
            <img src="/rideaura-logo-navbar.png" alt="Ride Aura Self Drive" />
          </div>
        </header>

        <div className="handover-grid two">
          <Line label="Booking ID / Reference" />
          <Line label="Handover Date & Time" />
          <Line label="Customer Name" />
          <Line label="Mobile Number" />
          <Line label="Customer Type" />
          <Line label="Emergency Contact" />
          <Line label="Pickup Location" />
          <Line label="Return Location" />
        </div>

        <h2>Vehicle Details</h2>
        <div className="handover-grid three">
          <Line label="Vehicle Name / Model" />
          <Line label="Registration Number" />
          <Line label="Fuel Type" />
          <Line label="Start KM" />
          <Line label="Fuel Level" />
          <Line label="Return Due Date & Time" />
          <Line label="Rate Per Day" />
          <Line label="Rate Per Hour" />
          <Line label="Security Deposit" />
        </div>

        <h2>Customer Documents Checked</h2>
        <div className="handover-check-grid">
          <label><input type="checkbox" /> Driving License</label>
          <label><input type="checkbox" /> Aadhaar Card</label>
          <label><input type="checkbox" /> Passport for NRI / Foreign Customer</label>
          <label><input type="checkbox" /> International Driving License for NRI / Foreign Customer</label>
          <label><input type="checkbox" /> Payment / Deposit Received</label>
          <label><input type="checkbox" /> Online Booking Verified</label>
        </div>

        <h2>Vehicle Papers & Accessories</h2>
        <div className="handover-check-grid">
          {checklistItems.map((item) => <label key={item}><input type="checkbox" /> {item}</label>)}
        </div>

        <h2>Vehicle Condition Before Handover</h2>
        <table className="handover-table">
          <thead>
            <tr><th>Area</th><th>OK</th><th>Scratch / Dent / Damage Note</th></tr>
          </thead>
          <tbody>
            {conditionAreas.map((area) => <tr key={area}><td>{area}</td><td><input type="checkbox" /></td><td></td></tr>)}
          </tbody>
        </table>

        <h2>Required Photos Taken</h2>
        <div className="handover-check-grid">
          {photoItems.map((item) => <label key={item}><input type="checkbox" /> {item}</label>)}
        </div>

        <h2>Charges & Payment Summary</h2>
        <div className="handover-grid three">
          <Line label="Rental Amount" />
          <Line label="Extra KM / Hour Charge" />
          <Line label="Pickup / Drop Charge" />
          <Line label="Security Deposit" />
          <Line label="Advance Paid" />
          <Line label="Balance Amount" />
          <Line label="Payment Mode" />
          <Line label="Transaction ID" />
          <Line label="Staff Name" />
        </div>

        <h2>Terms Acceptance</h2>
        <ol className="handover-terms">
          {terms.map((term) => <li key={term}>{term}</li>)}
        </ol>
        <Line label="Special Notes / Existing Damage Details" wide />

        <div className="handover-signatures">
          <div className="signature-box customer-signature-box">
            <div className="handover-stamp-box">
              <span>Revenue / Postal Stamp</span>
            </div>
            <span>Customer Signature</span>
          </div>
          <div className="signature-box"><span>Ride Aura Staff Signature</span></div>
          <div className="signature-box"><span>Return Inspection Signature</span></div>
        </div>
      </section>

      <style jsx>{`
        .handover-page{background:#eef3f8;padding:130px 20px 40px;color:#111827}
        .handover-actions{max-width:980px;margin:0 auto 18px;display:flex;gap:12px;justify-content:flex-end}
        .handover-sheet{max-width:980px;margin:auto;background:#fff;border:1px solid #cfd8e3;padding:28px;box-shadow:0 18px 45px rgba(15,23,42,.12)}
        .handover-head{display:flex;justify-content:space-between;gap:24px;align-items:center;border-bottom:3px solid #07162d;padding-bottom:18px;margin-bottom:20px}
        .handover-head h1{margin:0;color:#07162d;font-size:30px}
        .handover-head p{margin:6px 0 0;color:#526173;font-weight:800}
        .handover-brand{background:#06172f;border:1px solid #08cbe8;padding:10px 14px;min-width:260px;display:grid;place-items:center}
        .handover-brand img{width:230px;height:70px;object-fit:contain;filter:drop-shadow(0 0 6px rgba(8,203,232,.35))}
        .handover-sheet h2{margin:24px 0 12px;color:#07162d;font-size:18px;border-bottom:1px solid #d9e3ef;padding-bottom:7px}
        .handover-grid{display:grid;gap:12px}
        .handover-grid.two{grid-template-columns:repeat(2,1fr)}
        .handover-grid.three{grid-template-columns:repeat(3,1fr)}
        .handover-line{display:grid;gap:6px}
        .handover-line.wide{margin-top:16px}
        .handover-line span{font-size:11px;font-weight:900;text-transform:uppercase;color:#526173}
        .handover-line input{border:0;border-bottom:1px solid #9aa8b8;border-radius:0;min-height:34px;padding:0}
        .handover-check-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px 14px}
        .handover-check-grid label{display:flex;align-items:center;gap:8px;font-size:13px;color:#1f2937;text-transform:none;letter-spacing:0}
        .handover-check-grid input,.handover-table input{width:16px;height:16px;min-height:16px}
        .handover-table{width:100%;border-collapse:collapse;font-size:13px}
        .handover-table th,.handover-table td{border:1px solid #cfd8e3;padding:9px;text-align:left}
        .handover-table th{background:#f1f5f9;color:#07162d}
        .handover-table td:nth-child(2){width:60px;text-align:center}
        .handover-terms{margin:0;padding-left:20px;color:#26364a;font-size:13px;line-height:1.55}
        .handover-signatures{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:34px}
        .signature-box{position:relative;height:82px;border-bottom:1px solid #111827;display:flex;align-items:flex-end;justify-content:center}
        .handover-signatures span{font-size:12px;font-weight:900;color:#526173;text-transform:uppercase}
        .handover-stamp-box{position:absolute;left:0;bottom:8px;width:82px;height:58px;border:2px dashed #07162d;background:#f8fafc;display:grid;place-items:center;text-align:center;padding:6px}
        .handover-stamp-box span{font-size:12px;font-weight:900;color:#07162d;text-transform:uppercase;line-height:1.35}
        @media(max-width:760px){.handover-page{padding-top:110px}.handover-head,.handover-grid.two,.handover-grid.three,.handover-check-grid,.handover-signatures{grid-template-columns:1fr;display:grid}.handover-actions{display:grid}.handover-brand{min-width:0}.handover-brand img{width:180px}.handover-stamp-row{display:grid}}
        @media print{
          .handover-actions{display:none!important}
          .handover-page{padding:0;background:#fff}
          .handover-sheet{box-shadow:none;border:0;max-width:none;padding:0}
          .handover-head{display:flex;border-bottom:2px solid #07162d;padding-bottom:6px;margin-bottom:8px;gap:12px}
          .handover-head h1{font-size:20px}
          .handover-head p{font-size:11px;margin-top:2px}
          .handover-brand{display:grid!important;background:#fff;border:0;padding:0;min-width:150px}
          .handover-brand img{width:150px;height:44px;filter:none}
          .handover-sheet h2{font-size:12px;margin:9px 0 5px;padding-bottom:3px;break-after:avoid}
          .handover-grid{gap:5px 9px}
          .handover-grid.two{grid-template-columns:repeat(4,1fr)}
          .handover-grid.three{grid-template-columns:repeat(3,1fr)}
          .handover-line{gap:2px}
          .handover-line.wide{margin-top:7px}
          .handover-line span{font-size:8px}
          .handover-line input{min-height:20px}
          .handover-check-grid{grid-template-columns:repeat(4,1fr);gap:4px 8px}
          .handover-check-grid label{font-size:9px;gap:4px;line-height:1.2}
          .handover-check-grid input,.handover-table input{width:11px;height:11px;min-height:11px}
          .handover-table{font-size:9px}
          .handover-table th,.handover-table td{padding:3px 5px}
          .handover-table td:nth-child(2){width:34px}
          .handover-terms{font-size:9px;line-height:1.25;padding-left:14px}
          .handover-signatures{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:12px;margin-top:16px}
          .signature-box{height:54px}
          .handover-signatures span{font-size:8px}
          .handover-stamp-box{width:58px;height:38px;padding:3px;border-width:1px;bottom:6px}
          .handover-stamp-box span{font-size:8px}
          .handover-table tr,.handover-check-grid,.handover-signatures{break-inside:avoid}
        }
      `}</style>
      <style jsx global>{`
        @page{size:A4;margin:6mm}
        @media print{.top,.site-footer,.whatsapp-float{display:none!important}body{background:#fff!important}}
      `}</style>
    </main>
  );
}
