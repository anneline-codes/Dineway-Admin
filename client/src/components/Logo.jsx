export default function Logo({ compact = false }) {
  return (
    <div className={`brand-logo ${compact ? 'brand-logo--compact' : ''}`}>
      <div className="brand-steam">|||</div>
      <div className="brand-cloche">
        <span />
      </div>
      <div className="brand-name">DINEWAY</div>
      <div className="brand-subtitle">RESTAURANT SOLUTIONS</div>
    </div>
  );
}
