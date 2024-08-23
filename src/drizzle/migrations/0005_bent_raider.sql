CREATE TABLE IF NOT EXISTS "debate_messages" (
	"msg_id" serial PRIMARY KEY NOT NULL,
	"id" uuid,
	"player_id" text NOT NULL,
	"message" text NOT NULL
);
