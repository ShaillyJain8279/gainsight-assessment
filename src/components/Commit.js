// imports
import { useState } from 'react';
import './css/Commit.css';
import moment from 'moment';

// displays a single commit
export default function Commit(props) {
    const { commit } = props.commit;
    const [text, setText] = useState('');
    const [showCopyIcon, setShowCopyIcon] = useState(true);

    const suffix = (duration, unit) => `${duration} ${unit}${duration > 1 ? 's' : ''} ago`;
    const parseCommitTime = (commitDate) => {
        let currDate = new Date();
        let inp1 = moment(currDate);
        let inp2 = moment(commitDate);
        let years = inp1.diff(inp2, 'year');
        if (years > 0) return suffix(years, 'year');
        let months = inp1.diff(inp2, 'month');
        if (months > 0) return suffix(months, 'month');
        let days = inp1.diff(inp2, 'day');
        if (days > 0) return suffix(days, 'days');
        let hours = inp1.diff(inp2, 'hour');
        if (hours > 0) return suffix(hours, 'hour');
        let minutes = inp1.diff(inp2, 'minute');
        if (minutes > 0) return suffix(minutes, 'minute');
        let seconds = inp1.diff(inp2, 'second');
        if (seconds > 0) return suffix(seconds, 'second');
        else return 'just now';
    };


    // copies the content to clipboard
    const copyToClipboard = (text) => {
        setShowCopyIcon(false);
        setTimeout(() => setShowCopyIcon(true), 1000);
        // write the text to clipboard
        navigator.clipboard.writeText(text);
    };

    // split the display message
    let [message, moreMessage] = commit.message.split(/\n+/);
    const commidId = commit.url.split("/commits/")[1];



    return (
        <div className="commit-container border border-rounded">
            <div className="commit-content">
                <div className="commit-title">
                    <span className='bold'>{message}</span>
                    {moreMessage &&
                        <>
                            <button type="button"
                                onClick={() => setText(text => text ? '' : moreMessage)}>
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>
                            {text && <span className='more'><br />{text}</span>}
                        </>
                    }
                    <p>
                        <span className='bold'>{commit.author.name}</span> committed {parseCommitTime(new Date(commit.author.date))}
                    </p>
                </div>
                <div className='commit-actions'>
                    <span className="btn btn-sm rounded-pill btn-outline-success btn-verified">Verified</span>
                    <div className="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-outline-primary"
                            style={{minWidth: '40px !important', maxWidth: '40px'}}
                            onClick={() => copyToClipboard(commidId)}>
                            {showCopyIcon && <i className="fa-regular fa-copy"></i>}
                            {!showCopyIcon && <span className='text-success'><i className="fa-solid fa-check"></i></span>}
                        </button>
                        <button type="button" className="btn btn-outline-primary">{commidId.substring(0, 7)}</button>
                    </div>
                    <a href={new String(commit.url).replace('https://api.github.com/repos/', 'https://github.com/').replace('/git/commits', '/commit')} target="_blank" className='border rounded btn-code'>
                        <i className="fa-solid fa-code"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};