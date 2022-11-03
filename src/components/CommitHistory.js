import { useCallback, useEffect, useState } from "react";
import FetchCommitService from "../service/FetchCommitService";
import CommitPerDay from "./CommitPerDayContainer";
import moment from "moment";
import Loader from "./Loader";
import './css/CommitHistory.css';

// displays the commit history
export default function CommitHistory(props) {
    const [commits, setCommits] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchCommits = useCallback(() => {
        setIsLoading(true);
        FetchCommitService.fetchCommits({
            ...props,
            page,
        }).then(setCommits)
            .catch(err => {
                if (err.status === 404) setError('The requested resource was not found!');
                else if (err.status === 403) setError('You do not have access to the requested resource');
                else if (err.status === 400) setError('The request formed with your credentials is malformed');
                else setError(err.message);
            })
            .finally(() => setIsLoading(false));
    }, [props, page]);

    useEffect(() => {
        fetchCommits();
    }, [fetchCommits]);

    let commitsByDay = {};
    let currDate = new Date();
    for (let idx = 0; idx < commits.length; idx++) {
        let key = moment(new Date(commits[idx].commit.author.date)).format('MMMM Do YYYY');
        let oldValues = commitsByDay[key] || [];
        oldValues.push(commits[idx]);
        commitsByDay[key] = oldValues;
    }
    let items = [];
    for (let key in commitsByDay) {
        items.push(
            <CommitPerDay day={key} key={key} commits={commitsByDay[key]} />
        );
    }

    const hasNextPage = items && items.length > 0;
    const hasPrevPage = (page > 1);

    return (
        <div className="commit-history-container mt-5">
            {error && <div className="alert alert-danger mt-3" role="alert">
                {error}
            </div>}
            <h1 className="header" style={{ fontSize: '20px' }}>
                <a href={`https://github.com/${props.owner}/${props.repo}`}>{props.owner}/{props.repo}</a>
            </h1>
            {isLoading && <Loader />}
            {(items && items.length > 0 && !isLoading) ?
                <>
                    {items}
                    <div className="btn-group btn-group-lg pagination" role="group" aria-label="Large button group">
                        <button type="button" className="btn btn-outline-primary" disabled={!hasPrevPage}
                            onClick={() => setPage(page => hasPrevPage ? page - 1 : page)}>Newer</button>
                        <button type="button" className="btn btn-outline-primary" disabled={!hasNextPage}
                            onClick={() => setPage(page => hasNextPage ? page + 1 : page)}>Older</button>
                    </div>

                </> : <p>Nothing to show!</p>}
        </div>
    );
};