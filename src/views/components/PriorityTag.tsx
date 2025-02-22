interface Props {
    priority: "low" | "high" | "medium"
}
const PriorityTag = (props: Props) => {
    return (
        <span>
            {props.priority === "low" && <span className="bg-green-400 text-white p-2 rounded-md">Low</span>}
            {props.priority === "medium" && <span className="bg-yellow-400 text-white p-2 rounded-md">Medium</span>}
            {props.priority === "high" && <span className="bg-red-400 text-white p-2 rounded-md">High</span>}
        </span>
    )
}

export default PriorityTag