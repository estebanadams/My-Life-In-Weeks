import moment from "moment";
import { getOldWeeksScore } from "../../services/task";

let scoreForOldWeek = (oldWeeksScore: any[], currWeek: number) => {
  for (let week of oldWeeksScore) {
    if (week.currentWeek === currWeek) return week.weekScore;
  }
  return -1;
};

export const current_week_score = (state: any) => {
  let day = moment().isoWeekday();
  console.log(state);
  let i_day = 0;

  let total_task = 0;
  let task_done = 0;
  while (i_day < day) {
    let i_task = 0;
    while (i_task < state.days[i_day].tasks.length) {
      if (state.days[i_day].tasks[i_task].checked === true) task_done++;
      total_task++;
      i_task++;
    }
    i_day++;
  }
  let score = Math.round((task_done / total_task) * 100) - 1;
  if (score === -1) return 1;
  return score;
};

let scoreToColor = (score: number) => {
  if (score < 20) return "#95F985";
  if (score < 40) return "#4DED30";
  if (score < 60) return "#26D701";
  if (score < 80) return "#00C301";
  if (score < 100) return "#00AB08";
};

export const createWeeks = async (
  birthdate: string,
  task: any,
  uid: string
) => {
  const livespan = 100;
  let oldWeekScore = await getOldWeeksScore(uid);

  console.log("OLDWEEKS", oldWeekScore);
  let birth = moment(birthdate, "DD/MM/YYYY");
  let now = moment();
  let diff = now.diff(birth, "weeks");
  console.log(diff);
  let years = [];
  let i = 0;
  while (i < livespan) {
    let y = 0;
    let year = [];
    while (y < 52) {
      let j = 0;
      let month = [];
      while (j < 4) {
        let curr_week = i * 52 + y + j;
        let future = curr_week > diff;
        let current_week = curr_week === diff;
        if (future) month.push({ color: "white" });
        else if (current_week) {
          let curr_score = current_week_score(task);
          month.push({ color: scoreToColor(curr_score), score: curr_score });
          // if (curr_score < 20) month.push({ color: "#2ecc710" + curr_score });
          // else month.push({ color: "#2ecc71" + curr_score });
        } else if (scoreForOldWeek(oldWeekScore, curr_week) !== -1) {
          let score = scoreForOldWeek(oldWeekScore, curr_week);
          month.push({ color: scoreToColor(score), score });

          // month.push({ color: "#2ecc71" + score });
        } else month.push({ color: "grey" });
        j++;
      }
      year.push(month);
      y += 4;
    }
    years.push(year);
    i++;
  }
  console.log("CREATE WEEKS ", years);
  return years;
};
