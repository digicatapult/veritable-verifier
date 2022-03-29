export default function PrerequisitesManager({
  activeConnections,
  onSelectedVersion,
  selectedVersion,
  onSelectedConnection,
  selectedConnection,
  isLockedForm,
}) {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="connection">Connection:</label>
          <select
            name="connection"
            className="form-control"
            id="connection"
            onChange={onSelectedConnection}
            value={selectedConnection}
            disabled={isLockedForm}
          >
            <option value="" disabled>
              - Select -
            </option>
            {activeConnections.map((connection) => {
              return (
                <option
                  key={connection.connection_id}
                  value={connection.connection_id}
                >
                  {connection.their_label}
                </option>
              )
            })}
          </select>
          {selectedConnection && (
            <>
              <label htmlFor="version">Verification Form Version:</label>
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
            </>
          )}
        </div>
      </div>
      <div className="col-md-6">&nbsp;</div>
    </div>
  )
}
