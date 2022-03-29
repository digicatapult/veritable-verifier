/**
 * This function returns a div that contains the left and right columns for holder
 * @returns An empty element with the left and right column inside.
 */
import ColumnLeftWrap from '../ColumnLeft/ColumnLeftWrap'
import ColumnRightWrap from '../ColumnRight/ColumnRightWrap'

export default function ContentWrap({ origin, connections }) {
  return (
    <>
      <ColumnLeftWrap origin={origin} connections={connections} />
      <ColumnRightWrap origin={origin} />
    </>
  )
}
