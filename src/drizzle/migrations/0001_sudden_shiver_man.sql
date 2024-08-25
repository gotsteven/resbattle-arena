CREATE TABLE IF NOT EXISTS "debate_results" (
	"result_id" serial PRIMARY KEY NOT NULL,
	"id" uuid,
	"result" json NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "debate_results" ADD CONSTRAINT "debate_results_id_debate_rooms_id_fk" FOREIGN KEY ("id") REFERENCES "public"."debate_rooms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
