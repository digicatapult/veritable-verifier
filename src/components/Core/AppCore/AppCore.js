/**
 * This function is the main component of the app. It renders the NavbarWrap,
 * ConnectivityAndBreadcrumbWrap, ContentSelectorWrap
 */
import { useState } from 'react'

import useGetServerStatus from '../../../interface/hooks/use-get-server-status'
import NavbarWrap from './../../Common/Navigation/NavbarWrap'
import LogoWrap from '../../Common/Navigation/LogoWrap'
import ErrorModal from './../../Common/Misc/ErrorModal'
import NavbarNavigationMenu from '../../Common/Navigation/NavbarNavigationMenu'
import NavbarProfile from '../../Common/Navigation/NavbarProfile'
import NavbarDropdownWrap from '../../Common/Navigation/NavbarDropdown/NavbarDropdownWrap'
import ConnectivityAndBreadcrumbWrap from '../../Common/Navigation/ConnectivityAndBreadcrumbWrap'
import BreadcrumbWrap from '../../Common/Navigation/BreadcrumbWrap/BreadcrumbWrap'
import ConnectivityWrap from '../../Common/Navigation/Connectivity/ConnectivityWrap'
import ContentSelectorWrap from '../../Common/Misc/ContentSelectorWrap'
import ContentSelector from '../../Common/Misc/ContentSelector'
import { VERIFIER_LABEL } from '../../../utils/env'

export default function AppCore() {
  const [configuredOrigin, setConfiguredOrigin] = useState('')
  const [data, setData] = useState({})
  const [status, error, startFetchHandler] = useGetServerStatus()
  const persona = VERIFIER_LABEL

  const saveOriginHandler = (insertedOrigin) => {
    const setStoreDataFn = (resData) => {
      setData({ ...data, ...resData })
    }
    setConfiguredOrigin(insertedOrigin)
    if (insertedOrigin !== '') {
      startFetchHandler(insertedOrigin, setStoreDataFn)
    }
  }

  return (
    <>
      <NavbarWrap>
        <LogoWrap />
        {status === 'idle' && !error && (
          <>
            <NavbarDropdownWrap
              status={status}
              onSaveOrigin={saveOriginHandler}
            />
            <NavbarNavigationMenu status={status} />
            <NavbarProfile status={status} />
          </>
        )}
        {status === 'error' && (
          <>
            <NavbarDropdownWrap status={status} />
            <NavbarNavigationMenu status={status} />
            <NavbarProfile status={status} />
          </>
        )}
        {status === 'fetching' && !error && (
          <>
            <NavbarDropdownWrap status={status} />
            <NavbarNavigationMenu status={status} />
            <NavbarProfile status={status} />
          </>
        )}
        {status === 'fetched' && !error && (
          <>
            <NavbarDropdownWrap status={status} />
            <NavbarNavigationMenu status={status} />
            <NavbarProfile status={status} />
          </>
        )}
      </NavbarWrap>
      <ConnectivityAndBreadcrumbWrap>
        <BreadcrumbWrap status={status} persona={persona} />
        {status === 'fetched' && (
          <ConnectivityWrap
            serverStatus={status}
            origin={configuredOrigin}
            persona={persona}
          />
        )}
      </ConnectivityAndBreadcrumbWrap>
      <ContentSelectorWrap>
        <ContentSelector
          status={status}
          origin={configuredOrigin}
          persona={persona}
        />
      </ContentSelectorWrap>
      {status === 'error' && <ErrorModal visibility content={error} />}
    </>
  )
}
