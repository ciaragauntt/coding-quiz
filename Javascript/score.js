function showHighScore () {
    var highscore = JSON.parse(window.localStorage.getItem("high-scores")) || [];

    //put high scores in decending order
    highscore.sort(function(a,b) {
        return b.score - a.score;
    });

    // put the scores in a list
    highscore.forEach(function(score) {
        var scoreLi = document.createElement("li");
        scoreLi.textContent = score.name + " - " + score.score;

        var display = document.getElementById("high-scores");
        display.appendChild(scoreLi);
    });
}

function clearScores () {
    window.localStorage.removeItem("high-scores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearScores;

showHighScore();