CREATE TABLE IF NOT EXISTS "goals" (
	"id" text PRIMARY KEY DEFAULT 'uuid_generate_v4()' NOT NULL,
	"title" text NOT NULL,
	"desired_weekly_frequency" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
