        {/* Calculate Button */}
        <button onClick={handleCalculate} className="button">
          Calculate Premium
        </button>

        {/* Result */}
        {premium && (
          <div className="result">
            <h2>Estimated Premium</h2>

            <p>
              Client: <strong>{clientName}</strong>
            </p>

            <p>
              Vehicle:
              <strong>
                {" "}
                {selectedMake} {selectedModel}
              </strong>
            </p>
            <div className="breakdown">
  <h3>Premium Breakdown</h3>

  {premium.breakdown.map((item, index) => (
    <div key={index} className="breakdown-item">

      <div>
        <strong>{item.label}</strong>
      </div>

      <div>
        x {item.rate.toFixed(2)}
      </div>

      <div>
        ₱
        {item.amount.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
      </div>

    </div>
  ))}
</div>

            <h1>
              ₱
              {premium.total.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </h1>
          </div>
        )}