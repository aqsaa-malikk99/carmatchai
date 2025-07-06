import React from "react";
import "../styles/CarSpecsForm.css"; // Import the custom CSS file for CarSpecsForm

export default function CarSpecsForm({ car, setCar, label }) {
  const drivetrainOptions = ["FWD", "RWD", "AWD", "4WD"];
  const transmissionTypes = ["Automatic", "Manual"];
  const speedsOptions = [1, 2, 3, 4, 5, 6];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio" && name === "displacementUnit") {
      setCar({ ...car, displacementUnit: value });
    } else if (type === "checkbox" && name === "abs") {
      setCar({ ...car, abs: checked });
    } else {
      setCar({ ...car, [name]: value });
    }
  };

  return (
    <fieldset className="specs-fieldset">
      <legend className="fieldset-legend">{label}</legend>

      <h4 className="section-heading">About</h4>
      <div className="input-group">
        <label className="input-label">Brand:</label>
        <input
          type="text"
          name="brand"
          placeholder="eg Honda, Volkswagen"
          value={car.brand || ""}
          onChange={handleChange}
          className="form-input w-24 inline-block mr-2" /* Apply specific width for this input */
        />

        <label className="input-label">Year:</label>
        <input
          type="number"
          name="year"
          placeholder="eg 2008, 2009"
          value={car.year || ""}
          onChange={handleChange}
          className="form-input w-24 inline-block mr-2" /* Apply specific width for this input */
        />
        <label className="input-label">Cost:</label>
        <input
          type="number"
          name="cost"
          placeholder="eg 2008, 2009"
          value={car.cost || ""}
          onChange={handleChange}
          className="form-input w-24 inline-block mr-2" /* Apply specific width for this input */
        />
      </div>

      <h4 className="section-heading">Engine</h4>
      <div className="input-group">
        <label className="input-label">Displacement:</label>
        <input
          type="number"
          name="displacement"
          placeholder="Displacement value"
          value={car.displacement || ""}
          onChange={handleChange}
          className="form-input w-24 inline-block mr-2" /* Apply specific width for this input */
        />
        <label className="radio-group-label">
          <input
            type="radio"
            name="displacementUnit"
            value="L"
            checked={car.displacementUnit === "L"}
            onChange={handleChange}
            className="radio-input"
          />{" "}
          L
        </label>
        <label className="radio-group-label">
          <input
            type="radio"
            name="displacementUnit"
            value="cc"
            checked={car.displacementUnit === "cc"}
            onChange={handleChange}
            className="radio-input"
          />{" "}
          cc
        </label>
      </div>

      <div className="input-group">
        <input
          type="number"
          name="horsepower"
          placeholder="Horsepower"
          value={car.horsepower || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          name="torque"
          placeholder="Torque (Nm)"
          value={car.torque || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <h4 className="section-heading">Transmission</h4>
      <div className="input-group">
        {transmissionTypes.map((type) => (
          <label key={type} className="radio-group-label">
            <input
              type="radio"
              name="transmissionType"
              value={type}
              checked={car.transmissionType === type}
              onChange={handleChange}
              className="radio-input"
            />
            {type}
          </label>
        ))}
      </div>

      <div className="input-group">
        <label className="input-label">Speeds:</label>
        <select
          name="transmissionSpeeds"
          value={car.transmissionSpeeds || ""}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select speeds</option>
          {speedsOptions.map((speed) => (
            <option key={speed} value={speed}>
              {speed}
            </option>
          ))}
        </select>
      </div>

      <h4 className="section-heading">Drivetrain</h4>
      <div className="input-group">
        <select
          name="drivetrain"
          value={car.drivetrain || ""}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select drivetrain</option>
          {drivetrainOptions.map((dt) => (
            <option key={dt} value={dt}>
              {dt}
            </option>
          ))}
        </select>
      </div>

      <h4 className="section-heading">Fuel Economy</h4>
      <div className="input-group">
        <input
          type="number"
          name="mpg"
          placeholder="MPG"
          value={car.mpg || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <h4 className="section-heading">Dimensions</h4>
      <div className="input-group">
        <input
          type="number"
          name="length"
          placeholder="Length (mm)"
          value={car.length || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          name="width"
          placeholder="Width (mm)"
          value={car.width || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          name="height"
          placeholder="Height (mm)"
          value={car.height || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          name="wheelbase"
          placeholder="Wheelbase (mm)"
          value={car.wheelbase || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          name="groundClearance"
          placeholder="Ground Clearance (mm)"
          value={car.groundClearance || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          name="bootSpace"
          placeholder="Boot Space (liters)"
          value={car.bootSpace || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <h4 className="section-heading">Safety Features</h4>
      <div className="input-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="abs"
            checked={!!car.abs}
            onChange={handleChange}
            className="checkbox-input"
          />{" "}
          ABS
        </label>
      </div>
      <div className="input-group">
        <input
          type="number"
          name="airbags"
          placeholder="Number of Airbags"
          value={car.airbags || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <h4 className="section-heading">Other Specs</h4>
      <div className="input-group">
        <input
          type="number"
          name="zeroToSixty"
          placeholder="0-60 mph (sec)"
          value={car.zeroToSixty || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          name="topSpeed"
          placeholder="Top Speed (mph)"
          value={car.topSpeed || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          name="suspension"
          placeholder="Suspension Type"
          value={car.suspension || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={car.weight || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          name="tireSize"
          placeholder="Tire Size"
          value={car.tireSize || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          name="turningRadius"
          placeholder="Turning Radius (m)"
          value={car.turningRadius || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>
    </fieldset>
  );
}
