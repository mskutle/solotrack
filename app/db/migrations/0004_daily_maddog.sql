ALTER TABLE "users" ALTER COLUMN "provider" SET DEFAULT 'google';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "provider" DROP NOT NULL;