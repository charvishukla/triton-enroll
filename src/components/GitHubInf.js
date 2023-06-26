import React from 'react';

const GitHubPage = () => {
  return (
    <div >
        <h1 className='GithubPageHead'> GitHub</h1>
      <p> Here are the front-end and the back-end repositories used in this project!</p>
      <a href="https://github.com/charvishukla/triton-enroll" target="_blank" rel="noopener noreferrer" className="repo-button">
        <button>Front-end Repository</button>
      </a>
      <a href="https://github.com/charvishukla/course-scraper" target="_blank" rel="noopener noreferrer" className="repo-button">
        <button>Back-end Repository</button>
      </a>
    </div>
  );
};

export default GitHubPage;