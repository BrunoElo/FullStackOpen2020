const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());

// Middleware
morgan.token("reqBody", (request, response) => {
  return `{"name":"${request.body.name}", "number":"${request.body.number}"}`;
});
morgan.format(
  "tinyExt",
  ":method :url :status :res[content-length] - :response-time ms :reqBody"
);
app.use(morgan("tinyExt"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>devs</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  let length = persons.length;
  let currentDate = new Date();
  response.send(
    `<p>Phonebook has info for ${length} people</p><br>${currentDate}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing, please ensure to add name and number",
    });
  } else if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: genrateId(),
  };

  persons = persons.concat(person);
  response.json(person);
});

// Random id generator
const genrateId = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
