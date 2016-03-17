--DROP TABLE forms;
--DROP TABLE labels;
--DROP TABLE manuals;


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

CREATE TABLE IF NOT EXISTS manuals (
    id SERIAL,
    title TEXT,
    hidden TEXT,
    asset_type TEXT,
    type TEXT,
    url TEXT
);

CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL,
    manual_id INTEGER,
    title TEXT,
    url TEXT
);

CREATE TABLE IF NOT EXISTS steps (
    id SERIAL,
    lesson_id INTEGER,
    instructions TEXT,
    instructions_position TEXT,
    title TEXT
);