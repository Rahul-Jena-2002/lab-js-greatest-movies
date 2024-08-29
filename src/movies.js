const movies = require('../src/data');
// Iteration 1: All directors - Get the array of all directors.
// _Bonus_: Remove duplicates from the array.
function getAllDirectors(moviesArray) {
  const directors = moviesArray.map(movie => movie.director);
  return [...new Set(directors)];
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(movie => movie.director === "Steven Spielberg" && movie.genre.includes("Drama")).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if(moviesArray.length === 0) return 0;      
  const total = moviesArray.map(movie=>movie.score || 0 ).reduce((total,sum)=>total+sum,0)  
  return  Math.round((total/moviesArray.length)*100)/100;   
}


// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(movie => movie.genre.includes("Drama"));
  if (dramaMovies.length === 0) return 0;
  const totalScore = dramaMovies.reduce((acc, movie) => acc + movie.score, 0);
  return parseFloat((totalScore / dramaMovies.length).toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  return [...moviesArray].sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return moviesArray
    .map(movie => movie.title)
    .sort()
    .slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(movie => {
    const durationArr = movie.duration.split(' ');
    let duration = 0;

    if (durationArr[0].includes('h')) {
      duration += parseInt(durationArr[0]) * 60;
    }
    if (durationArr[1] && durationArr[1].includes('min')) {
      duration += parseInt(durationArr[1]);
    }

    return {
      ...movie,
      duration
    };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null;

  const years = moviesArray.reduce((acc, movie) => {
    if (movie.year in acc) {
      acc[movie.year].totalScore += movie.score;
      acc[movie.year].count += 1;
    } else {
      acc[movie.year] = { totalScore: movie.score, count: 1 };
    }
    return acc;
  }, {});

  let bestYear = null;
  let bestAvg = -1;

  for (const year in years) {
    const avg = years[year].totalScore / years[year].count;
    if (avg > bestAvg || (avg === bestAvg && year < bestYear)) {
      bestAvg = avg;
      bestYear = year;
    }
  }

  return `The best year was ${bestYear} with an average score of ${bestAvg}`;
}


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
