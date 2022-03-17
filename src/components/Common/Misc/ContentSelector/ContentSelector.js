/**
 * This function is responsible for rendering the content of the Agent Issuer,
 * Agent Holder, and Agent Verifier pages based on value of persona
 * @returns The ContentWrap component.
 */
import ContentWrap from '../../../ContentWrap'

export default function ContentSelector({ children, status, origin, persona }) {
  return (
    <>
      {children && children}
      {!children && status !== 'fetched' && (
        <div className="py-4 my-4">&nbsp;</div>
      )}
      {!children && status === 'fetched' && persona && (
        <ContentWrap origin={origin} persona={persona} />
      )}
    </>
  )
}
