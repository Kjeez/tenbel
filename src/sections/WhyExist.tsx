import { useStaggerAnimation } from '../hooks/useScrollAnimation';

const purposes = [
  {
    num: '01',
    title: 'Solve Complexity Simply',
    text: 'Automation is the future, but it must be done responsibly. We break down complex challenges into clean, efficient solutions.',
  },
  {
    num: '02',
    title: 'Reduce Carbon Footprint',
    text: 'Everything we build needs power. Our vision is to create efficiencies while reducing the environmental impact of every solution.',
  },
  {
    num: '03',
    title: 'Net Zero — For Real',
    text: "Net Zero isn't a buzzword for us. We help you achieve genuine sustainability goals because we believe in gifting the future to the next generation.",
  },
  {
    num: '04',
    title: 'Actionable Intelligence',
    text: 'Our consulting services build insights that are relevant only to you — turning data into decisions that grow your business.',
  },
];

export default function WhyExist() {
  const gridRef = useStaggerAnimation('.why-grid', '.why-card');

  return (
    <section id="why" className="relative z-10 bg-[#0f1020]">
      <div className="section-inner">
        <span className="section-tag animate-on-scroll">Our Purpose</span>
        <h2 className="section-title animate-on-scroll">Why We Exist</h2>
        <p className="section-desc animate-on-scroll">
          Complex problems demand straightforward solutions — built sustainably, from the ground up.
        </p>

        <div ref={gridRef} className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {purposes.map((item, i) => (
            <div
              key={i}
              className="why-card card-surface gradient-border-top"
            >
              <div className="text-[3rem] font-extrabold gradient-text opacity-25 leading-none mb-4">
                {item.num}
              </div>
              <div className="font-semibold text-[1.05rem] mb-3">{item.title}</div>
              <p className="text-[rgba(240,240,248,0.55)] text-sm leading-[1.7]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
