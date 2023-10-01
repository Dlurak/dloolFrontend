# Dlool

## A digital and collaborative homework book

Dlool is the digital version of a homework book. And it is collaborative.
Classical homework books have a lot of problems, also a lot of people use tablets in school and don't have any folders but still an analog homework book. With Dlool there is a good solution to this problem. There are even more problems here is a table with some problems:

| Problem                                    | Solution                                                                                                                    |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Everyone in a class writes down the same   | Dlool is collaborative, all entries from one class are available for everyone                                               |
| They are not very good for the environment | Dlool is digital, no paper is needed.                                                                                       |
| They are not very practical                | Dlool is available on all devices.                                                                                          |
| Entries are not very structured            | Dlool has a structured entry system.                                                                                        |
| When you lose your homework book           | Dlool is digital, you can't lose it.                                                                                        |
| Every year you need a new homework book    | Dlool can be used for multiple years.                                                                                       |
| You are locked into a specific brand       | Dlool is free and open source. With dlool you can export your data to ical or todo.txt.                                     |
| Homework, tests and notes are not separate | Dlool has a different system for homework, tests and notes. Everything is sperated but still in one place and easy to find. |

---

## Features

- Collaborative
- Structured
- Exportable as ical and todo.txt
- Available on all devices
- PWA
- Dark mode
- REST API
- Usable without an account
- Usable for many years
- Moderation system
- Private and public notes
- A calendar for tests
- And more...

## Technologies

### Frontend

- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [Boxicons](https://boxicons.com/)
- [inLang](https://inlang.com/)

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

## Getting started

The easiest way to try Dlool is to visit [the official deployment](https://dlool-frontend.vercel.app/).

If you want to run it locally e.g. for development you can follow the instructions below.

Homeworks will be publicly visible for everyone, this isn't a bug but to prevent bullying. But if you want to create, update or delete homeworks you will need an account for a specific class. You can create one [here](https://dlool-frontend.vercel.app/register). It may happen that somebody from your class is already using Dlool, then they will need to accept your request to sign up for the class. This can be done by going to [this page](https://dlool-frontend.vercel.app/requests/list) and clicking on the accept button.

Once you have your account you can login [here](https://dlool-frontend.vercel.app/login) and create a homework [here](https://dlool-frontend.vercel.app/homeworks/). You can also export your homework as ical [here](https://dlool-frontend.vercel.app/tricks#ical).

When you have any questions, find a bug or have an idea for a feature you can create an issue.

## Installation

1. Clone this repository

   ```bash
   git clone git@github.com:Dlurak/dloolFrontend.git
   ```

2. Install the dependencies

   ```bash
   npm install
   ```

3. Build from source

   ```bash
   npm run build
   ```

4. Start the server

   ```bash
   npm run preview
   ```

5. The server runs on [localhost port 4173](http://localhost:4173)

For any real use you need to setup the backend too. You can find it [here](https://www.github.com/Dlurak/dloolBackend). By default the frontend expects the backend to run on [localhost port 3000](http://localhost:3000) but you can change that in the .env file with the variable `PUBLIC_API_URL`.
