CREATE TABLE mod_actions(
	userid text,
	actiontype text,
	moderatorid text,
	reason text
);

CREATE TABLE user_levels(
	userid text,
	xp int,
	lvl int
);