// Store all tasks entered by the user
let tasks = [];

// Get HTML elements
const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const taskDurationInput = document.getElementById("task-duration");
const taskDeadlineInput = document.getElementById("task-deadline");
const availableHoursInput = document.getElementById("available-hours");
const errorMessage = document.getElementById("error-message");
const taskList = document.getElementById("task-list");
const algorithmOutput = document.getElementById("algorithm-output");
const tabButtons = document.querySelectorAll(".tab-btn");
const clearTasksButton = document.getElementById("clear-tasks");

// Add a new task
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = taskNameInput.value.trim();
  const duration = Number(taskDurationInput.value);
  const deadline = Number(taskDeadlineInput.value);

  // Input validation
  if (name === "") {
    showError("Please enter a task name.");
    return;
  }

  if (!duration || duration <= 0) {
    showError("Duration must be a number greater than 0.");
    return;
  }

  if (!deadline || deadline <= 0) {
    showError("Deadline must be a number greater than 0.");
    return;
  }

  const availableHours = Number(availableHoursInput.value);

  if (!availableHours || availableHours <= 0) {
    showError("Available hours must be greater than 0.");
    return;
  }

  const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);

  if (totalDuration + duration > availableHours) {
    showError("Tasks cannot exceed the total available working hours.");
    return;
  }

  tasks.push({
    name: name,
    duration: duration,
    deadline: deadline
  });

  hideError();
  taskForm.reset();
  displayTasks();
});

// Clear all tasks
clearTasksButton.addEventListener("click", function () {
  tasks = [];
  displayTasks();
  algorithmOutput.innerHTML = "";
  hideError();
});

// Show validation error
function showError(message) {
  errorMessage.textContent = message;
}

// Hide validation error
function hideError() {
  errorMessage.textContent = "";
}

// Display all added tasks
function displayTasks() {
  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks added yet.</p>";
    return;
  }

  let html = "";

  tasks.forEach(function (task, index) {
    html += `
      <div class="task-item">
        <strong>${index + 1}. ${task.name}</strong><br>
        Duration: ${task.duration} hour(s)<br>
        Deadline: Hour ${task.deadline}
      </div>
    `;
  });

  taskList.innerHTML = html;
}

// Calculate schedule results for a given task order
function evaluateSchedule(order) {
  let currentTime = 0;
  let totalLateness = 0;

  const schedule = order.map(function (task) {
    const startTime = currentTime;
    const finishTime = currentTime + task.duration;
    const lateness = Math.max(0, finishTime - task.deadline);

    currentTime = finishTime;
    totalLateness += lateness;

    return {
      name: task.name,
      duration: task.duration,
      deadline: task.deadline,
      startTime: startTime,
      finishTime: finishTime,
      lateness: lateness
    };
  });

  return {
    schedule: schedule,
    totalLateness: totalLateness,
    feasible: currentTime <= Number(availableHoursInput.value)
  };
}

// Create HTML result for one algorithm
function showResult(title, explanation, timeComplexity, spaceComplexity, result) {
  let scheduleRows = "";

  result.schedule.forEach(function (task) {
    const lateClass = task.lateness > 0 ? "late" : "";

    scheduleRows += `
      <tr>
        <td>${task.name}</td>
        <td>${task.startTime}</td>
        <td>${task.finishTime}</td>
        <td>${task.deadline}</td>
        <td class="${lateClass}">${task.lateness}</td>
      </tr>
    `;
  });

  const feasibility = result.feasible
    ? `<p class="success">All tasks fit within the available time.</p>`
    : `<p class="late">Some tasks exceed the available working time.</p>`;

  algorithmOutput.innerHTML = `
    <div class="result-box">
      <h3>${title}</h3>

      <p><strong>How it works:</strong></p>
      <p>${explanation}</p>

      <div class="complexity">
        <p><strong>Time complexity:</strong> ${timeComplexity}</p>
        <p><strong>Space complexity:</strong> ${spaceComplexity}</p>
      </div>

      <p><strong>Total lateness:</strong> ${result.totalLateness}</p>
      ${feasibility}

      <table class="schedule-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Start Time</th>
            <th>Finish Time</th>
            <th>Deadline</th>
            <th>Lateness</th>
          </tr>
        </thead>
        <tbody>
          ${scheduleRows}
        </tbody>
      </table>
    </div>
  `;
}

// 1. Brute Force: try every possible order
function bruteForce(inputTasks) {
  const permutations = getAllPermutations(inputTasks);

  let bestResult = null;

  permutations.forEach(function (order) {
    const result = evaluateSchedule(order);

    if (
      !bestResult ||
      result.totalLateness < bestResult.totalLateness
    ) {
      bestResult = result;
    }
  });

  return bestResult;
}

// Generate all permutations of tasks
function getAllPermutations(array) {
  if (array.length <= 1) {
    return [array];
  }

  const result = [];

  array.forEach(function (item, index) {
    const remaining = array.filter(function (_, i) {
      return i !== index;
    });

    const smallerPermutations = getAllPermutations(remaining);

    smallerPermutations.forEach(function (permutation) {
      result.push([item, ...permutation]);
    });
  });

  return result;
}

// 2. Greedy: choose earliest deadline first
function greedy(inputTasks) {
  const sortedTasks = [...inputTasks].sort(function (a, b) {
    return a.deadline - b.deadline;
  });

  return evaluateSchedule(sortedTasks);
}

// 3. Dynamic Programming: find optimal schedule using subsets
function dynamicProgramming(inputTasks) {
  const n = inputTasks.length;
  const dp = new Map();

  dp.set(0, {
    lateness: 0,
    time: 0,
    order: []
  });

  for (let mask = 1; mask < (1 << n); mask++) {
    for (let i = 0; i < n; i++) {
      // Check whether task i is included in this subset
      if (!(mask & (1 << i))) {
        continue;
      }

      const previousState = dp.get(mask ^ (1 << i));
      const task = inputTasks[i];

      const finishTime = previousState.time + task.duration;
      const lateness = Math.max(0, finishTime - task.deadline);
      const newLateness = previousState.lateness + lateness;

      const currentState = dp.get(mask);

      if (!currentState || newLateness < currentState.lateness) {
        dp.set(mask, {
          lateness: newLateness,
          time: finishTime,
          order: [...previousState.order, task]
        });
      }
    }
  }

  const finalState = dp.get((1 << n) - 1);

  return evaluateSchedule(finalState.order);
}

// 4. Divide and Conquer: recursively split tasks, then combine every
// possible interleaving of each half's orders and keep the least-late schedule.
function divideAndConquer(inputTasks) {
  function generateOrders(items) {
    if (items.length <= 1) {
      return [items];
    }

    const middle = Math.floor(items.length / 2);
    const leftOrders = generateOrders(items.slice(0, middle));
    const rightOrders = generateOrders(items.slice(middle));
    const combinedOrders = [];

    function interleave(left, right, leftIndex, rightIndex, order) {
      if (leftIndex === left.length && rightIndex === right.length) {
        combinedOrders.push(order);
        return;
      }

      if (leftIndex < left.length) {
        interleave(
          left,
          right,
          leftIndex + 1,
          rightIndex,
          [...order, left[leftIndex]]
        );
      }

      if (rightIndex < right.length) {
        interleave(
          left,
          right,
          leftIndex,
          rightIndex + 1,
          [...order, right[rightIndex]]
        );
      }
    }

    leftOrders.forEach(function (leftOrder) {
      rightOrders.forEach(function (rightOrder) {
        interleave(leftOrder, rightOrder, 0, 0, []);
      });
    });

    return combinedOrders;
  }

  const candidateOrders = generateOrders(inputTasks);
  let bestResult = null;

  candidateOrders.forEach(function (order) {
    const result = evaluateSchedule(order);

    if (!bestResult || result.totalLateness < bestResult.totalLateness) {
      bestResult = result;
    }
  });

  return bestResult;
}

// 5. Backtracking: build schedules step by step
function backtracking(inputTasks) {
  let bestResult = null;
  const availableHours = Number(availableHoursInput.value);

  function explore(remainingTasks, currentOrder, currentTime, currentLateness) {
    if (remainingTasks.length === 0) {
      const result = evaluateSchedule(currentOrder);

      if (
        !bestResult ||
        result.totalLateness < bestResult.totalLateness
      ) {
        bestResult = result;
      }

      return;
    }

    for (let i = 0; i < remainingTasks.length; i++) {
      const task = remainingTasks[i];
      const finishTime = currentTime + task.duration;

      // Stop exploring invalid branches
      if (finishTime > availableHours) {
        continue;
      }

      const lateness = Math.max(0, finishTime - task.deadline);

      const newRemainingTasks = remainingTasks.filter(function (_, index) {
        return index !== i;
      });

      explore(
        newRemainingTasks,
        [...currentOrder, task],
        finishTime,
        currentLateness + lateness
      );
    }
  }

  explore(inputTasks, [], 0, 0);

  return bestResult;
}

// Handle algorithm tab selection
tabButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    tabButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    runAlgorithm(button.dataset.algorithm);
  });
});

// Run selected algorithm
function runAlgorithm(algorithm) {
  if (tasks.length === 0) {
    algorithmOutput.innerHTML = `
      <div class="result-box">
        <p class="late">Please add at least one task before running an algorithm.</p>
      </div>
    `;
    return;
  }

  if (tasks.length > 8) {
    algorithmOutput.innerHTML = `
      <div class="result-box">
        <p class="late">
          Brute force, divide and conquer, and backtracking become very slow after 8 tasks.
          Please use 8 tasks or fewer for this demonstration.
        </p>
      </div>
    `;
    return;
  }

  let result;

  if (algorithm === "bruteForce") {
    result = bruteForce(tasks);

    showResult(
      "Brute Force Result",
      `
      Brute force tries every possible order of the tasks.
      For each order, it calculates the finish time and lateness of every task.
      Finally, it chooses the order with the lowest total lateness.
      `,
      "O(n!)",
      "O(n × n!)",
      result
    );
  }

  if (algorithm === "greedy") {
    result = greedy(tasks);

    showResult(
      "Greedy Algorithm Result",
      `
      The greedy algorithm sorts tasks by their deadlines.
      It always schedules the task with the earliest deadline first.
      This method is fast, but it may not always produce the best possible schedule.
      `,
      "O(n log n)",
      "O(n)",
      result
    );
  }

  if (algorithm === "dynamic") {
    result = dynamicProgramming(tasks);

    showResult(
      "Dynamic Programming Result",
      `
      Dynamic programming solves smaller scheduling subproblems first.
      It stores the best result for every subset of tasks and uses those results
      to build the best complete schedule.
      `,
      "O(n × 2^n)",
      "O(2^n)",
      result
    );
  }

  if (algorithm === "backtracking") {
    result = backtracking(tasks);

    showResult(
      "Backtracking Result",
      `
      Backtracking builds a schedule one task at a time.
      If a choice makes the schedule invalid or exceeds the available time,
      the algorithm stops exploring that path and tries another choice.
      `,
      "Exponential in the worst case",
      "O(n)",
      result
    );
  }

  if (algorithm === "divideConquer") {
    result = divideAndConquer(tasks);

    showResult(
      "Divide and Conquer Result",
      `
      Divide and conquer splits the tasks into two groups, recursively generates
      possible orders for each group, and combines them using all possible
      interleavings. It evaluates each complete schedule and keeps the one with
      the lowest total lateness.
      `,
      "O(n logn)",
      "O(n)",
      result
    );
  }
}

// Show initial message
displayTasks();
