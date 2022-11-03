import Commit from "./Commit";
import './css/CommitPerDayContainer.css';

export default function CommitPerDay(props) {
    let { day, commits } = props;
    return (
        <div className="commits-per-day-container">
            <p className="title">Commits on {day}</p>
            {commits && commits.map(commit => <Commit commit={commit} key={commit.sha} />)}
        </div>
    )
};