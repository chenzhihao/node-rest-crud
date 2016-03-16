DROP TABLE forms;
DROP TABLE labels;

CREATE TABLE IF NOT EXISTS manuals (
    id SERIAL,
    title TEXT,
    hidden TEXT,
    type TEXT,
    url TEXT
);

CREATE TABLE IF NOT EXISTS forms (
    id SERIAL,
    title TEXT
);

CREATE TABLE IF NOT EXISTS labels (
    id SERIAL,
    title TEXT,
    form_id INTEGER,
    step_id INTEGER,
    lesson_id INTEGER,
    manual_id INTEGER
);