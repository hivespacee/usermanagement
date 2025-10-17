const Card = ({ title, children}) => {

  return (
    <div className="relative bg-white rounded-2xl border border-neutral-100 bg-neutral-900/70 p-5 shadow-black hover:shadow-lg transition">
      <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-neutral-900`} />
      <div className="relative">
        {title && <h3 className="text-lg font-semibold text-gray-100 mb-2">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Card;


