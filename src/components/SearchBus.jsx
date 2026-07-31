import "./SearchBus.css";

function SearchBus() {
  return (
    <section className="search">

      <h2>🔍 Find Your Bus</h2>

      <div className="search-box">

        <input
          type="text"
          placeholder="From"
        />

        <input
          type="text"
          placeholder="To"
        />

        <input
          type="date"
        />

        <button>
          Search Bus
        </button>

      </div>

    </section>
  );
}

export default SearchBus;