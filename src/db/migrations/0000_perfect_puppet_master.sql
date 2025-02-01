CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT 'd3abfa04-2284-453c-857f-11401083d69c' NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`created_at` integer DEFAULT '"2025-02-01T11:21:59.167Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-02-01T11:21:59.167Z"' NOT NULL
);
