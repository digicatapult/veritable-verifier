/**
 * This function renders the event details for the given verify event
 */
import ReactJson from 'react-json-view'

export default function Event({ i, j, k, event }) {
  const getEventIcon = (state, ver) => {
    if (state === 'request-sent' || state === 'presentation-sent') {
      return 'fa-envelope-o'
    }
    if (state === 'presentation-received' || state === 'request-received') {
      return 'fa-envelope-open-o'
    }
    if (state === 'done' && ver === 'true') {
      return 'fa-check-circle-o'
    }
    if (state === 'done' && ver === 'false') {
      return 'fa-times-circle-o'
    }
    if (state === 'abandoned') {
      return 'fa-trash-o'
    }
    return 'fa-question-circle-o'
  }
  const getVerifiedState = (ver) => {
    return ver === 'true' ? 'text-success' : 'text-error'
  }
  return (
    <>
      <div className="card-header text-left">
        <button
          className="btn btn-link text-primary p-1 text-decoration-none"
          data-target={`#collapse-${i}-${j}-${k}`}
          aria-controls={`collapse-${i}-${j}-${k}`}
          type="button"
          data-toggle="collapse"
          aria-expanded="false"
        >
          <small className="text-decoration-none">
            <i className="fa fa-sort"></i>
            &nbsp; Exchange Updated At {event.updated_at.split('.')[0]}
            &nbsp;
          </small>
          ({' '}
          <i
            className={`fa ${getEventIcon(event.state, event.verified)}`}
          ></i>{' '}
          )
        </button>
      </div>
      <div
        className="collapse"
        id={`collapse-${i}-${j}-${k}`}
        aria-labelledby={`heading-${i}-${j}-${k}`}
        data-parent={`#accordion-${i}-${j}`}
      >
        <div className="card-body p-0">
          <ul className="list-group list-group-flush my-2">
            <li className="list-group-item py-2">
              <div className="row small">
                <div className="col-md-4 text-uppercase">Created at:</div>
                <div className="col-md-8 text-muted">
                  {event.created_at.split('.')[0]}
                </div>
              </div>
            </li>

            <li className="list-group-item py-2">
              <div className="row small">
                <div className="col-md-4 text-uppercase">Pres ex id:</div>
                <div className="col-md-8 text-muted">{event.pres_ex_id}</div>
              </div>
            </li>

            <li className="list-group-item py-2">
              <div className="row small">
                <div className="col-md-4 text-uppercase">Initiator:</div>
                <div className="col-md-8 text-muted">{event.initiator}</div>
              </div>
            </li>

            <li className="list-group-item py-2">
              <div className="row small">
                <div className="col-md-4 text-uppercase">Role:</div>
                <div className="col-md-8 text-muted">{event.role}</div>
              </div>
            </li>

            <li className="list-group-item py-2">
              <div className="row small">
                <div className="col-md-4 text-uppercase">State:</div>
                <div className="col-md-8 text-muted">{event.state}</div>
              </div>
            </li>

            <li className="list-group-item py-2">
              <div className="row small">
                <div className="col-md-4 text-uppercase">Error msg:</div>
                <div className="col-md-8 text-muted">{event.error_msg}</div>
              </div>
            </li>

            <li className="list-group-item py-2">
              <div className="row small">
                <div className="col-md-4 text-uppercase">Verified:</div>
                <div
                  className={`col-md-8 ${getVerifiedState(event?.verified)}`}
                >
                  <b>{event.verified}</b>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="card-footer bg-white p-2">
          <a
            className="text-primary my-4 p-2"
            href={`#details-${i}-${j}-${k}`}
            data-toggle="collapse"
          >
            Details
          </a>
          <div className="my-2 collapse" id={`details-${i}-${j}-${k}`}>
            <div className="pre-scrollable bg-light" style={{ height: 200 }}>
              <ReactJson
                src={event}
                style={{ fontSize: '0.75em' }}
                name={'record'}
                displayDataTypes={false}
                displayObjectSize={false}
                iconStyle={'square'}
                indentWidth={2}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
