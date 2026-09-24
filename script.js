const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");

let count = 0;
const max_count = 2;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;
  console.log(name, team);
  if (count >= max_count) {
    return;
  }
  count++;
  attendeeCount.textContent = count;
  console.log(count);

  const percent = Math.min(Math.round((count / max_count) * 100), 100) + "%";
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = percent;

  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  const greeting = document.getElementById("greeting");
  let message = `🎉 Welcome, ${name} from ${teamName}`;

  if (count >= max_count) {
    const teamTotals = [
      {
        name: "Team Water Wise",
        count: parseInt(document.getElementById("waterCount").textContent),
      },
      {
        name: "Team Net Zero",
        count: parseInt(document.getElementById("zeroCount").textContent),
      },
      {
        name: "Team Renewables",
        count: parseInt(document.getElementById("powerCount").textContent),
      },
    ];

    let winningTeam = teamTotals[0];

    for (let i = 1; i < teamTotals.length; i++) {
      if (teamTotals[i].count > winningTeam.count) {
        winningTeam = teamTotals[i];
      }
    }
    equals = [];
    for (let i = 0; i < teamTotals.length; i++) {
      if (teamTotals[i].name != winningTeam.name) {
        if (teamTotals[i].count == winningTeam.count) {
          equals.push(teamTotals[i]);
        }
      }
    }
    if (equals.length > 0) {
      const equalNames = equals.map((team) => team.name).join(", ");
      message = `🎉 Goal reached! 50 attendees checked in. It's a tie between ${winningTeam.name} and ${equalNames} with ${winningTeam.count} check-ins each!`;
    } 
    else {
      message = `🎉 Goal reached! 50 attendees checked in. Winning team: ${winningTeam.name} with ${winningTeam.count} check-ins!`;
    }
  }

  greeting.textContent = message;
  greeting.classList.add("success-message");
  greeting.style.display = "block";
  form.reset();
});
