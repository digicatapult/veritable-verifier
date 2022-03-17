/**
 *
 * The function renders the handles every element which is related to the
 * verification form.  It is made out of two parts. The first part is the
 * "Send Request" form. The second part is the "Verify Presentation" form.
 */
import { useState } from 'react'
import ResetButton from '../ResetButton'
import VerificationVersionManager from '../VerificationVersionManager'
import SendRequestFormManager from '../SendRequestFormManager'
import VerifyPresentationManager from '../VerifyPresentationManager'
import useGetConn from '../../../interface/hooks/use-get-conn'
import usePostPresentProofSendRequest from '../../../interface/hooks/use-post-present-proof-send-request'
import useGetPresentProofRecords from '../../../interface/hooks/use-get-present-proof-records'
import usePostPresentProofRecordsVerifyPresentation from '../../../interface/hooks/use-post-present-proof-records-verify-presentation'

export default function ColumnLeftWrap({ origin }) {
  const now = new Date()
  const tomorrow = new Date(+now + 86400000)

  const [selectedVersion, setSelectedVersion] = useState('')

  const [selectedValidity, setSelectedValidity] = useState(
    tomorrow.toISOString().split('T')[0]
  )
  const [isValidityLocked, setIsValidityLocked] = useState(true)
  const [selectedId, setSelectedId] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [selectedSurname, setSelectedSurname] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const [isDisconnected, setIsDisconnected] = useState(false)
  const [isLockedForm, setIsLockedForm] = useState(false)
  const [statusConnId, errorConnId, startFetchConnIdHandler] = useGetConn()

  const [statusSendReq, setStatusSendReq] = useState('')
  const [errorSendReq, startFetchHandlerSendReq] =
    usePostPresentProofSendRequest()
  const [statusRecords, errorRecords, startFetchHandlerRecords] =
    useGetPresentProofRecords()

  const [dataPresExIds, setDataPresExIds] = useState([])

  const [selectedExchange, setSelectedExchange] = useState('')

  const [dataVerify, setDataVerify] = useState(null)
  const [statusVerify, setStatusVerify] = useState('')
  const [errorVerify, startFetchHandlerVerify] =
    usePostPresentProofRecordsVerifyPresentation()

  const activatedResetHandler = () => {
    setSelectedVersion('')
    setSelectedValidity('')
    setSelectedId('')
    setSelectedName('')
    setSelectedSurname('')
    setSelectedType('')
  }

  const chooseVersionHandler = (e) => {
    const v = e.target.value
    setSelectedVersion(v)
  }
  const activatedTodaySwitchHandler = () => {
    const d = now.toISOString().split('T')[0]
    setSelectedValidity(d)
    setIsValidityLocked(true)
  }
  const chosenValidityHandler = (e) => {
    const d = e.target.value
    setSelectedValidity(d)
  }
  const toggleValidityLockHandler = () => {
    setIsValidityLocked((previousVal) => !previousVal)
  }
  const submitProofReqHandler = () => {
    startFetchConnIdHandler(origin, function setStoreDataConnCb(connectionId) {
      if (!connectionId) {
        setIsDisconnected(true)
        return
      }
      setIsDisconnected(false)
      startFetchHandlerSendReq(
        origin,
        connectionId,
        selectedId,
        selectedName,
        selectedSurname,
        selectedType,
        selectedValidity,
        setStatusSendReq,
        function setStoreDataSendReqCb(exId) {
          startFetchHandlerRecords(
            origin,
            function setStoreDataRecordsCb(records) {
              let presExIds = records.map((r) => r.pres_ex_id)
              presExIds =
                presExIds.indexOf(exId) > -1 ? presExIds : [...presExIds, exId]
              setIsLockedForm(true)
              setDataPresExIds(presExIds)
            }
          )
        }
      )
    })
  }
  const toggleSuccessShowHandler = () => {
    setStatusSendReq('idle')
  }

  const inputIdHandler = (e) => {
    setSelectedId(e.target.value)
  }
  const inputNameHandler = (e) => {
    setSelectedName(e.target.value)
  }
  const inputSurnameHandler = (e) => {
    setSelectedSurname(e.target.value)
  }
  const changeTypeHandler = (e) => {
    setSelectedType(e.target.value)
  }

  const changeExchangeHandler = (e) => {
    setSelectedExchange(e.target.value)
  }
  const submitVerifyHandler = () => {
    const setStoreDataFn = (retData) => {
      setDataVerify(retData)
    }
    startFetchHandlerVerify(
      origin,
      selectedExchange,
      setStatusVerify,
      setStoreDataFn
    )
    setDataPresExIds((prevExIds) =>
      prevExIds.filter((e) => e !== selectedExchange)
    )
  }

  const toggleSuccessShowHandlerVerify = () => {
    setStatusVerify('idle')
    activatedResetHandler()
    setIsLockedForm(false)
  }

  return (
    <>
      <div className="col-md-6">
        <div className="container py-1">
          <div className="row">
            <div className="col-md-12">
              <h5>Verify Flight-Plan Details</h5>
              <p className="small my-2">
                Flight-plan verification form. To start again, please &nbsp;
                <ResetButton onActivatedReset={activatedResetHandler} />
                &nbsp; the form.
              </p>

              <>
                <VerificationVersionManager
                  isLockedForm={isLockedForm}
                  onSelectedVersion={chooseVersionHandler}
                  selectedVersion={selectedVersion}
                />
              </>

              <hr />

              {selectedVersion === '1' && (
                <SendRequestFormManager
                  onChosenValidity={chosenValidityHandler}
                  selectedValidity={selectedValidity}
                  onActivatedTodaySwitch={activatedTodaySwitchHandler}
                  onToggleValidityLock={toggleValidityLockHandler}
                  isLockedForm={isLockedForm}
                  isValidityLocked={isValidityLocked}
                  onInputId={inputIdHandler}
                  selectedId={selectedId}
                  onInputName={inputNameHandler}
                  selectedName={selectedName}
                  onInputSurname={inputSurnameHandler}
                  selectedSurname={selectedSurname}
                  selectedType={selectedType}
                  onChangeType={changeTypeHandler}
                  selectedVersion={selectedVersion}
                  submitProofReqHandler={submitProofReqHandler}
                  statusConnId={statusConnId}
                  statusSendReq={statusSendReq}
                  isDisconnected={isDisconnected}
                />
              )}

              {dataPresExIds.length > 0 && (
                <VerifyPresentationManager
                  statusRecords={statusRecords}
                  selectedExchange={selectedExchange}
                  onChangeExchange={changeExchangeHandler}
                  dataPresExIds={dataPresExIds}
                  selectedVersion={selectedVersion}
                  onVerifySubmit={submitVerifyHandler}
                  statusVerify={statusVerify}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        id="success"
        className={`modal ${statusSendReq === 'fetched' ? '' : 'd-none'}`}
        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="alert-success rounded">
              <div className="modal-header">
                <h5 className="modal-title">&nbsp;</h5>
                <button
                  type="button"
                  onClick={toggleSuccessShowHandler}
                  className="close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="my-3">
                  <i className="fa fa-check ml-0 mr-2"></i>
                  Success! Proof Presentation Request Sent.
                </div>
              </div>
              <div className="modal-footer" data-dismiss="modal">
                <button
                  type="button"
                  onClick={toggleSuccessShowHandler}
                  className="btn btn-primary"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="verified"
        className={`modal ${statusVerify === 'fetched' ? '' : 'd-none'}`}
        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="alert-success rounded">
              <div className="modal-header">
                <h5 className="modal-title">&nbsp;</h5>
                <button
                  type="button"
                  onClick={toggleSuccessShowHandlerVerify}
                  className="close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body text-center">
                <div className="my-3">
                  Presentation Exchange Id:&nbsp;
                  <small>{dataVerify?.pres_ex_id}</small>
                  <br />
                  State:&nbsp;
                  <small>{dataVerify?.state}</small>
                  <div className="text-center align-items-center d-flex">
                    {dataVerify?.state === 'done' &&
                      dataVerify?.verified === 'true' && (
                        <div className="mx-auto">
                          <i className="d-block fa fa-check-square fa-3x text-success mb-3 mt-3" />
                          <div className="lead mb-3">
                            Verification: <b>PASS</b>
                          </div>
                        </div>
                      )}
                    {dataVerify?.state === 'done' &&
                      dataVerify?.verified === 'false' && (
                        <div className="mx-auto">
                          <i className="d-block fa fa-window-close fa-3x text-danger mb-3 mt-3" />
                          <div className="lead mb-3">
                            Verification: <b>FAILED</b>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="modal-footer" data-dismiss="modal">
                <button
                  type="button"
                  onClick={toggleSuccessShowHandlerVerify}
                  className="btn btn-primary"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${errorConnId ? 'd-block' : 'd-none'}`}
        style={{
          position: 'fixed',
          width: '10%',
          height: '10%',
          inset: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        <div className="text-light m-2 p-2">
          <small>Failed to fetch: {errorConnId}</small>
        </div>
      </div>

      <div
        className={`${errorSendReq ? 'd-block' : 'd-none'}`}
        style={{
          position: 'fixed',
          width: '10%',
          height: '10%',
          inset: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        <div className="text-light m-2 p-2">
          <small>Failed to fetch: {errorSendReq}</small>
        </div>
      </div>

      <div
        className={`${errorRecords ? 'd-block' : 'd-none'}`}
        style={{
          position: 'fixed',
          width: '10%',
          height: '10%',
          inset: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        <div className="text-light m-2 p-2">
          <small>Failed to fetch: {errorRecords}</small>
        </div>
      </div>

      <div
        className={`${errorVerify ? 'd-block' : 'd-none'}`}
        style={{
          position: 'fixed',
          width: '10%',
          height: '10%',
          inset: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        <div className="text-light m-2 p-2">
          <small>Failed to fetch: {errorVerify}</small>
        </div>
      </div>
    </>
  )
}
