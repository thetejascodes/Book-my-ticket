ALTER TABLE "seats" ADD COLUMN "seat_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "seats" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();