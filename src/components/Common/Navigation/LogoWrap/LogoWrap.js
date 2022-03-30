/**
 * This function is used to create the logo for the application
 * @returns A link with the logo component inside.
 */
import Logo from '../../../Logo'

export default function LogoWrap({ children }) {
  return (
    <a
      className="navbar-brand d-none d-md-block"
      href="#/"
      onClick={(e) => e.preventDefault()}
    >
      {<Logo />}
      <span className="m-4">
        <b className="m-3">&nbsp;</b>
      </span>
      {children && children}
    </a>
  )
}
