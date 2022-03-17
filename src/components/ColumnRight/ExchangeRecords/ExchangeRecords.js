/**
 * This function is responsible for rendering the Exchange Records section of the
 * verifier page
 * @returns The ExchangeRecords component returns a set of divs that contain
 * information such as exchange id, verification state, etc.
 */
import Event from '../Event'

export default function ExchangeRecords({ dataConnRecordEvents }) {
  return (
    <>
      {dataConnRecordEvents.length === 0 && (
        <>
          <div className="text-dark">N/A</div>
        </>
      )}

      {dataConnRecordEvents.length > 0 &&
        dataConnRecordEvents.map((o, i) => {
          const [cId, exRecordEvents] = Object.entries(o)[0]
          return (
            <div key={cId} className="text-dark" id={`connection-${i}`}>
              {dataConnRecordEvents.length > 1 && (
                <h6>
                  Events related to Connection Id <small>{cId}</small>:
                </h6>
              )}

              {exRecordEvents.length > 0 &&
                exRecordEvents.map((p, j) => {
                  const [eId, events] = Object.entries(p)[0]
                  return (
                    <div
                      className="bg-light mb-2"
                      key={eId}
                      id={`wrapper-${i}-${j}`}
                    >
                      <a
                        className="btn btn-lg btn-primary text-left w-100"
                        href={`#details-${i}-${j}`}
                        data-toggle="collapse"
                        aria-expanded="true"
                      >
                        <i className="fa fa-sort"></i>
                        &nbsp; Exchange Id: <small>{eId}</small>
                      </a>
                      <div
                        className="my-0 p-3 border collapse show"
                        id={`details-${i}-${j}`}
                      >
                        {events.length > 0 && (
                          <div className="accordion" id={`accordion-${i}-${j}`}>
                            {events.map((event, k) => (
                              <div
                                key={`${event.pres_ex_id}:${event.updated_at}`}
                                className="card border border-bottom-1"
                              >
                                <Event i={i} j={j} k={k} event={event} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
            </div>
          )
        })}
    </>
  )
}
