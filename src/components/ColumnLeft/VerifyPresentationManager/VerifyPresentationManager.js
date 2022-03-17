/**
 * This function is responsible for the form that allows the user to verify the
 * presentation
 */
export default function VerifyPresentationManager({
  statusRecords,
  selectedExchange,
  onChangeExchange,
  dataPresExIds,
  selectedVersion,
  onVerifySubmit,
  statusVerify,
}) {
  const isDisabledForm = () => {
    let isDisabled = false
    isDisabled = isDisabled || selectedExchange === ''
    return isDisabled
  }
  return (
    <form>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="exchange">
              Verify the received presentation:&nbsp;
              {statusRecords === 'fetching' && (
                <i className="fa fa-spinner fa-pulse fa-fw" />
              )}
            </label>
            <select
              name="structure"
              className="form-control"
              id="exchange"
              value={selectedExchange}
              onChange={onChangeExchange}
            >
              <option value={''} disabled>
                - Select -
              </option>
              {dataPresExIds.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-secondary w-100"
            disabled={selectedVersion === false || isDisabledForm()}
            onClick={onVerifySubmit}
          >
            {statusVerify === 'fetching' && (
              <i className="fa fa-spinner fa-pulse fa-fw" />
            )}
            &nbsp; Verify &nbsp;
            <span className="small d-none">
              ( &nbsp;
              <i className="fa fa-exclamation-triangle" />
              &nbsp; error )
            </span>
          </button>
        </div>
        <div className="col-md-3" />
      </div>
    </form>
  )
}
