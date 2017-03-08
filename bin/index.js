const path = require('path');
const fs = require('fs');
const sh = require('kool-shell');
const rootPath = path.join(__dirname, '..');

const graph = {
  cells: [],
  startDate: new Date(2015, 9 - 1, 27),
  endDate: new Date(2016, 10 - 1, 2),
  dateToIndex: function(date) {
    function diffDays(dateA, dateB) {
      return Math.round(Math.abs((dateA.getTime() - dateB.getTime()) / (24*60*60*1000)));
    }
    return diffDays(this.startDate, date);
  },

  indexToDate: function(index) {
    return new Date(this.startDate.getTime() + index * (24*60*60*1000));
  }
};

graph.cells = new Array(graph.dateToIndex(graph.endDate));

const logFile = 'bro-grass.log';

// commit(graph.startDate, logFile);

let commitDates = [];
for (let i = 0; i < graph.cells.length; i++) {
  let d = graph.indexToDate(i);
  commitDates.push(d);
}
commitAll(commitDates, logFile);
// .then(() => sh.exec('git', ['push']));


function commitAll(dates, file) {
  return new Promise(function(resolve, reject) {
    let i = 0, len = dates.length;
    (function iterate() {
      if (i >= len) return resolve();
      commit(dates[i], file).then(()=>{ i++; iterate() });
    })();
  });
}

function commit(date, file) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(rootPath, file);
    const dateStr = date.toISOString();
    fs.appendFile(filePath, `${dateStr}\n`);

    process.env.GIT_AUTHOR_DATE = dateStr;
    process.env.GIT_COMMITTER_DATE = dateStr;

    sh.exec('git', ['add', filePath])
      .then(() => sh.exec('git', ['commit', '-m', 'grow grass']), {cwd: rootPath})
      .then((success) => resolve(success))
      .catch((err) => reject(err));
  });
}