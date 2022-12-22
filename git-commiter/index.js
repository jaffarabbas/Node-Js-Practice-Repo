const { default: simpleGit } = require("simple-git");



const options = {
   baseDir: process.cwd(),
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

// when setting all options in a single object
// const git = simpleGit(options);

// or split out the baseDir, supported for backward compatibility
const git = simpleGit('J:\GitHub\Angular-Practise-Repo', { binary: 'git' });

function test() {
    console.log(git.status)
}

test()