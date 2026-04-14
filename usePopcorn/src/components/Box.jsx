function Box({ children, toggle, open }) {
  return (
    <div className="box">
      <button className="btn-toggle" onClick={toggle}>
        {open ? "–" : "+"}
      </button>
      {open && <>{children}</>}
    </div>
  );
}

export default Box;
