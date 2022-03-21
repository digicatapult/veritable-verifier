/**
 * The form is used to send a proof request to the selected identity
 * @returns A form with a submit button.
 */
export default function SendRequestFormManager({
  onChosenValidity,
  selectedValidity,
  onActivatedTodaySwitch,
  onToggleValidityLock,
  isLockedForm,
  isValidityLocked,
  onInputId,
  selectedId,
  onInputName,
  selectedName,
  onInputSurname,
  selectedSurname,
  selectedType,
  onChangeType,
  selectedVersion,
  submitProofReqHandler,
  statusConnId,
  statusSendReq,
  isDisconnected,
}) {
  const isDisabledForm = () => {
    let isDisabled = false
    isDisabled = isDisabled || selectedId === ''
    isDisabled = isDisabled || selectedName === ''
    isDisabled = isDisabled || selectedSurname === ''
    isDisabled = isDisabled || selectedType === ''
    return isDisabled
  }
  return (
    <form>
      <div className="row">
        <div className="col-md-9">
          <div className="form-group">
            <label htmlFor="validity">Form Details:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="valid-until">
                  <small>Valid at least until</small>
                </span>
              </div>
              <input
                type="date"
                className="form-control"
                id="validity"
                value={selectedValidity}
                onChange={onChosenValidity}
                disabled={isLockedForm || isValidityLocked}
              />
              <div className="input-group-append" id="valid-lock">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={onToggleValidityLock}
                >
                  <small>
                    <i
                      className={`fa fa-${
                        isValidityLocked ? 'lock' : 'unlock-alt'
                      }`}
                    />
                  </small>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="today">&nbsp;</label>
            <button
              className="btn btn-primary w-100"
              type="button"
              id="today"
              onClick={onActivatedTodaySwitch}
              disabled={isLockedForm}
            >
              <small>
                <i className="fa fa-calendar" aria-hidden="true" /> Today
              </small>
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-text">
                <small>Flyer Id: &nbsp;</small>
              </div>
              <input
                type="text"
                className="form-control"
                id="fid"
                placeholder="GBR-RP-1"
                onChange={onInputId}
                disabled={isLockedForm}
                value={selectedId}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-text">
                <small>Name:&nbsp; &nbsp; &nbsp;</small>
              </div>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Alice"
                onChange={onInputName}
                disabled={isLockedForm}
                value={selectedName}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-text">
                <small>Surname:</small>
              </div>
              <input
                type="text"
                className="form-control"
                id="surname"
                placeholder="Smith"
                onChange={onInputSurname}
                disabled={isLockedForm}
                value={selectedSurname}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-text">
                <small>Type:&nbsp; &nbsp; &nbsp; &nbsp;</small>
              </div>
              <select
                name="type"
                className="form-control"
                id="type"
                value={selectedType}
                disabled={isLockedForm}
                onChange={onChangeType}
              >
                <option value="" disabled>
                  - Select -
                </option>
                <option value="2"> A2 Open Category </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">&nbsp;</div>
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-primary w-100"
            disabled={
              selectedVersion === '' || isDisabledForm() || isLockedForm
            }
            onClick={submitProofReqHandler}
          >
            {(statusConnId === 'fetching' || statusSendReq === 'fetching') && (
              <>
                <i className="fa fa-spinner fa-pulse fa-fw" />
              </>
            )}
            &nbsp; Send Proof Req &nbsp;
            {isDisconnected && (
              <span className="small">
                (<i className="fa fa-exclamation-triangle" /> no peers)
              </span>
            )}
          </button>
        </div>
        <div className="col-md-3">&nbsp;</div>
      </div>

      <hr />
    </form>
  )
}
