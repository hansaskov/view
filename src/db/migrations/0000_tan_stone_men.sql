CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`created_at` integer DEFAULT '"2025-02-01T02:50:57.358Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-02-01T02:50:57.358Z"' NOT NULL
);
