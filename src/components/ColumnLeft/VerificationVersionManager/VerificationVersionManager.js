/**
 * This function is used to render the dropdown menu for selecting the version of
 * the verification form
 * @returns A form with a dropdown menu that allows the user to select a version of
 * the verification form.
 */
export default function VerificationVersionManager({
  onSelectedVersion,
  selectedVersion,
  isLockedForm,
}) {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="version">Verification Form:</label>
          <select
            name="structure"
            className="form-control"
            id="version"
            onChange={onSelectedVersion}
            value={selectedVersion}
            disabled={isLockedForm}
          >
            <option value="" disabled>
              - Select -
            </option>
            <option value={'1'}>Verification Form 1.0</option>
          </select>
        </div>
      </div>
      <div className="col-md-6">&nbsp;</div>
    </div>
  )
}
