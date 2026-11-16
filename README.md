# Algorithm Explorer: Task Scheduler

This is a small web application that solves a real-world scheduling problem
using four different algorithmic approaches.

## Live Website

Add your deployed website link here after deployment.

Example:

https://your-site-name.netlify.app

## GitHub Repository

Add your GitHub repository link here after uploading the project.

## Problem

People often need to complete multiple tasks before deadlines.
For example, a student may need to study, submit an assignment, and prepare
a presentation. Each task takes time, and only one task can be done at a time.

This website helps users create a schedule that avoids overlapping tasks and
reduces total lateness.

## Why It Matters in Real Life

In daily life, people often have more tasks than time available. Students,
workers, and managers must decide what to do first when several tasks have
different deadlines. A good schedule can reduce stress, help meet deadlines,
and use time more effectively.

This project shows why scheduling matters: even a small change in task order
can make a big difference in whether tasks are completed on time. It also helps
visualize how different algorithms handle the same real-world problem.

## What the Program Computes

The user enters:

- Task name
- Task duration in hours
- Task deadline in hours
- Total available working hours

The website calculates:

- The order in which tasks should be completed
- Start time and finish time for each task
- Lateness for each task
- Total lateness
- Whether all tasks fit within the available time

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

### 5. Divide and Conquer

Divide and conquer sorts the bookings by end time.
It divides the problem into smaller parts and uses binary search to find
the latest booking that ends before the current booking starts.

It compares the value of accepting the current booking with rejecting it.
It then combines the best results to find the highest total value.

- Time complexity: O(n log n)
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
