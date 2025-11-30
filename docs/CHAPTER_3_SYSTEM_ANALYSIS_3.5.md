# 3.5 PROJECT SCHEDULING

Project scheduling involved creating detailed timelines, identifying task dependencies, and establishing the critical path for project completion. This section presents the GANTT and PERT charts used to manage the Mental Health Hub development timeline.

## 3.5.1 GANTT CHART

The GANTT chart provides visual representation of the project timeline, showing task durations, dependencies, and resource allocation across the 13-week development period.

### Timeline Overview

**Project Duration:** September 1, 2025 - November 30, 2025 (13 weeks)

**Major Milestones:**

- M1: Requirements Complete (Week 2)
- M2: Design Complete (Week 4)
- M3: Backend Implementation Complete (Week 8)
- M4: Frontend Implementation Complete (Week 10)
- M5: Testing Complete (Week 12)
- M6: Project Deployment (Week 13)

### Detailed GANTT Chart

```
MENTAL HEALTH HUB - PROJECT GANTT CHART
September 1 - November 30, 2025

Task                          | Week 1 | Week 2 | Week 3 | Week 4 | Week 5 | Week 6 | Week 7 | Week 8 | Week 9 | Week 10 | Week 11 | Week 12 | Week 13 |
------------------------------|--------|--------|--------|--------|--------|--------|--------|--------|--------|---------|---------|---------|---------|
1. PROJECT INITIATION         |████████|        |        |        |        |        |        |        |        |         |         |         |         |
1.1 Need Identification       |████    |        |        |        |        |        |        |        |        |         |         |         |         |
1.2 Preliminary Investigation |  ██████|        |        |        |        |        |        |        |        |         |         |         |         |
1.3 Feasibility Study         |      ██|████    |        |        |        |        |        |        |        |         |         |         |         |
                              |        |        |        |        |        |        |        |        |        |         |         |         |         |
2. REQUIREMENTS ANALYSIS      |      ██|████████|        |        |        |        |        |        |        |         |         |         |         |
2.1 Stakeholder Requirements  |      ██|████    |        |        |        |        |        |        |        |         |         |         |         |
2.2 Functional Requirements   |        |  ████  |        |        |        |        |        |        |        |         |         |         |         |
2.3 Non-Functional Req        |        |    ████|        |        |        |        |        |        |        |         |         |         |         |
[M1: Requirements Complete]   |        |       ▼|        |        |        |        |        |        |        |         |         |         |         |
                              |        |        |        |        |        |        |        |        |        |         |         |         |         |
3. SYSTEM DESIGN              |        |      ██|████████|████████|        |        |        |        |        |         |         |         |         |
3.1 Architecture Design       |        |      ██|████    |        |        |        |        |        |        |         |         |         |         |
3.2 Database Design           |        |        |  ████  |        |        |        |        |        |        |         |         |         |         |
3.3 UI/UX Design              |        |        |    ████|████    |        |        |        |        |        |         |         |         |         |
3.4 API Design                |        |        |      ██|████    |        |        |        |        |        |         |         |         |         |
3.5 UML Diagrams              |        |        |        |  ██████|        |        |        |        |        |         |         |         |         |
[M2: Design Complete]         |        |        |        |       ▼|        |        |        |        |        |         |         |         |         |
                              |        |        |        |        |        |        |        |        |        |         |         |         |         |
4. IMPLEMENTATION             |        |        |        |      ██|████████|████████|████████|████████|████████|█████████|         |         |         |
4.1 Project Setup             |        |        |        |      ██|██      |        |        |        |        |         |         |         |         |
4.2 Backend Development       |        |        |        |        |████████|████████|████    |        |        |         |         |         |         |
  - Express Server            |        |        |        |        |████    |        |        |        |        |         |         |         |         |
  - Socket.IO Integration     |        |        |        |        |    ████|████    |        |        |        |         |         |         |         |
  - AI Service                |        |        |        |        |        |    ████|████    |        |        |         |         |         |         |
  - API Endpoints             |        |        |        |        |        |      ██|████    |        |        |         |         |         |         |
4.3 Frontend Development      |        |        |        |        |      ██|      ██|  ██████|████████|████████|█████    |         |         |         |
  - HTML Structure            |        |        |        |        |      ██|██      |        |        |        |         |         |         |         |
  - CSS Styling               |        |        |        |        |        |    ████|████    |        |        |         |         |         |         |
  - JavaScript Modules        |        |        |        |        |        |        |  ██████|████████|████    |         |         |         |         |
  - Socket.IO Client          |        |        |        |        |        |        |        |    ████|████    |         |         |         |         |
  - Responsive Design         |        |        |        |        |        |        |        |        |  ██████|████     |         |         |         |
4.4 Integration & Refinement  |        |        |        |        |        |        |        |        |        |   ██████|         |         |         |
[M3: Backend Complete]        |        |        |        |        |        |        |       ▼|        |        |         |         |         |         |
[M4: Frontend Complete]       |        |        |        |        |        |        |        |        |        |        ▼|         |         |         |
                              |        |        |        |        |        |        |        |        |        |         |         |         |         |
5. TESTING                    |        |        |        |        |      ██|      ██|      ██|      ██|      ██|   ██████|█████████|█████████|         |
5.1 Unit Testing              |        |        |        |        |      ██|      ██|      ██|      ██|      ██|   ██    |         |         |         |
5.2 Integration Testing       |        |        |        |        |        |        |        |      ██|      ██|   ████  |         |         |         |
5.3 System Testing            |        |        |        |        |        |        |        |        |        |     ████|████     |         |         |
5.4 User Acceptance Testing   |        |        |        |        |        |        |        |        |        |         |   ██████|         |         |
5.5 Bug Fixing                |        |        |        |        |        |        |        |        |        |         |       ██|████████|         |
[M5: Testing Complete]        |        |        |        |        |        |        |        |        |        |         |         |        ▼|         |
                              |        |        |        |        |        |        |        |        |        |         |         |         |         |
6. DOCUMENTATION              |        |      ██|      ██|      ██|      ██|      ██|      ██|      ██|      ██|   ██████|   ██████|   ██████|█████████|
6.1 Code Documentation        |        |      ██|      ██|      ██|      ██|      ██|      ██|      ██|      ██|   ██    |         |         |         |
6.2 User Guide                |        |        |        |        |        |        |        |        |        |   ████  |   ████  |         |         |
6.3 Technical Documentation   |        |        |        |        |        |        |        |        |        |   ██████|   ██████|         |         |
6.4 Project Report            |        |        |        |        |        |        |        |        |        |         |   ██████|   ██████|████████ |
                              |        |        |        |        |        |        |        |        |        |         |         |         |         |
7. DEPLOYMENT                 |        |        |        |        |        |        |        |        |        |         |         |      ███|█████████|
7.1 Environment Setup         |        |        |        |        |        |        |        |        |        |         |         |      ███|██       |
7.2 Application Deployment    |        |        |        |        |        |        |        |        |        |         |         |         |████     |
7.3 Production Testing        |        |        |        |        |        |        |        |        |        |         |         |         |  ████   |
7.4 Go-Live                   |        |        |        |        |        |        |        |        |        |         |         |         |    ████ |
[M6: Project Complete]        |        |        |        |        |        |        |        |        |        |         |         |         |       ▼ |

Legend:
████ = Task in progress
▼ = Milestone
```

### Resource Allocation Chart

```
WEEKLY RESOURCE ALLOCATION (Hours)

Week  | Initiation | Requirements | Design | Implementation | Testing | Documentation | Deployment | Total Hours |
------|------------|--------------|--------|----------------|---------|---------------|------------|-------------|
  1   |     18     |      2       |   0    |       0        |    0    |       0       |     0      |     20      |
  2   |      2     |     14       |   2    |       0        |    0    |       2       |     0      |     20      |
  3   |      0     |      0       |  15    |       2        |    0    |       3       |     0      |     20      |
  4   |      0     |      0       |  15    |       3        |    0    |       2       |     0      |     20      |
  5   |      0     |      0       |   0    |      20        |    2    |       3       |     0      |     25      |
  6   |      0     |      0       |   0    |      20        |    2    |       3       |     0      |     25      |
  7   |      0     |      0       |   0    |      20        |    2    |       3       |     0      |     25      |
  8   |      0     |      0       |   0    |      20        |    2    |       3       |     0      |     25      |
  9   |      0     |      0       |   0    |      20        |    2    |       3       |     0      |     25      |
 10   |      0     |      0       |   0    |      15        |    5    |       5       |     0      |     25      |
 11   |      0     |      0       |   0    |       0        |   10    |      10       |     0      |     20      |
 12   |      0     |      0       |   0    |       0        |   10    |      10       |     0      |     20      |
 13   |      0     |      0       |   0    |       0        |    0    |      10       |     5      |     15      |
------|------------|--------------|--------|----------------|---------|---------------|------------|-------------|
Total |     20     |     16       |  32    |      120       |   35    |      57       |     5      |    285      |
```

### Key Observations from GANTT Chart

**Critical Path:** Initiation → Requirements → Design → Implementation → Testing → Deployment

**Parallel Activities:**

- Testing begins during implementation (unit tests)
- Documentation occurs throughout project lifecycle
- Bug fixing overlaps with final testing phase

**Buffer Time:**

- 15 hours of buffer included in schedule
- Allows for unexpected delays or issues
- Can be used for additional testing or feature refinement

## 3.5.2 PERT CHART

Program Evaluation and Review Technique (PERT) chart shows task dependencies and critical path through the project.

### PERT Network Diagram

```
MENTAL HEALTH HUB - PERT CHART

START (0 days)
    |
    v
[1] Project Initiation (5 days)
    |
    v
[2] Requirements Analysis (5 days)
    |
    +---------------------------+
    |                           |
    v                           v
[3] Architecture Design (5)    [7] Documentation Start (ongoing)
    |                           |
    v                           |
[4] Database Design (3)         |
    |                           |
    v                           |
[5] UI/UX Design (5)            |
    |                           |
    v                           |
[6] API Design (3)              |
    |                           |
    +-------------+-------------+
                  |
                  v
            [8] Design Review (2)
                  |
                  +---------------------------+
                  |                           |
                  v                           v
         [9] Backend Dev (25)         [13] Frontend Dev (30)
                  |                           |
                  +--------------+------------+
                                 |
                                 v
                         [14] Integration (5)
                                 |
                                 v
                         [15] Unit Testing (3)
                                 |
                                 v
                     [16] Integration Testing (3)
                                 |
                                 v
                         [17] System Testing (5)
                                 |
                                 v
                      [18] User Acceptance (5)
                                 |
                                 v
                         [19] Bug Fixing (7)
                                 |
                                 v
                     [20] Final Documentation (10)
                                 |
                                 v
                         [21] Deployment (3)
                                 |
                                 v
                            END (91 days)

Legend:
[Node Number] Task Name (Duration in days)
---> Critical Path
```

### PERT Activity Table

Table 3.7: PERT Activity Analysis

| Activity | Description           | Predecessor | Duration (days) | ES  | EF  | LS  | LF  | Slack |
| -------- | --------------------- | ----------- | --------------- | --- | --- | --- | --- | ----- |
| A        | Project Initiation    | -           | 5               | 0   | 5   | 0   | 5   | 0\*   |
| B        | Requirements Analysis | A           | 5               | 5   | 10  | 5   | 10  | 0\*   |
| C        | Architecture Design   | B           | 5               | 10  | 15  | 10  | 15  | 0\*   |
| D        | Database Design       | C           | 3               | 15  | 18  | 15  | 18  | 0\*   |
| E        | UI/UX Design          | D           | 5               | 18  | 23  | 18  | 23  | 0\*   |
| F        | API Design            | E           | 3               | 23  | 26  | 23  | 26  | 0\*   |
| G        | Design Review         | F           | 2               | 26  | 28  | 26  | 28  | 0\*   |
| H        | Backend Development   | G           | 25              | 28  | 53  | 28  | 53  | 0\*   |
| I        | Frontend Development  | G           | 30              | 28  | 58  | 28  | 58  | 0\*   |
| J        | Integration           | H, I        | 5               | 58  | 63  | 58  | 63  | 0\*   |
| K        | Unit Testing          | J           | 3               | 63  | 66  | 63  | 66  | 0\*   |
| L        | Integration Testing   | K           | 3               | 66  | 69  | 66  | 69  | 0\*   |
| M        | System Testing        | L           | 5               | 69  | 74  | 69  | 74  | 0\*   |
| N        | User Acceptance       | M           | 5               | 74  | 79  | 74  | 79  | 0\*   |
| O        | Bug Fixing            | N           | 7               | 79  | 86  | 79  | 86  | 0\*   |
| P        | Final Documentation   | O           | 3               | 86  | 89  | 86  | 89  | 0\*   |
| Q        | Deployment            | P           | 2               | 89  | 91  | 89  | 91  | 0\*   |

\*Critical Path Activities (Slack = 0)

### Critical Path Analysis

**Critical Path:** A → B → C → D → E → F → G → I → J → K → L → M → N → O → P → Q

**Total Project Duration:** 91 days (13 weeks)

**Critical Path Duration:** 91 days

**Key Insights:**

1. **Frontend Development (I)** is on critical path, not backend - frontend takes longer (30 vs 25 days)
2. **Zero slack** throughout critical path means any delay impacts final deadline
3. **Backend development** has 5 days of slack (can be delayed up to 5 days without affecting project)
4. **Documentation** occurs in parallel, reducing overall timeline

### Risk Analysis Based on PERT

**High-Risk Activities (Critical Path):**

- Frontend Development (30 days): Longest single activity, any delay critical
- Backend Development (25 days): Complex, but has 5-day buffer
- Integration (5 days): Dependencies on both backend and frontend completion
- Testing phases (16 days combined): Sequential, cumulative delays possible

**Mitigation Strategies:**

1. Begin frontend development early
2. Maintain daily progress tracking
3. Identify issues early in testing
4. Keep scope tightly controlled

### Time Estimates Using Three-Point Estimation

For critical activities, three-point estimation was used:

**Formula:** Expected Time (TE) = (Optimistic + 4×Most Likely + Pessimistic) / 6

Table 3.8: Three-Point Time Estimates for Critical Activities

| Activity             | Optimistic (days) | Most Likely (days) | Pessimistic (days) | Expected Time (days) |
| -------------------- | ----------------- | ------------------ | ------------------ | -------------------- |
| Frontend Development | 25                | 30                 | 40                 | 31                   |
| Backend Development  | 20                | 25                 | 35                 | 26                   |
| Integration          | 3                 | 5                  | 8                  | 5                    |
| System Testing       | 3                 | 5                  | 9                  | 5                    |
| Bug Fixing           | 4                 | 7                  | 12                 | 7                    |

### Schedule Compression Techniques

If delays occur, following compression techniques can be applied:

**Fast Tracking:**

- Start frontend development 3 days before backend completion
- Begin integration testing during unit testing
- Overlap bug fixing with final testing

**Crashing:**

- Increase daily working hours during implementation
- Simplify non-critical features
- Use code generators/templates for boilerplate code

### Milestone Schedule

Table 3.9: Project Milestones and Target Dates

| Milestone                 | Target Date   | Deliverable                    | Success Criteria         |
| ------------------------- | ------------- | ------------------------------ | ------------------------ |
| M1: Requirements Complete | Sept 12, 2025 | Requirements Document          | Stakeholder approval     |
| M2: Design Complete       | Sept 26, 2025 | Design Documents, UML Diagrams | Design review passed     |
| M3: Backend Complete      | Oct 24, 2025  | Working API & Services         | All endpoints functional |
| M4: Frontend Complete     | Nov 7, 2025   | Complete UI                    | All features implemented |
| M5: Testing Complete      | Nov 21, 2025  | Test Reports                   | All tests passed         |
| M6: Project Complete      | Nov 30, 2025  | Deployed Application           | Live and accessible      |

### Actual vs Planned Timeline

The project scheduling provided realistic timeline that was successfully adhered to with minor variations:

**Actual Performance:**

- Requirements: Completed on schedule
- Design: Completed 2 days early (efficiency gain)
- Implementation: Completed on schedule
- Testing: Required 3 extra days (extended UAT)
- Documentation: Ongoing throughout, completed on time
- Deployment: Completed on schedule

**Total Variance:** +3 days, absorbed by buffer time

The comprehensive GANTT and PERT charts proved instrumental in managing the project timeline effectively, identifying critical path, and ensuring timely completion of the Mental Health Hub platform.
