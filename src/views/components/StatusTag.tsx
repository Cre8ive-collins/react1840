
interface Props {
    status : 0 | 1 | 2
}
const StatusTag = (props : Props) => {
  return (
    <span>
        {props.status === 0 && <span className="bg-red-400 text-white p-2 rounded-md">To Do</span>}
        {props.status === 1 && <span className="bg-yellow-400 text-white p-2 rounded-md">In Progress</span>}
        {props.status === 2 && <span className="bg-green-400 text-white p-2 rounded-md">Completed</span>}
    </span>
  )
}

export default StatusTag