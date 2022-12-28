// ** Third Party Components
import Proptypes from 'prop-types'
import classnames from 'classnames'
import Avatar from "@components/avatar";
import { Send16Filled, CalendarCancel16Filled, CheckmarkCircle20Filled, DismissCircle20Filled } from "@fluentui/react-icons";
import { Input } from 'reactstrap'

const TimelineCustom = props => {
  // ** Props
  const { data, tag, className } = props

  function mapping_status(data) {
    if (data == "Submit") {
      return "Pengajuan Dikirim"
    } else if (data == "Cancel") {
      return "Pengajuan Dibatalkan"
    } else if (data == "Draft") {
      return "Pengajuan Draft"
    } else if (data == "Reject") {
      return "Pengajuan Ditolak"
    } else if (data == "Approve") {
      return "Pengajuan Disetujui"
    } else if (data == "Return") {
      return "Pengajuan Dikembalikan"
    }
  }

  // ** Custom Tagg
  const Tag = tag ? tag : 'ul'

  return (
    <Tag
      className={classnames('timeline', {
        [className]: className
      })}
    >
      {data.map((item, i) => {
        const ItemTag = item.tag ? item.tag : 'li'

        return (
          <ItemTag
            key={i}
            className={classnames('timeline-item', {
              [item.className]: className
            })}
          >
            <span
              className={classnames('timeline-point', {
                [`timeline-point-tertiary`]: "tertiary",
                'timeline-point-indicator': !item.icon
              })}
            >
              {/* {item.icon ? item.icon : null} */}
              {item.status === 'Submit'
                ? <Send16Filled color="white" /> : item.status === 'Approve'
                  ? <CheckmarkCircle20Filled color="#fff" /> : item.status === 'success'
                    ? <CheckmarkCircle20Filled color="#fff" /> : item.status === 'Reject'
                      ? <DismissCircle20Filled color="#fff" /> : item.status === 3
                        ? <Send16Filled color="white" /> : item.status === 4
                          ? <Send16Filled color="white" /> : <CalendarCancel16Filled color="#fff" />}
            </span>
            <div className='timeline-event'>
              <div
                className={classnames('d-flex justify-content-between flex-sm-row flex-column', {
                  'mb-sm-0 mb-1': item.date
                })}
              >
                <h6 className={`${item.status === 'Submit'
                  ? "text-warning" : item.status === 'Approve'
                    ? "text-primary" : item.status === 'success'
                      ? "text-primary" : item.status === 'reject'
                        ? "text-danger" : item.status === 3
                          ? "text-warning" : item.status === 4
                            ? "text-warning" : "text-tertiary"}`}>{item.status_text ? item.status_text : mapping_status(item.status)}</h6>
                {item.date ? (
                  <span
                    className={classnames('timeline-event-time', {
                      [`me-1`]: `me-1`
                    })}
                  >
                    {item.date} | {item.time}
                  </span>
                ) : null}
              </div>
              <p
                className={classnames({
                  'mb-0': i === data.length - 1 && !item.customContent
                })}
              >
                {item.content}
              </p>
              {/* {item.customContent ? item.customContent : null} */}
              <div className={`d-flex ${item.status === 'Approve' ? "" : item.status === 2 ? "" : "align-items-center"}`}>
                <div className={`bg-white`}
                  style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                  <Avatar
                    className="photo-karyawan"
                    img={item.photo ? item.photo : "https://diarium.telkom.co.id/getfoto/" + item.nik}
                    imgHeight="40"
                    imgWidth="40"
                  />
                </div>
                <div className='ms-50'>
                  <div className='mb-0 fs-4'>{item.name} - {item.nik}</div>
                  <small>{item.posisi}</small>
                  {/* <div className={`d-flex flex-row w-100 mt-5 ${item.status === 'Approve' ? "" : item.status === 2 ? "" : ""}`}> */}
                  <div className={`d-flex flex-row w-100 mt-5`}>
                    <Input type='text' name='commentJustification' id='commentJustification' defaultValue={item.comment}
                      placeholder="commentJustification"
                      disabled />
                  </div>
                </div>
              </div>
            </div>
          </ItemTag>
        )
      })}
    </Tag>
  )
}

export default TimelineCustom

// ** PropTypes
TimelineCustom.propTypes = {
  tag: Proptypes.string,
  className: Proptypes.string,
  data: Proptypes.array.isRequired
}