/**
 * This function returns a breadcrumb for the application
 * @returns A breadcrumb element.
 */
export default function Breadcrumb() {
  return (
    <>
      <li className="breadcrumb-item">
        <a href="#/" onClick={(e) => e.preventDefault()}>
          <span className="text-primary">Home</span>
        </a>
      </li>
      <li className="breadcrumb-item">
        <a
          href="#/"
          onClick={(e) => e.preventDefault()}
          className="text-primary"
        >
          <span className="text-primary">Verify Credentials</span>
        </a>
      </li>
    </>
  )
}
