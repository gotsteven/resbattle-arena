ALTER TABLE "debate_results" ADD COLUMN "winner" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "debate_results" ADD COLUMN "ad_p1" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "debate_results" ADD COLUMN "ad_p2" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "debate_results" ADD COLUMN "reason" text NOT NULL;--> statement-breakpoint
ALTER TABLE "debate_results" ADD COLUMN "feedback" text NOT NULL;--> statement-breakpoint
ALTER TABLE "debate_results" DROP COLUMN IF EXISTS "result";