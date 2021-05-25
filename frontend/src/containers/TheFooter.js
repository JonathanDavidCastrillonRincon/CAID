import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="col-sm-12 pb-2 pb-lg-0 pr-0"><br/>
        <p><b>CAID</b> - 2021. Calendario Interactivo Para Docentes.</p>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
