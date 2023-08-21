# Dlool

## A digital and collaborative homework book

Dlool is the digital version of a homework book. And it is collaborative.
Classical homework books have a lot of problems, also a lot of people use tablets in school and don't have any folders but still an analog homework book. With Dlool there is a gogod solution to this problem. There are even more problems here is a table with some problems:

| Problem                                    | Solution                                                                      |
| ------------------------------------------ | ----------------------------------------------------------------------------- |
| Everyone in a class writes down the same   | Dlool is collaborative, all entries from one class are available for everyone |
| They are not very good for the environment | Dlool is digital, no paper is needed.                                         |
| They are not very practical                | Dlool is available on all devices.                                            |
| Entries are not very structured            | Dlool has a structured entry system.                                          |
| When you lose your homework book           | Dlool is digital, you can't lose it.                                          |
| Every year you need a new homework book    | Dlool can be used for multiple years.                                         |

---

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
