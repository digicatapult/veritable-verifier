export default function ResetButton({ onActivatedReset }) {
  return (
    <b>
      <button className="btn btn-link btn-sm p-0" onClick={onActivatedReset}>
        Reset
      </button>
    </b>
  )
}
