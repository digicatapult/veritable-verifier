/**
 * It creates a button that when clicked, will reset the verifier form.
 * @returns A reset button.
 */
export default function ResetButton({ onActivatedReset }) {
  return (
    <b>
      <button className="btn btn-link btn-sm p-0" onClick={onActivatedReset}>
        Reset
      </button>
    </b>
  )
}
