DO $$ BEGIN
 ALTER TABLE "debate_messages" ADD CONSTRAINT "debate_messages_id_debate_rooms_id_fk" FOREIGN KEY ("id") REFERENCES "public"."debate_rooms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
