CREATE TABLE "seats" (
	"id" uuid PRIMARY KEY,
	"is_booked" boolean DEFAULT false NOT NULL,
	"user_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seats_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");