CREATE TABLE IF NOT EXISTS "debate_rooms" (
	"id" text PRIMARY KEY NOT NULL,
	"topic" text NOT NULL,
	"player1_id" text NOT NULL,
	"player2_id" text,
	"status" text DEFAULT 'waiting' NOT NULL
);
