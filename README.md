# EnormoQB

[EnormoQB](https://enormoqb.tech/) is a crowd-sourced question bank developed as a part of [Smart India Hackathon 2022](https://sih.gov.in/) for Department of School Education & Literacy (DoSEL), Ministry of Education.

<img width="1440" alt="Screenshot 2022-08-20 at 12 13 20 AM" src="https://user-images.githubusercontent.com/75029142/185686385-7e653bb2-91ff-456e-9001-6c940f8b89ad.png">

<Br/>

# Table of Contents

- [Problem Statement](#ps)
- [Inspiration](#inspiration)
- [Solution](#solution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Future Scope](#future-scope)
- [Project Setup Guide](#setup)
- [Working Model Screenshots](#working-model-ss)
- [Bug Reporting/ Feature Requests](#bug-report-feature-requests)

<a id="ps"></a>

# Problem Statement

To be able to graduate to objective type questions for one semester of online board exams, a question bank of at least 5000 questions will be required for each subject. Setting question papers for the exams is a complicated task. Can you think of a Crowd Sourcing model where questions are set by large number of anonymous stakeholders thereby creating a large question bank? These questions can be vetted by experts before freezing the same in the question bank. The actual question paper can be set through an automated system.

<a id="inspiration"></a>

# Inspiration

As we all know setting question papers for the board exams is not an easy task. The following are the drawbacks of the existing board paper setting system:

1. It takes a lot of time to manually find and add questions to the question papers of each subject which leads to a prolonged process.
2. Another drawback to the existing way is that it requires manpower and unnecessary storage space for the management of previously generated question papers, which is difficult in the longer run.
3. Also, Due to the changing environment of examinations in the light of ongoing events, there emerged a need to develop multiple question papers for a single academic year.

We decided to build to work on this problem statemnet to overcome these drawbacks and make examination system better in India.

<a id="solution"></a>

# Solution

You don't have to worry because board question papers have a new QB introducing EnormoQB. We came up with an eco-friendly and easy solution to generate question papers for the board exams from the ocean of questions created by the contribution of some brilliant teachers. EnormoQB is advancing the traditional board paper setting system in the following way:

1. The generated crowdsourcing model can help us to create a hassle-free and quality question paper with the input of all the brilliant minds around the world.
2. The genre of the application not only focuses on a particular use case but can be extended to any format according to the need of the examination.
3. From practice set to actual exam set, every other question paper can be set through an automated system in no time.
4. There are currently no existing solutions that can automate the question paper generation for Board Exams with a large question bank.

<a id="features"></a>

# Features

- Unified website with different privileges (members / admin / super admin).
- For Member
  - Login/signup through Google email address maintaining member's anonymity.
  - Member can contribute questions by filling out required details to get it approved by the admins.
  - Member can view their pending, rejected and approved questions.
  - On rejection member can edit the question according to the feedback provided by the admin and resubmit it.
  - On approval member will earn a point that will be stored in their wallet and they can use their points to buy vouchers and EnormoQB swags from the store.
  - Member can delete questions from pending and rejected questions.
- For Admin

  - Login/signup through Google email address.
  - Admin will be responsible for approving or rejecting the questions submitted by the members.
  - On reviewing a question number of similar questions will be displayed and admin can check the list of similar questions and approve/reject the question accordingly.
  - Admin will be able to send a feedback on rejection.
  - Admin can flag a question if they find it inappropriate. Once flagged the member's account would be freezed for 7 days.
  - Admin can also contribute questions.
  - Admin can generate question papers by filling out required details.
  - Admin can preview the generated paper, add more questions, reorder the qyestions and print the question paper.
  - Admin can also view and download the previously generated question papers.

- For Super Admin
  - Super admin is responsible for converting role of a member to an admin and vice versa.
  - Super admin can manage the question bank and question papers.

<a id="tech-stack"></a>

# Tech Stack

- ReactJs
- Redux + RTK Query
- NodeJs
- ExpressJs
- MongoDB
- Docker
- Docker Compose
- Redis
- Natural Language Processing(NLP)
- Python
- Amazon Web Services(AWS)

<a id="future-scope"></a>

# Future Scope

- **Plagiarism**<br/>
  The question submitted by the contributor would go through a plagiarism check so that the EnormoQB question bank will have original questions only.

- **Optical Character Recognition(OCR)**<br/>
  Contributor would be able to upload the picture of the their handwritten question and EnormoQB will extract the question from the picture uploaded.

<a id="setup"></a>

# Project Setup Guide

## Frontend

1. Clone EnormoQB-Frontend-v2 repo and install dependencies

   ```sh
   git clone https://github.com/EnormoQB/EnormoQB-Frontend-v2.git
   cd EnormoQB-Frontend-v2
   npm i
   ```

2. Copy .env.example content to .env

   ```sh
   cp .env.example .env
   ```

3. Start the react app

   ```sh
   npm start
   ```

<a id="working-model-ss"></a>

# Working Model Screenshots

<a id="bug-report-feature-requests"></a>

# Bug Reporting/ Feature Requests
