# Algorithm Explorer: Task Scheduler

This is a small web application that solves a real-world scheduling problem
using four different algorithmic approaches.

## Live Website

Add your deployed website link here after deployment.

Example:

https://your-site-name.netlify.app

## GitHub Repository

Add your GitHub repository link here after uploading the project.

## Problem Statement

Given a set of tasks, each with a duration and deadline, arrange the tasks in
one-at-a-time order within a limited number of available working hours. The
schedule should avoid overlapping tasks and aim to minimize the total lateness
(the sum of how late completed tasks are past their deadlines).

## Why It Matters

Planning tasks is a common challenge for students, employees, and event
organizers who have limited time and multiple deadlines. Comparing scheduling
strategies helps people understand how to prioritize work, while demonstrating
that a fast, simple rule may not always find the best schedule. This project
also makes algorithm concepts concrete by showing how different approaches
trade off solution quality, execution time, and memory use.

## What the Program Computes

The user enters:

- Task name
- Task duration in hours
- Task deadline in hours
- Total available working hours

For the selected algorithm, the website computes and displays:

- The order in which tasks should be completed
- Start time and finish time for each task
- Lateness for each task (zero when completed by its deadline)
- Total lateness across the schedule
- Whether the scheduled tasks fit within the available time
- The algorithm's time and space complexity, along with a brief explanation

## Algorithms Used

### 1. Brute Force

Brute force checks every possible order of tasks and chooses the schedule
with the lowest total lateness.

- Time complexity: O(n!)
- Space complexity: O(n)

### 2. Greedy Algorithm

The greedy algorithm sorts tasks by deadline and schedules the task with the
earliest deadline first.

- Time complexity: O(n log n)
- Space complexity: O(n)

### 3. Dynamic Programming

Dynamic programming solves smaller subproblems first. It stores the best
result for every subset of tasks and uses those results to build the best
complete schedule.

- Time complexity: O(n × 2^n)
- Space complexity: O(2^n)

### 4. Backtracking

Backtracking builds a schedule one task at a time. If a task cannot fit
within the available time, the algorithm stops exploring that path and
tries another option.

- Time complexity: Exponential in the worst case
- Space complexity: O(n)

## How to Run Locally

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in any web browser.

No installation or server is required.

## Technologies Used

- HTML
- CSS
- JavaScript

## Deployment

This project can be deployed using GitHub Pages or Netlify.

### Deploy on Netlify

1. Go to https://app.netlify.com/drop
2. Drag and drop the project folder.
3. Netlify will create a public website link.

## Group Members

Add your group members’ names and roles here.

| Name | Role |
|---|---|
| Member 1 | HTML, CSS, UI |
| Member 2 | Brute force and backtracking |
| Member 3 | Greedy and dynamic programming |
| Member 4 | Testing, documentation, deployment |
